import {  Then, And } from "cypress-cucumber-preprocessor/steps";

//Just the assertion previous steps are implemented at common steps.

Then(`I'm logged so I'm the shit!`,() =>{
    
    cy.wait('@login-request').should((xhr) => {
        expect(xhr.status, 'successful POST').to.equal(200)        
      })
    .url().should('include', '/#/seleccion-moneda')
    
});


//rbSoles rbDolares
