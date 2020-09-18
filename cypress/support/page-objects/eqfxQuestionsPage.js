class eqfxQuestionsPage {
    //Selectors
    static botonSi = 'button.btn-primary.btn-block';
    static resp1 = '#optionn-0-0'
    static resp2 = '#optionn-1-0'
    static resp3 = '#optionn-2-0'
    
  
    //Action Methods
    static clickSi() {
        cy.get(this.botonSi).eq(0).click()
    }

    static answerQuestions() {
      
      //Selecciona la región y ciudad según los parametros entregados
      cy
      .get(this.resp1).click({force:true})
  
      .get(this.resp2).click({force:true})
    
      .get(this.resp3).click({force:true})
    }
  }
  
  export default eqfxQuestionsPage;