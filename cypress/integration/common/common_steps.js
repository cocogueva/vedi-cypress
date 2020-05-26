import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";


Given(`I acces to the VEDI web`, () => {
 
  cy.visit(Cypress.env('baseUrl'))
  .url().should('include', '/#/home')
  
  
  .get('@es.json').its('status').should('deep.equal', 200)
  // Example: assert response property before proceeding
  //cy.wait('@alias').its('status').should('eq', 200)
});

When("I select product {string}", tipoCuenta => {
  cy.contains(tipoCuenta).click() 
  //cy.get('.btn.btn-primary').eq(4).click()

  if (tipoCuenta == 'Cuenta Premio') { tipoCuenta = 'CERBCP'
  } else if (tipoCuenta == 'Cuenta Ilimitada') {tipoCuenta = 'LIBBCP'
  } else if (tipoCuenta == 'Cuenta Digital') { tipoCuenta = 'PRICTA'
  } else if (tipoCuenta == 'AFP') {tipoCuenta = '020'}
  
  cy.url().should('include', '#/identificar-usuario?codProd='+tipoCuenta)
  //New URL assertion

  });

And(`I identify myself with my {string}`, (numDoc) => {
  
  cy.get('#txtDNI').type(numDoc)
  
  var captcha 
  
  cy.wait('@captcha-builder').should((xhr) => {    
      //window.alert("Ingresa el CAPTCHA!") 
      captcha = prompt("Igresa el código captcha", "CATPCHA");
      
      cy.get('[formcontrolname="answer"]').type(captcha).type('{enter}')
  })

  //Delay to wait for the user CAPTCHA validation (Manually)
  .wait('@user-information',{"timeout":14000}).should((xhr) => {
    
    expect(xhr.status, 'Respuesta user-information').to.equal(200)
    //expect(xhr.response,)
    //expect(xhr.url, 'post url').to.match(/\/posts$/)
  })
}); 

And(`I log in to VEDI with my {string} and {string}`, (debitCard,password) => {

  cy.get('.btn').contains('SI').click()
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