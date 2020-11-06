import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import utils from "../utils/utils";
import eqfxQuestionsPage from "../page-objects/eqfxQuestionsPage";


And("I answer equifax security questions", () => {
    
    eqfxQuestionsPage.clickSi()
  
    cy.wait('@equifax-questions').should((xhr) => {
      expect(xhr.status, 'Respuesta Authentication-questions').to.equal(200)
    })
  
    utils.verifyURL('/#/equifax')
  
    eqfxQuestionsPage.answerQuestions()
  
    utils.clickContinue()
  
    cy.wait('@validate').should((xhr) => {
      expect(xhr.status, 'Respuesta equifax-validation').to.equal(200)
    })
  
  });