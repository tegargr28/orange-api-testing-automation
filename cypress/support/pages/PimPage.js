class PimPage {
  visitList() { cy.visit("/web/index.php/pim/viewEmployeeList"); }
  visitAdd() { cy.visit("/web/index.php/pim/addEmployee"); }

  get rows() { return cy.get(".oxd-table-body .oxd-table-card"); }
  get searchBtn() { return cy.contains("button", "Search"); }
  get resetBtn() { return cy.contains("button", "Reset"); }
  get saveBtn() { return cy.contains("button", "Save"); }

  addEmployee({ firstName, lastName, id }) {
    cy.get('input[name="firstName"]').type(firstName);
    cy.get('input[name="lastName"]').type(lastName);
    if (id) cy.getInputByLabel("Employee Id").clear().type(id);
    this.saveBtn.click();
    cy.url({ timeout: 20000 }).should("include", "/pim/viewPersonalDetails/empNumber/");
  }

  searchById(id) {
    cy.getInputByLabel("Employee Id").clear().type(id);
    this.searchBtn.click();
  }

  deleteFirstRow() {
    this.rows.first().find(".bi-trash").click();
    cy.contains("button", "Yes, Delete").click();
  }
}

export default new PimPage();
