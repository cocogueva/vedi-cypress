const { default: utils } = require("../utils/utils");

class cardsPage {
  static cardImage = '[src="/assets/img/cards/';
  static continuarButton = "#btnContinue";

  static selectCardOption(cardOption) {
    cy.wait("@affiliable-cards");

    if (cardOption == "vincular-tarjeta") {
      utils.getSelectorByText("button", "Vincular").click(); //Devuelve el primer boton vincular
    } else cy.get(this.cardImage + cardOption + '.png"]').click();
  }
}

export default cardsPage;