before(() => {
  //cy.log("This will run once before all tests, you can use this to for example start up your server, if that's your thing");
  cy.server()
  .route('GET', '/assets/i18n/es.json').as('es.json')
  .route('POST', '/channel/vedi/account-opening/v2/user-identification/user-information').as('user-information')
  .route('GET', '/channel/vedi/account-opening/v2/captcha/captcha-builder').as('captcha-builder')
  .route('GET', '/channel/vedi/account-opening/v2/affiliable-cards?**').as('affiliable-cards')
  .route('GET', '/channel/vedi/account-opening/v2/branch-offices').as('branch-offices')
  

});
