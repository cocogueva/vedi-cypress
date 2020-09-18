class cardOptionPage {
  //Selectors
  static selector = '#btnContinues';
  

  //Action Methods
  static getUrl() {
    return cy.url() //Debe ir en una clase utils
  }

  static clickContinue() {
      cy
      .get('#btnContinue').click() //Debe ir en una clase utils
  }

  static selectOption(cardOption) {
    
    //Selecciona la opción de vinculación según el parametro recibido
    cy.get('[src="/assets/img/cards/'+ cardOption +'.png"]').click()

    if(cardOption == 'vincular-tarjeta') {
      cy.get('button').contains('Vincular').click() //Devuelve el primer boton vincular
    };
  }
}

export default cardOptionPage;