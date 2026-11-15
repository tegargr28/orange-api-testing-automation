import users from "../fixtures/users.json";

/**
 * Login once and cache the session across specs.
 * validate() re-creates the session automatically if the server session is dead.
 * Usage: cy.login()  |  cy.login("Admin", "admin123")
 */
Cypress.Commands.add(
  "login",
  (username = users.valid.username, password = users.valid.password) => {
    cy.session(
      [username, password],
      () => {
        cy.visit("/web/index.php/auth/login");
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type(password, { log: false });
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/dashboard");
      },
      {
        cacheAcrossSpecs: true,
        validate() {
          cy.request({
            url: "/web/index.php/api/v2/pim/employees?limit=1",
            failOnStatusCode: false,
          })
            .its("status")
            .should("eq", 200);
        },
      }
    );
  }
);

/**
 * Get the <input> that belongs to a form label, e.g. cy.getInputByLabel("Employee Id")
 */
Cypress.Commands.add("getInputByLabel", (label) => {
  return cy
    .contains("label", label)
    .parents(".oxd-input-group")
    .first()
    .find("input");
});

/**
 * Select the first real option of an OrangeHRM dropdown (skips "-- Select --").
 */
Cypress.Commands.add("selectFirstOption", (label) => {
  cy.contains("label", label)
    .parents(".oxd-input-group")
    .first()
    .find(".oxd-select-text")
    .click();
  cy.get(".oxd-select-option").eq(1).click();
});