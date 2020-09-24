class selectBranchPage {
    //Selectors
    static region = '[formcontrolname="region"] vd-dropdown-option div.dropdown-item';
    static city = '[formcontrolname="city"] vd-dropdown-option div.dropdown-item'
    
  
    //Action Methods
    static selectBranch(region,city) {
      
      //Selecciona la región y ciudad según los parametros entregados
      cy
      .get(this.region).contains(region).click({force:true})
      .get(this.city).contains(city).click({force:true})
    }
  }
  
  export default selectBranchPage;