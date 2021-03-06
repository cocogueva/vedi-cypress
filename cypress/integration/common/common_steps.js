import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

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
  cy.wait('@login-request',{"timeout":10000})

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
  .url().should('include', '/#/opcion-tarjeta')

  .get('[src="/assets/img/cards/'+ cardOption +'.png"]').click()

  if(cardOption == 'vincular-tarjeta') {
    cy.get('button').contains('Vincular').click() //Devuelve el primer boton vincular
  };
  
  cy
  .get('#btnContinue').click()

  //Pantalla de seleccion de sucursal
  .wait('@branch-offices').should((xhr) => {
    expect(xhr.status, 'Respuesta branch-offices').to.equal(200)
  })
  .url().should('include', '/#/seleccion-sucursal')
  
  .get('[formcontrolname="region"] vd-dropdown-option div.dropdown-item').contains(region).click({force:true})

  .get('[formcontrolname="city"] vd-dropdown-option div.dropdown-item').contains(city).click({force:true})

  .get('#btnContinue').click()

  
});

When("I insert email {string}, acept the terms and confirm", email => {
cy.url().should('include','/#/resumen-apertura')

//Conditional testing: looking if the addMail exist 
cy.get('div.account-summary-bottom').then(($div) => {

  if ($div.find('input#chkAddMail').length) {

    cy.get('#chkAddMail').parent().click()
    .get('#customerAddEmail').type(email)
    
  } else {

    cy.get('#customerEmail').type(email) 
  }
})

//Checkbox conditions
cy.get('#chkAgreement').click({force:true})  
//.get('#chkPdp').click({force:true})
.get('#chkPep').click({force:true})

.get('#btnContinue').click()

});

Then("I will see account creation confirm", () => {
var openApi

var today = new Date()
var inicioExtend = new Date();
inicioExtend.setHours(20,30,0); // 8.30 pm
var finExtend = new Date();
finExtend.setHours(3,59,0); // 4.00 am

if (today >= inicioExtend && today <= finExtend) {
  openApi = "@account-extends" 
} else {
  openApi = "@account-opening"
}
  
cy
.wait(openApi).should((xhr) => {
  expect(xhr.status, 'Respuesta account-opening').to.equal(200)
})

.url().should('include','/#/confirmacion-apertura')

//.contains('ya tienes una nueva cuenta!').should('be.visible')
});

And("I answer equifax security questions", () => {
  cy
  .get('.btn').contains('SI').click()

  .wait('@equifax-questions').should((xhr) => {
    expect(xhr.status, 'Respuesta Authentication-questions').to.equal(200)
})

  .url().should('include','/#/equifax')

  .get('#optionn-0-0').click({force:true})

  .get('#optionn-1-0').click({force:true})
  
  .get('#optionn-2-0').click({force:true})

  .get('#btnContinue').click()

  .wait('@validate').should((xhr) => {
    expect(xhr.status, 'Respuesta equifax-validation').to.equal(200)
  })

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