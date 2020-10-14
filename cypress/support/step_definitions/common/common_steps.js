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
  //homePage.selectAccountType(homePage.getAccountCode(accountType)); //Works for PROD *Coco 12/10
  homePage.selectAccountByText(accountType) //Works for CERTI *Coco 12/10
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
  utils.waitApiTimeout('@login',25000)
  utils.verifyResponseCode('@login',200)  
  currencyPage.selectCurrency(currency);
  utils.clickContinue();
  utils.verifyURL("/#/seleccion-moneda");
});

And("I select to use card option: {string} and select a place: {string},{string}",(cardOption, region, city) => {
    //Seleccion de opcion de tarjeta

    cy.wait('@affiliable-cards').should((xhr) => {
      expect(xhr.status, "Respuesta afiliable-cards").to.equal(200);
    });
    utils.verifyURL("/#/opcion-tarjeta");
    cardOptionPage.selectOption(cardOption);
    utils.clickContinue();

    //Pantalla de seleccion de sucursal

    cy.wait("@branch-offices").should((xhr) => {
      expect(xhr.status, "Respuesta branch-offices").to.equal(200);
    });

    utils.verifyURL("/#/seleccion-sucursal");
    selectBranchPage.selectBranch(region, city);
    utils.clickContinue();
  }
);

When("I insert email {string}, acept the terms and confirm", (email) => {
  utils.verifyURL("/#/resumen-apertura");

  summaryPage.addEmail(email);

  summaryPage.selectChkbox();

  utils.clickContinue();
});

Then("I will see account creation confirm", () => {
  
  const abc = utils.getSchedule()

  utils.waitAndVerify(abc,200);
  
  utils.verifyURL("/#/confirmacion-apertura");

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
