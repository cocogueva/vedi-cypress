import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";


Given(`I acces to the VEDI web`, () => {
  cy.server()
  .route('GET', '/assets/i18n/es.json').as('es.json')
  .route('POST', '/channel/vedi/account-opening/v2/user-identification/user-information').as('user-information')
  .route('GET','/channel/vedi/account-opening/v2/captcha/captcha-builder').as('captcha-builder')


  .visit(Cypress.env('baseUrl'))
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
  .wait('@user-information',{"timeout":9000}).should((xhr) => {
    
    
    expect(xhr.status, 'Respuesta user-information').to.equal(200)
    //expect(xhr.response,)
    //expect(xhr.url, 'post url').to.match(/\/posts$/)
    // assert any other XHR properties
  })
}); 