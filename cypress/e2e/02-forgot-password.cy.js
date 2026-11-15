import ForgotPasswordPage from "../support/pages/ForgotPasswordPage";
import users from "../fixtures/users.json";

describe("Forgot Password", () => {
  beforeEach(() => {
    ForgotPasswordPage.visit();
  });

  it("TC_FORGOT_001 - Open Forgot Password page", () => {
    cy.contains("h6", "Reset Password").should("be.visible");
    ForgotPasswordPage.username.should("be.visible");
  });

  it("TC_FORGOT_002 - Page shows reset instructions", () => {
    cy.contains("enter your username").should("be.visible");
  });

  // NOTE: The public demo server returns "504 Gateway Time-out" when it tries to
  // send the reset email (mail is not configured). The server response is stubbed
  // so this test verifies the client behavior: the form submits the entered
  // username to the reset endpoint.
  it("TC_FORGOT_003 - Submit reset password request with valid username", () => {
    cy.intercept("**/auth/requestResetPassword*", {
      statusCode: 200,
      headers: { "content-type": "text/html" },
      body: "<html><body>stubbed response</body></html>",
    }).as("resetRequest");

    ForgotPasswordPage.username.type(users.valid.username);
    ForgotPasswordPage.resetBtn.click();

    cy.wait("@resetRequest")
      .its("request.body")
      .then((body) => {
        expect(JSON.stringify(body)).to.include(users.valid.username);
      });
    cy.url().should("include", "/auth/requestResetPassword");
  });

  it("TC_FORGOT_004 - Reset password with empty username", () => {
    ForgotPasswordPage.resetBtn.click();

    ForgotPasswordPage.fieldError.should("have.text", "Required");
    cy.url().should("include", "/auth/requestPasswordResetCode");
  });

  it("TC_FORGOT_005 - Cancel returns to Login page", () => {
    ForgotPasswordPage.cancelBtn.click();

    cy.url().should("include", "/auth/login");
    cy.get('input[name="username"]').should("be.visible");
  });

  it("TC_FORGOT_006 - Username field is cleared after page refresh", () => {
    ForgotPasswordPage.username.type("Admin");

    cy.reload();

    ForgotPasswordPage.username.should("have.value", "");
  });
});