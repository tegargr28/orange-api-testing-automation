import LoginPage from "./LoginPage";

class ForgotPasswordPage {
  visit() {
    LoginPage.visit();
    LoginPage.forgotLink.click();
    cy.url().should("include", "/auth/requestPasswordResetCode");
  }

  get username() { return cy.get('input[name="username"]'); }
  get resetBtn() { return cy.get('button[type="submit"]'); }
  get cancelBtn() { return cy.contains("button", "Cancel"); }
  get fieldError() { return cy.get(".oxd-input-field-error-message"); }
}

export default new ForgotPasswordPage();
