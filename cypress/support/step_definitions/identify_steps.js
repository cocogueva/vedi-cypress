import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

//Just the assertion previous steps are implemented at commo steps.

Then(`VEDI identifies me as {string} and {int}`, (name,path) => {

  cy.get('@user-information').its('response').then((res) => {
    
    expect(res.body).to.include({
      "names": name ,"path": path
    })

    cy.url().should('include', '/#/iniciar-sesion')

  })

});