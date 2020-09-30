class utils {
  static verifyURL(pageName) {
    cy.url().should('include', pageName);
  }

  static verifyResponseCode(apiName, responseCode) {
    cy.get(apiName).its('status').should('deep.equal', responseCode);
  }

  static waitAndVerify(apiName, responseCode) {
    cy.wait(apiName).should((xhr) => {
      expect(xhr.status, 'Respuesta de '+apiName).to.equal(responseCode)
    })
  }

  static waitForApi(apiName) {
    return cy.wait(apiName);
  }

  static waitApiTimeout(apiName,time) {
    cy.wait(apiName, { timeout: time });
  }

  static selectButton(locator) {
    cy.get(locator).click({
      force: true,
    });
  }

  static clickContinue() {
    cy.get("#btnContinue").click();
  }

  static getSelectorByText(selectorType, text) {
    cy.get(selectorType).contains(text);
  }

  static getSchedule() {
    var openApi;

    var today = new Date();
    var inicioExtend = new Date();
    inicioExtend.setHours(20, 30, 0); // 8.30 pm
    var finExtend = new Date();
    finExtend.setHours(3, 59, 0); // 4.00 am

    if (today >= inicioExtend && today <= finExtend) {
      openApi = '@account-extends';
    } else {
      openApi = '@account-opening';
    }

    return openApi;
  }

  //TODO Verify path in user-information
  // cy.should((xhr) => {
  //   expect(xhr.status, "Respuesta user-information").to.equal(200);
  //   //expect(xhr.response.path,'')
  //   //expect(xhr.url, 'post url').to.match(/\/posts$/)
  // });
}

export default utils;
