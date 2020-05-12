import { Given, When, Then, And, when } from "cypress-cucumber-preprocessor/steps";

const url = "https://www.abretucuenta.viabcp.com/#/home"//"https://apeu2appvedic01.azurewebsites.net/#/home";

Given(`I acces to the VEDI web`, () => {
  cy.visit(url);
  
  //Wait until de apis load
  //Title assertion
});

when

When(`I select product "1"`, () => {
  var accntBtns = cy.get('.btn.btn-primary')
  accntBtns.eq(4).click()
  

  //New URL assertion
  });

And(`I identify myself`, () => {

  cy.server()
  cy.route('POST', '/channel/vedi/account-opening/v2/user-identification/user-information').as('user-information')

  cy.get('#txtDNI').type('45451696')

  // Example: assert response property before proceeding
  //cy.wait('@alias').its('status').should('eq', 200)

  cy.wait('@user-information',{"timeout":15000}).should((xhr) => {

    expect(xhr.status, 'successful POST').to.equal(200)
    //expect(xhr.url, 'post url').to.match(/\/posts$/)
    // assert any other XHR properties
  })

}); 


Then(`I can authenticate`, () => {
//cy.wait(100)
});
//Then  I can atuhenticate
            