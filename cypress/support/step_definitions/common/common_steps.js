import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import cardOptionPage from "../../page-objects/cardOptionPage";
import selectBranchPage from "../../page-objects/selectBranchPage";
import summaryPage from "../../page-objects/summaryPage";
import homePage from "../../page-objects/homePage";
import accountsPage from "../../page-objects/accountsPage";
import requirementsPage from "../../page-objects/requirementsPage";
import validationPage from "../../page-objects/validationPage";
import currencyPage from "../../page-objects/currencyPage";
import utils from "../../utils/utils";

Given(`I access to the VEDI web`, () => {
  homePage.openPage();
  //Assertions
  utils.verifyURL("/#/home"); //Verify URL
  utils.verifyResponseCode("@es.json", 200); //Verify response code
});

When("I select product {string}", (accountType) => {
  homePage.selectAccountType(homePage.getAccountCode(accountType));
  utils.waitForApi("@app-params");
  utils.verifyURL(
    "#/identificar-usuario?codProd=" + homePage.getAccountCode(accountType)
  );
});

And(`I identify myself with my {string}`, (dniNumber) => {
  accountsPage.entersDNI(dniNumber);
  utils.waitForApi("@captcha-builder").then( xhr => {  
    
    utils.verifyResponseCode("@captcha-builder",200)
    var base64 = xhr.response.body["challenge"];
    
    accountsPage.entersCaptchaCode(base64);
  })
  
  utils.verifyResponseCode("@user-information", 200);
  requirementsPage.acceptRequirements();
});

And(`I log in to VEDI with my {string} and {string}`,(debitCardNumber, password) => {
    utils.verifyURL("/#/iniciar-sesion");
    validationPage.entersCardNumber(debitCardNumber);
    validationPage.entersPassword(password);
    validationPage.pressContinuarButton();
  }
);

Then("I can select a currency: {string}", (currency) => {
  cy.wait(25000); //TODO: Change it for a implicit wait
  //utils.verifyResponseCode("@login", 200);
  currencyPage.selectCurrency(currency);
  utils.selectContinueButton();
  utils.verifyURL("/#/seleccion-moneda");
});

And("I select to use card option: {string} and select a place: {string},{string}",(cardOption, region, city) => {
    //Seleccion de opcion de tarjeta

    cy.wait("@affiliable-cards").should((xhr) => {
      expect(xhr.status, "Respuesta afiliable-cards").to.equal(200);
    });

    cardOptionPage.getUrl().should("include", "/#/opcion-tarjeta");
    cardOptionPage.selectOption(cardOption);
    cardOptionPage.clickContinue();

    //Pantalla de seleccion de sucursal

    cy.wait("@branch-offices").should((xhr) => {
      expect(xhr.status, "Respuesta branch-offices").to.equal(200);
    });

    cardOptionPage.getUrl().should("include", "/#/seleccion-sucursal");
    selectBranchPage.selectBranch(region, city);
    cardOptionPage.clickContinue();
  }
);

When("I insert email {string}, acept the terms and confirm", (email) => {
  cardOptionPage.getUrl().should("include", "/#/resumen-apertura");

  summaryPage.addEmail(email);

  summaryPage.selectChkbox();

  cardOptionPage.clickContinue();
});

Then("I will see account creation confirm", () => {
  cy.wait(utils.getSchedule).should((xhr) => {
    expect(xhr.status, "Respuesta account-opening").to.equal(200);
  });

  cardOptionPage.getUrl().should("include", "/#/confirmacion-apertura");

  //.contains('ya tienes una nueva cuenta!').should('be.visible')
});

And("I will buy an insurance type {string}", (text) => {
  cy.get("#ElBanner")
    .click()

    //Some web that shows ingo

    .get(".btn.btn-primary")
    .click() //Comprar Seguro

    .url()
    .should("include", "/#/resumen")

    .get("#bcp-cb-0-lbl")
    .click({ force: true })

    .get(".btn.btn-primary")
    .click() //Finalizar compra

    .url()
    .should("include", "/#/compra-done");
});
