class homePage {
  static accountButton = 'a[href="/#/identificar-usuario?codProd=';

  static openPage() {
    cy.visit(Cypress.env("baseUrl"));
  }

  static getAccountCode(tipoCuenta) {
    var codCuenta;
    if (tipoCuenta == "Cuenta Premio") {
      codCuenta = "CERBCP";
    } else if (tipoCuenta == "Cuenta Ilimitada") {
      codCuenta = "LIBBCP";
    } else if (tipoCuenta == "Cuenta Digital") {
      codCuenta = "PRICTA";
    } else if (tipoCuenta == "AFP") {
      codCuenta = "020";
    }
    return codCuenta;
  }

  static selectAccountType(codCuenta) {
    cy.get(this.accountButton + codCuenta + '"]').click({
      multiple: true,
      force: true,
    });
  }
}

export default homePage;
