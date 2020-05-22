import {  Then, And } from "cypress-cucumber-preprocessor/steps";

//Just the assertion previous steps are implemented at common steps.

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

Then(`I'm logged so I'm the shit!`,() =>{
    
    cy.server()

    .wait('@login-request').should((xhr) => {
        expect(xhr.status, 'successful POST').to.equal(200)        
      })

    .url().should('include', '/#/seleccion-moneda')
    
});


//rbSoles rbDolares
