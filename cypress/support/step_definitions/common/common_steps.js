import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import homePage from "../../page-objects/homePage";
import utils from "../../utils/utils";
import accountsPage from "../../page-objects/accountsPage";
import requirementsPage from "../../page-objects/requirementsPage";
import validationPage from "../../page-objects/validationPage";
import currencyPage from "../../page-objects/currencyPage";
import cardsPage from "../../page-objects/cardsPage";
import placePage from "../../page-objects/placePage";

Given(`I access to the VEDI web`, () => {
  homePage.openPage();
  //Assertions
  utils.verifyURL("/#/home"); //Verify URL
  utils.verifyResponseCode("@es.json", 200); //Verify response code
});

When("I select product {string}", (accountType) => {
  homePage.selectAccountType(homePage.getAccountCode(accountType));
  utils.waitForApi("@app-params")
  utils.verifyURL(
    "#/identificar-usuario?codProd=" + homePage.getAccountCode(accountType)
  );
});

And(`I identify myself with my {string}`, (dniNumber) => {
  accountsPage.entersDNI(dniNumber);
  utils.verifyResponseCode("@captcha-builder", 200);
  accountsPage.entersCaptchaCode();
  utils.verifyResponseCode("@user-information", 200);
  requirementsPage.acceptRequirements();
});

And(
  `I log in to VEDI with my {string} and {string}`,
  (debitCardNumber, password) => {
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

And(
  "I select to use card option: {string} and select a place: {string},{string}",
  (cardOption, region, city) => {
    //utils.waitForApi("@affiliable-cards")
    //utils.verifyResponseCode("@affiliable-cards", 200);
    utils.verifyURL("/#/opcion-tarjeta");
    cardsPage.selectCardOption(cardOption);
    utils.selectContinueButton();

    utils.verifyResponseCode("@branch-offices", 200);
    utils.verifyURL("/#/seleccion-sucursal");
    placePage.selectProvincia(region);
    placePage.selectRegion(city);
  }
);

When("I insert email {string}, acept the terms and confirm", (email) => {
  cy.url().should("include", "/#/resumen-apertura");

  //Conditional testing: looking if the addMail exist
  cy.get("div.account-summary-bottom").then(($div) => {
    if ($div.find("input#chkAddMail").length) {
      cy.get("#chkAddMail")
        .parent()
        .click()
        .get("#customerAddEmail")
        .type(email);
    } else {
      cy.get("#customerEmail").type(email);
    }
  });

  //Checkbox conditions
  cy.get("#chkAgreement")
    .click({
      force: true,
    })
    //.get('#chkPdp').click({force:true})
    .get("#chkPep")
    .click({
      force: true,
    })

    .get("#btnContinue")
    .click();
});

Then("I will see account creation confirm", () => {
  var openApi;

  var today = new Date();
  var inicioExtend = new Date();
  inicioExtend.setHours(20, 30, 0); // 8.30 pm
  var finExtend = new Date();
  finExtend.setHours(3, 59, 0); // 4.00 am

  if (today >= inicioExtend && today <= finExtend) {
    openApi = "@account-extends";
  } else {
    openApi = "@account-opening";
  }

  cy.wait(openApi)
    .should((xhr) => {
      expect(xhr.status, "Respuesta account-opening").to.equal(200);
    })

    .url()
    .should("include", "/#/confirmacion-apertura");

  //.contains('ya tienes una nueva cuenta!').should('be.visible')
});

And("I answer equifax security questions", () => {
  cy.get(".btn")
    .contains("SI")
    .click()

    .wait("@equifax-questions")
    .should((xhr) => {
      expect(xhr.status, "Respuesta Authentication-questions").to.equal(200);
    })

    .url()
    .should("include", "/#/equifax")

    .get("#optionn-0-0")
    .click({
      force: true,
    })

    .get("#optionn-1-0")
    .click({
      force: true,
    })

    .get("#optionn-2-0")
    .click({
      force: true,
    })

    .get("#btnContinue")
    .click()

    .wait("@validate")
    .should((xhr) => {
      expect(xhr.status, "Respuesta equifax-validation").to.equal(200);
    });
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
    .click({
      force: true,
    })

    .get(".btn.btn-primary")
    .click() //Finalizar compra

    .url()
    .should("include", "/#/compra-done");
});
