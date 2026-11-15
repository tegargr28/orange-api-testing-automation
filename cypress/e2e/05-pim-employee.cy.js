import PimPage from "../support/pages/PimPage";
import employees from "../fixtures/employees.json";

describe("PIM - Employee Management", () => {
  beforeEach(() => {
    cy.login();
  });

  it("TC_PIM_001 - Employee list page loads with data", () => {
    PimPage.visitList();

    cy.url().should("include", "/pim/viewEmployeeList");
    PimPage.rows.should("have.length.greaterThan", 0);
  });

  it("TC_PIM_002 - Add employee without required fields shows validation", () => {
    PimPage.visitAdd();
    cy.get('input[name="firstName"]').should("be.visible");

    PimPage.saveBtn.click();

    cy.get(".oxd-input-field-error-message")
      .should("have.length.at.least", 2)
      .each(($el) => expect($el).to.have.text("Required"));
  });

  it("TC_PIM_003 - Add, search, and delete employee (E2E flow)", () => {
    const stamp = Date.now().toString();
    const employee = {
      firstName: employees.newEmployee.firstName,
      lastName: `Auto${stamp.slice(-6)}`,
      id: stamp.slice(-8),
    };

    // Create
    PimPage.visitAdd();
    cy.get('input[name="firstName"]').should("be.visible");
    PimPage.addEmployee(employee);

    // Search
    PimPage.visitList();
    PimPage.searchById(employee.id);
    PimPage.rows.should("have.length", 1).and("contain", employee.lastName);

    // Delete
    PimPage.deleteFirstRow();
    cy.contains("Successfully Deleted").should("be.visible");

    // Verify deleted
    PimPage.searchById(employee.id);
    cy.contains("No Records Found").should("be.visible");
  });

  it("TC_PIM_004 - Search employee by non-existing ID shows no records", () => {
    PimPage.visitList();

    PimPage.searchById("99999999");

    cy.contains("No Records Found").should("be.visible");
  });

  it("TC_PIM_005 - Reset filter clears Employee Id field", () => {
    PimPage.visitList();
    cy.getInputByLabel("Employee Id").type("0001");

    PimPage.resetBtn.click();

    cy.getInputByLabel("Employee Id").should("have.value", "");
  });
});
