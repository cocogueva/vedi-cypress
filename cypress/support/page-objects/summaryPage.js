class summaryPage {
    //Selectors
    static addEmailChkBx = '#chkAddMail'
    static email2 = '#customerAddEmail'
    static email1 = '#customerEmail'

    static agreeChkBx = '#chkAgreement'
    static pdpChkBx = '#chkPdp'
    static pepChkBx = '#chkPep'
  
    //Action Methods
    static addEmail(email) {

        //Conditional testing: looking if the addMail exist 
        cy
        .get('div.account-summary-bottom').then(($div) => {   

            if ($div.find(this.addEmailChkBx).length) {
        
            cy.get(this.addEmailChkBx).parent().click()
            .get(this.email2).type(email)
            
            } else {
            cy.get(this.email1).type(email) 
            }
        })
    }

    static selectChkbox() {
        cy
        .get(this.agreeChkBx).click({force:true})  
        //.get(this.pdpChkBx).click({force:true})
        .get(this.pepChkBx).click({force:true})
    }
  }
  
  export default summaryPage;