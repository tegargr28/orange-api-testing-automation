import AdminPage from "../support/pages/AdminPage";

describe("Admin - User Management", () => {
  beforeEach(() => {
    cy.login();
    AdminPage.visit();
  });

  it("TC_ADMIN_001 - Admin System Users page loads", () => {
    cy.url().should("include", "/admin/viewSystemUsers");
    cy.contains("System Users").should("be.visible");
  });

  it("TC_ADMIN_002 - User table is loaded with data", () => {
    AdminPage.rows.should("have.length.greaterThan", 0);
    cy.contains("Record").should("be.visible");
  });

  it("TC_ADMIN_003 - Search user by username", () => {
    AdminPage.usernameInput.type("Admin");
    AdminPage.searchBtn.click();

    AdminPage.rows.should("have.length.greaterThan", 0);
    AdminPage.rows.first().should("contain", "Admin");
  });

  it("TC_ADMIN_004 - Search user that does not exist", () => {
    AdminPage.usernameInput.type("zzzzqqqxxx");
    AdminPage.searchBtn.click();

    cy.contains("No Records Found").should("be.visible");
  });

  it("TC_ADMIN_005 - Reset filter clears Username field", () => {
    AdminPage.usernameInput.type("Admin");

    AdminPage.resetBtn.click();

    AdminPage.usernameInput.should("have.value", "");
  });
});
