class AdminPage {
  visit() { cy.visit("/web/index.php/admin/viewSystemUsers"); }

  get rows() { return cy.get(".oxd-table-body .oxd-table-card"); }
  get searchBtn() { return cy.contains("button", "Search"); }
  get resetBtn() { return cy.contains("button", "Reset"); }
  get usernameInput() { return cy.getInputByLabel("Username"); }
}

export default new AdminPage();
