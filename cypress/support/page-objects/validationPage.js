import utils from "../utils/utils";

class validationPage {
  static cardNumberInput = "#txtCardNumber";
  static keypad = '[src="assets/img/keypad/btn-';
  static continuarButton = "#btnLogin";

  static entersCardNumber(debitCardNumber) {
    cy.get(this.cardNumberInput).type(debitCardNumber);
  }

  static entersPassword(password) {
    var passArray = password.split(""); //Splits the password string into an array

    //Click password in the keyboard
    for (let i = 0; i < 6; i++) {
      cy.get(this.keypad + passArray[i] + '.svg"]').click();
    }
  }

  static pressContinuarButton() {
    utils.selectButton(this.continuarButton);
  }
}

export default validationPage;