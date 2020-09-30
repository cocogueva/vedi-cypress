class cardOptionPage {
  //Selectors
  static selector = '#btnContinues';

  static selectOption(cardOption) {
    
    //Selecciona la opción de vinculación según el parametro recibido
    cy.get('[src="/assets/img/cards/'+ cardOption +'.png"]').click()

    if(cardOption == 'vincular-tarjeta') {
      cy.get('button').contains('Vincular').click() //Devuelve el primer boton vincular
    };
  }
}

export default cardOptionPage;