class utils {
  static verifyURL(pageName) {
    cy.url().should("include", pageName);
  }

  static verifyResponseCode(apiName, responseCode) {
    cy.get(apiName).its("status").should("deep.equal", responseCode);
  }

  static waitForApi(apiName){
    cy.wait(apiName);
  }

  static waitApi(apiName, time){
    cy.wait(apiName, {timeout: time});
  }

  static selectButton(locator) {
    cy.get(locator).click({
      force: true,
    });
  }

  static selectContinueButton() {
    cy.get("#btnLogin").click();
  }

  static getSelectorByText(selectorType, text) {
    cy.get(selectorType).contains(text);
  }

  //TODO Verify path in user-information
  // cy.should((xhr) => {
  //   expect(xhr.status, "Respuesta user-information").to.equal(200);
  //   //expect(xhr.response.path,'')
  //   //expect(xhr.url, 'post url').to.match(/\/posts$/)
  // });
}

export default utils;
