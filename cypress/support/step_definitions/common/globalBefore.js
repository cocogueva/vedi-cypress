beforeEach(() => {
  //cy.log("This will run once before all tests, you can use this to for example start up your server, if that's your thing");
  cy.server()
  .route('GET', '/assets/i18n/es.json').as('es.json')
  .route('POST', '/channel/vedi/account-opening/v2/user-identification/user-information').as('user-information')
  .route('GET', '/channel/vedi/account-opening/v2/app-params').as('app-params')
  .route('GET', '/channel/vedi/account-opening/v2/captcha/captcha-builder').as('captcha-builder')
  .route('GET', '/channel/vedi/account-opening/v2/login').as('login')
  .route('POST','/channel/vedi/account-opening/v2/authentication-questions/validate').as('validate')
  .route('POST','/channel/vedi/account-opening/v2/authentication-questions').as('equifax-questions')
  .route('GET', '/channel/vedi/account-opening/v2/affiliable-cards?**').as('affiliable-cards')
  .route('GET', '/channel/vedi/account-opening/v2/branch-offices').as('branch-offices')
  .route('POST', '/channel/vedi/account-opening/v2/accounts').as('account-opening')
  .route('POST', '/channel/vedi/account-opening/v2/accounts-extends').as('account-extends')
  

});

