class accountsPage {
  //Locators
  static dniInput = 'input[id="txtDNI"]';
  static captchaCode = "div.captcha-image img";

  //Actions
  static entersDNI(dniNumber) {
    cy.get(this.dniInput).type(dniNumber);
  }

  static entersCaptchaCode(base64) {
    var captcha;
    const twoCaptcha = Cypress.env("auto-captcha");

    //Wait for the captcha builder API to respond
    //cy.wait("@captcha-builder").then((xhr) => {
    

    if (twoCaptcha == true) {

      this.entersCaptchaCodeAutomatically(base64); //Send BASE64 to captcha solver API

    } else if (twoCaptcha == false) {

      cy.get(this.captchaCode)
        .should("be.visible")
        .then(() => {
          captcha = prompt("Igresa el código captcha", "CATPCHA");
          cy.get('[formcontrolname="answer"]').type(captcha).type("{enter}");
        });
    }
    //});

    //Delay to wait for the user CAPTCHA validation (Manually)
    cy.wait("@user-information", {
      timeout: 25000,
    });
    return captcha;
  }

  static entersCaptchaCodeAutomatically(base64) {
    const baseUrl = Cypress.env("2captchaURL");
    const api_key = Cypress.env("API_KEY");

    cy.request(
      "POST",
      `${baseUrl}/in.php?key=${api_key}&method=base64&phrase=0&json=1`,
      {body: base64}
    ).then((response) => {
      expect(response.status).to.eq(200);
      var captchaID = response.body["request"];

      cy.wait(5000)
        .request(`${baseUrl}/res.php?key=${api_key}&action=get&json=1&ID=${captchaID}`)
        .then((response) => {
          expect(response.body["request"]).not.eq("CAPCHA_NOT_READY");
          var captcha = response.body["request"];
          cy.get('[formcontrolname="answer"]').type(captcha).type("{enter}");
        });
    });
  }
}

export default accountsPage;
