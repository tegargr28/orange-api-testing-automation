class LoginPage {
  visit() {
    cy.visit("/web/index.php/auth/login");
    cy.get('input[name="username"]').should("be.visible");
  }

  get username() { return cy.get('input[name="username"]'); }
  get password() { return cy.get('input[name="password"]'); }
  get submitBtn() { return cy.get('button[type="submit"]'); }
  get alert() { return cy.get(".oxd-alert-content-text"); }
  get fieldErrors() { return cy.get(".oxd-input-field-error-message"); }
  get forgotLink() { return cy.get(".orangehrm-login-forgot-header"); }

  login(username, password) {
    if (username) this.username.type(username);
    if (password) this.password.type(password, { log: false });
    this.submitBtn.click();
  }
}

export default new LoginPage();
