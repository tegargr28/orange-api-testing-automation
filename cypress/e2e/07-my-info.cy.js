import SidebarPage from "../support/pages/SidebarPage";

describe("My Info", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/web/index.php/dashboard/index");
    SidebarPage.open("My Info");
    cy.url().should("include", "/pim/viewPersonalDetails");
  });

  it("TC_MYINFO_001 - Personal Details page is displayed", () => {
    cy.contains("h6", "Personal Details").should("be.visible");
    cy.get('input[name="firstName"]').should("not.have.value", "");
  });

  it("TC_MYINFO_002 - Navigate to Contact Details tab", () => {
    cy.contains(".orangehrm-tabs-item", "Contact Details").click();

    cy.url().should("include", "/pim/contactDetails");
    cy.contains("h6", "Contact Details").should("be.visible");
  });

  it("TC_MYINFO_003 - Navigate to Emergency Contacts tab", () => {
    cy.contains(".orangehrm-tabs-item", "Emergency Contacts").click();

    cy.url().should("include", "/pim/viewEmergencyContacts");
  });

  it("TC_MYINFO_004 - First name is required (validation, no save)", () => {
    cy.get('input[name="firstName"]').should("not.have.value", "").clear().blur();

    cy.get(".oxd-input-field-error-message").should("contain", "Required");
  });
});
