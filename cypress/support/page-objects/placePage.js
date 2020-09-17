class placePage {
  static regionDropdownList =
    '[formcontrolname="region"] vd-dropdown-option div.dropdown-item';
  static provinciaDropdownList =
    '[formcontrolname="city"] vd-dropdown-option div.dropdown-item';

  static selectRegion(region) {
    cy.get(this.regionDropdownList).contains(region).click({ force: true });
    //This method can be changed for a utils method
  }

  static selectProvincia(city) {
    cy.get(this.provinciaDropdownList).contains(city).click({ force: true });
  }
}

export default placePage;
