import { Given, When, Then, And, when } from "cypress-cucumber-preprocessor/steps";

const url = "https://www.abretucuenta.viabcp.com/#/home"//"https://apeu2appvedic01.azurewebsites.net/#/home";

Given(`I acces to the VEDI web`, () => {
  cy.server()
  .route('GET', '/assets/i18n/es.json').as('es.json')

  .visit(url)
  .url().should('include', '/#/home')
  
  
  .get('@es.json').its('status').should('deep.equal', 200)
  // Example: assert response property before proceeding
  //cy.wait('@alias').its('status').should('eq', 200)
});

When(`I select product {string}`, (tipoCuenta) => {
  cy.contains(tipoCuenta).click() 
  //cy.get('.btn.btn-primary').eq(4).click()

  if (tipoCuenta == 'Cuenta Premio') { tipoCuenta = 'CERBCP'
  } else if (tipoCuenta == 'Cuenta Ilimitada') {tipoCuenta = 'LIBBCP'
  } else if (tipoCuenta == 'Cuenta Digital') { tipoCuenta = 'PRICTA'
  } else if (tipoCuenta == AFP) {tipoCuenta = '020'}
  
  cy.url().should('include', '#/identificar-usuario?codProd='+tipoCuenta)
  //New URL assertion
  });

And(`I identify myself with my {string}`, (numDoc) => {

  cy.server()
  .route('POST', '/channel/vedi/account-opening/v2/user-identification/user-information').as('user-information')

  .get('#txtDNI').type(numDoc)

  //Delay to wait for the user CAPTCHA validation (Manually)
  .wait('@user-information',{"timeout":15000}).should((xhr) => {

    expect(xhr.status, 'successful POST').to.equal(200)
    //expect(xhr.response,)
    //expect(xhr.url, 'post url').to.match(/\/posts$/)
    // assert any other XHR properties
  })
}); 

Then(`VEDI identifies me as {string} and {int}`, (name,path) => {

  cy.get('@user-information').its('response').then((res) => {
    
    expect(res.body).to.include({
      "names": name ,"path": path
    })

    cy.url().should('include', '/#/requisitos')
  })

});