import LoginPage from "../support/pages/LoginPage";
import DashboardPage from "../support/pages/DashboardPage";
import users from "../fixtures/users.json";

describe("Authentication", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("TC_AUTH_001 - Login with valid credentials", () => {
    LoginPage.login(users.valid.username, users.valid.password);

    cy.url().should("include", "/dashboard");
    DashboardPage.breadcrumb.should("have.text", "Dashboard");
  });

  it("TC_AUTH_002 - Login with invalid password", () => {
    LoginPage.login(users.invalidPassword.username, users.invalidPassword.password);

    LoginPage.alert.should("contain", "Invalid credentials");
    cy.url().should("include", "/auth/login");
  });

  it("TC_AUTH_003 - Login with invalid username", () => {
    LoginPage.login(users.invalidUsername.username, users.invalidUsername.password);

    LoginPage.alert.should("contain", "Invalid credentials");
  });

  it("TC_AUTH_004 - Login with empty username and password", () => {
    LoginPage.submitBtn.click();

    LoginPage.fieldErrors
      .should("have.length", 2)
      .each(($el) => expect($el).to.have.text("Required"));
    cy.url().should("include", "/auth/login");
  });

  it("TC_AUTH_005 - Login with empty username only", () => {
    LoginPage.login(null, users.valid.password);

    LoginPage.fieldErrors.should("have.length", 1).and("have.text", "Required");
  });

  it("TC_AUTH_006 - Login with empty password only", () => {
    LoginPage.login(users.valid.username, null);

    LoginPage.fieldErrors.should("have.length", 1).and("have.text", "Required");
  });

  it("TC_AUTH_007 - Password field is masked", () => {
    LoginPage.password.should("have.attr", "type", "password");
  });

  it("TC_AUTH_008 - Password is case sensitive", () => {
    LoginPage.login(users.wrongCasePassword.username, users.wrongCasePassword.password);

    LoginPage.alert.should("contain", "Invalid credentials");
  });

  it("TC_AUTH_009 - Form is reset after page refresh", () => {
    LoginPage.username.type("SomeUser");
    LoginPage.password.type("SomePass", { log: false });

    cy.reload();

    LoginPage.username.should("have.value", "");
    LoginPage.password.should("have.value", "");
  });

  it("TC_AUTH_010 - Logout redirects to Login page", () => {
    LoginPage.login(users.valid.username, users.valid.password);
    cy.url().should("include", "/dashboard");

    DashboardPage.logout();

    cy.url().should("include", "/auth/login");
    LoginPage.username.should("be.visible");
  });
});