import { Given, Then } from "cypress-cucumber-preprocessor/steps";

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

And("I select to use card option: {string} and select a place", cardOption => {
    //Seleccion de opcion de tarjeta
    cy.wait('@affiliable-cards').should((xhr) => {
        expect(xhr.status, 'Respuesta afiliable-cards').to.equal(200)
      })
    .url().should('include', '/#/opcion-tarjeta')

    .get('[src="/assets/img/cards/'+ cardOption +'.png"]').click()
    
    .get('#btnContinue').click()

    //Pantalla de seleccion de sucursal
    .wait('@branch-offices').should((xhr) => {
      expect(xhr.status, 'Respuesta branch-offices').to.equal(200)
    })
    .url().should('include', '/#/seleccion-sucursal')
    
    .get('[formcontrolname="region"] vd-dropdown-option div.dropdown-item').contains('LIMA').click({force:true})

    .get('[formcontrolname="city"] vd-dropdown-option div.dropdown-item').contains('LIMA').click({force:true})

    .get('#btnContinue').click()

    
});

