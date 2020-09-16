import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import cardOptionPage from "../../page-objects/cardOptionPage";
import selectBranchPage from "../../page-objects/selectBranchPage";
import summaryPage from "../../page-objects/summaryPage";
import utils from "../../utils/utils"

Given(`I acces to the VEDI web`, () => {
 
  cy.visit(Cypress.env('baseUrl'))
  .url().should('include', '/#/home')
  
  
  .get('@es.json').its('status').should('deep.equal', 200)
  // Example: assert response property before proceeding
  //cy.wait('@alias').its('status').should('eq', 200)
});

When("I select product {string}", tipoCuenta => {

  if (tipoCuenta == 'Cuenta Premio') { tipoCuenta = 'CERBCP'
  } else if (tipoCuenta == 'Cuenta Ilimitada') {tipoCuenta = 'LIBBCP'
  } else if (tipoCuenta == 'Cuenta Digital') { tipoCuenta = 'PRICTA'
  } else if (tipoCuenta == 'AFP') {tipoCuenta = '020'}
  
  cy
  .get('a[href="/#/identificar-usuario?codProd='+ tipoCuenta +'"]').click({multiple:true,force:true})
  //.contains(tipoCuenta).click()  //Without Tag manager JS injection this used to work !
  //.get('.btn.btn-primary').eq(4).click()

  //New URL assertion
  .url().should('include', '#/identificar-usuario?codProd='+tipoCuenta)
  

  });

And(`I identify myself with my {string}`, (numDoc) => {
  cy
  .wait('@app-params')
  
  .get('#txtDNI').type(numDoc)
  
  var captcha 
  const baseUrl = Cypress.env('2captchaURL')
  const api_key = Cypress.env('API_KEY')
  const twoCaptcha = Cypress.env('auto-captcha')
  
  //Wait for the captcha builder API to respond 
  cy
  .wait('@captcha-builder').then( xhr => {    
    
    captcha = xhr.response.body['challenge']

    if( twoCaptcha == true ){
      
      //Send BASE64 to captcha solver API
      cy
      .request('POST',`${baseUrl}/in.php?key=${api_key}&method=base64&phrase=0&json=1`,{body: captcha})
      .then( response => {
          expect(response.status).to.eq(200)
          var captchaID = response.body['request']

          cy
          .wait(5000)
          .request(`${baseUrl}/res.php?key=${api_key}&action=get&json=1&ID=${captchaID}`)
          .then( response =>{

              expect(response.body['request']).not.eq('CAPCHA_NOT_READY')
              captcha = response.body['request']
              cy.get('[formcontrolname="answer"]').type(captcha).type('{enter}')
          })
      }) 

    } else if ( twoCaptcha == false ){

      //Get the CAPTCHA img element timeout during 3 secs til is visible
      cy
      .get('div.captcha-image img',{"timeout":4000}).should('be.visible').then( () => {
        captcha = prompt("Igresa el código captcha", "CATPCHA") 
        cy.get('[formcontrolname="answer"]').type(captcha).type('{enter}')  
      })

    }

  })

  //Delay to wait for the user CAPTCHA validation (Manually)
  .wait('@user-information',{"timeout":15000}).should((xhr) => {
    
    expect(xhr.status, 'Respuesta user-information').to.equal(200)
    //expect(xhr.response.path,'')
    //expect(xhr.url, 'post url').to.match(/\/posts$/)
  })
}); 

And(`I log in to VEDI with my {string} and {string}`, (debitCard,password) => {

  cy.get('button.btn-primary.btn-block').eq(0).click() //Primer button primary
  .url().should('include', '/#/iniciar-sesion')

  .get('#txtCardNumber').type(debitCard)

  var passArray = password.split("") //Splits the password string into an array

  //Click password keyboard images
  for (let i = 0; i < 6; i++) {
      cy.get('[src="assets/img/keypad/btn-'+ passArray[i] +'.svg"]').click()
    }
  
  cy.route('POST', '/channel/vedi/account-opening/v2/login').as('login-request') 
  .get('#btnLogin').click()

});

Then("I can select a currency: {string}",(currency) => {
  cy.wait('@login-request',{"timeout":16000})

  cy .url().should('include', '/#/seleccion-moneda')
  //.get('#rbDolares').should('be.disabled')
  .get('#rb'+currency).parent().click()
  .get('#btnContinue').click()

});

And("I select to use card option: {string} and select a place: {string},{string}", (cardOption, region, city) => {
  //Seleccion de opcion de tarjeta

  cy.wait('@affiliable-cards').should((xhr) => {
    expect(xhr.status, 'Respuesta afiliable-cards').to.equal(200)
  })

  cardOptionPage.getUrl().should('include', '/#/opcion-tarjeta')

  cardOptionPage.selectOption(cardOption)
  
  cardOptionPage.clickContinue()  

  //Pantalla de seleccion de sucursal

  cy.wait('@branch-offices').should((xhr) => {
    expect(xhr.status, 'Respuesta branch-offices').to.equal(200)
  })

  cardOptionPage.getUrl().should('include', '/#/seleccion-sucursal')
  
  selectBranchPage.selectBranch(region,city)

  cardOptionPage.clickContinue()
  
});

When("I insert email {string}, acept the terms and confirm", email => {

cardOptionPage.getUrl().should('include','/#/resumen-apertura')

summaryPage.addEmail(email)

summaryPage.selectChkbox()

cardOptionPage.clickContinue()

});

Then("I will see account creation confirm", () => {

cy.wait(utils.getSchedule).should((xhr) => {
  expect(xhr.status, 'Respuesta account-opening').to.equal(200)
})

cardOptionPage.getUrl().should('include','/#/confirmacion-apertura')

//.contains('ya tienes una nueva cuenta!').should('be.visible')
});

And("I will buy an insurance type {string}", text => {
  cy
  .get('#ElBanner').click()

  //Some web that shows ingo

  .get('.btn.btn-primary').click()  //Comprar Seguro
  
  .url().should('include','/#/resumen')

  .get('#bcp-cb-0-lbl').click({force:true})

  .get('.btn.btn-primary').click() //Finalizar compra

  .url().should('include','/#/compra-done')


});