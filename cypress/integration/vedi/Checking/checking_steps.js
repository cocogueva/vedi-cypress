import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("I acces to checking account URL", () => {
    
    cy.visit(Cypress.env('baseUrl')+'/#/identificar-usuario?codProd=020')
    .url().should('include', '#/identificar-usuario?codProd=020')
    .get('@es.json').its('status').should('deep.equal', 200)
    
  });

  Then("I can select a currency, only soles is available",() => {
    cy.wait('@login-request')
  
    cy .url().should('include', '/#/seleccion-moneda')
    .get('#rbDolares').should('be.disabled')
    .get('#rbSoles').parent().click()
    .get('#btnContinue').click()
  
  });