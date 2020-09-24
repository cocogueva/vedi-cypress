import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import cardOptionPage from "../page-objects/cardOptionPage";
import eqfxQuestionsPage from "../page-objects/eqfxQuestionsPage";


And("I answer equifax security questions", () => {
    
    eqfxQuestionsPage.clickSi()
  
    cy.wait('@equifax-questions').should((xhr) => {
      expect(xhr.status, 'Respuesta Authentication-questions').to.equal(200)
    })
  
    cardOptionPage.getUrl().should('include','/#/equifax')
  
    eqfxQuestionsPage.answerQuestions()
  
    cardOptionPage.clickContinue()
  
    cy.wait('@validate').should((xhr) => {
      expect(xhr.status, 'Respuesta equifax-validation').to.equal(200)
    })
  
  });