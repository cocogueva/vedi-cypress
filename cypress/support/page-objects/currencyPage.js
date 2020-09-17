class currencyPage {
  static solesCheckbox = "#lblSoles";
  static dolaresCheckbox = "#lblDolares";

  static selectCurrency(currency) {
    if (currency == "Soles") {
      cy.get(this.solesCheckbox).click();
    } else cy.get(this.dolaresCheckbox).click();
    //TODO: .get('').should('be.disabled')
  }
}

export default currencyPage;
