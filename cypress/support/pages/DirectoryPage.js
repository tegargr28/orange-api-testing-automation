class DirectoryPage {
  visit() { cy.visit("/web/index.php/directory/viewDirectory"); }

  get nameInput() { return cy.get('input[placeholder="Type for hints..."]').first(); }
  get cards() { return cy.get(".orangehrm-directory-card"); }
  get cardNames() { return cy.get(".orangehrm-directory-card-header"); }
  get searchBtn() { return cy.contains("button", "Search"); }
  get resetBtn() { return cy.contains("button", "Reset"); }

  selectedValue(label) {
    return cy
      .contains("label", label)
      .parents(".oxd-input-group")
      .first()
      .find(".oxd-select-text-input");
  }
}

export default new DirectoryPage();
