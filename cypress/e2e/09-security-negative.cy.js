import LoginPage from "../support/pages/LoginPage";
import DashboardPage from "../support/pages/DashboardPage";
import DirectoryPage from "../support/pages/DirectoryPage";
import employees from "../fixtures/employees.json";

describe("Negative & Basic Security Checks", () => {
  it("TC_SEC_001 - Protected page redirects to login when not authenticated", () => {
    cy.visit("/web/index.php/pim/viewEmployeeList");

    cy.url().should("include", "/auth/login");
  });

  it("TC_SEC_002 - Protected page is not accessible after logout", () => {
    cy.login();
    DashboardPage.visit();
    DashboardPage.logout();
    cy.url().should("include", "/auth/login");

    cy.visit("/web/index.php/admin/viewSystemUsers");

    cy.url().should("include", "/auth/login");
  });

  it("TC_SEC_003 - SQL injection string in login is rejected", () => {
    LoginPage.visit();
    LoginPage.login("' OR '1'='1", "' OR '1'='1");

    LoginPage.alert.should("contain", "Invalid credentials");
    cy.url().should("include", "/auth/login");
  });

  it("TC_SEC_004 - XSS payload in login does not execute", () => {
    const alertStub = cy.stub().as("alertStub");
    cy.on("window:alert", alertStub);

    LoginPage.visit();
    LoginPage.login("<script>alert(1)</script>", "<img src=x onerror=alert(1)>");

    LoginPage.alert.should("contain", "Invalid credentials");
    cy.get("@alertStub").should("not.have.been.called");
  });

  it("TC_SEC_005 - Very long username/password is handled gracefully", () => {
    const longText = "a".repeat(300);
    LoginPage.visit();
    LoginPage.login(longText, longText);

    cy.url().should("include", "/auth/login");
  });

  it("TC_SEC_006 - Special characters in Directory search do not break page", () => {
    cy.login();
    DirectoryPage.visit();

    DirectoryPage.nameInput.type(employees.specialChars, { parseSpecialCharSequences: false });

    cy.get(".oxd-autocomplete-dropdown").should("contain", "No Records Found");
    cy.url().should("include", "/directory/viewDirectory");
  });
});
