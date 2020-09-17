class currencyPage {
  static solesCheckbox = "#rbSoles";
  static dolaresCheckbox = "#rbDolares";

  static selectCurrency(currency) {
    if (currency == "Soles") {
      cy.get(this.solesCheckbox).click();
    } else cy.get(this.dolaresCheckbox).click();
    //TODO: .get('').should('be.disabled')
  }
}

export default currencyPage;
