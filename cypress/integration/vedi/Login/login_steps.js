import {  Then, And } from "cypress-cucumber-preprocessor/steps";

//Just the assertion previous steps are implemented at commo steps.

And(`I log in to VEDI with my {string} and {string}`, (debitCard,password) => {

    cy.get('.btn').contains('SI').click()
    .url().should('include', '/#/iniciar-sesion')

    .get('#txtCardNumber').type(debitCard)

    var passArray = password.split("")

    //Click password keyboard images
    for (let i = 0; i < 6; i++) {
        cy.get('[src="assets/img/keypad/btn-'+ passArray[i] +'.svg"]').click()
      }

    cy.get('#btnLogin').click()


});

Then(`I'm logged so I'm the shit!`,() =>{
    //Assertions about the login to be done !
});