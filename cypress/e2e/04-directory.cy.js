import DirectoryPage from "../support/pages/DirectoryPage";
import SidebarPage from "../support/pages/SidebarPage";
import employees from "../fixtures/employees.json";

describe("Dashboard - Directory", () => {
  beforeEach(() => {
    cy.login();
    cy.intercept("GET", "**/api/v2/directory/employees*").as("getEmployees");
    DirectoryPage.visit();
    cy.wait("@getEmployees");
  });

  it("TC_DIRECTORY_001 - Verify access to Directory menu", () => {
    cy.visit("/web/index.php/dashboard/index");
    SidebarPage.open("Directory");

    cy.url().should("include", "/directory/viewDirectory");
    cy.contains("h6", "Directory").should("be.visible");
  });

  it("TC_DIRECTORY_002 - Search employee by name", () => {
    DirectoryPage.cardNames
      .first()
      .invoke("text")
      .then((fullName) => {
        const firstName = fullName.trim().split(" ")[0];

        DirectoryPage.nameInput.type(firstName);
        cy.get(".oxd-autocomplete-option", { timeout: 10000 }).first().click();
        DirectoryPage.searchBtn.click();

        cy.wait("@getEmployees");
        DirectoryPage.cardNames.first().should("contain", firstName);
      });
  });

  it("TC_DIRECTORY_003 - Search employee that does not exist", () => {
    DirectoryPage.nameInput.type(employees.searchNotFound);

    cy.get(".oxd-autocomplete-dropdown").should("contain", "No Records Found");
  });

  it("TC_DIRECTORY_004 - Reset filter clears all fields", () => {
    DirectoryPage.nameInput.type("a");
    cy.get(".oxd-autocomplete-option", { timeout: 10000 }).first().click();
    cy.selectFirstOption("Job Title");

    DirectoryPage.resetBtn.click();

    DirectoryPage.nameInput.should("have.value", "");
    DirectoryPage.selectedValue("Job Title").should("have.text", "-- Select --");
  });

  it("TC_DIRECTORY_005 - Validate data loaded successfully (UI + API)", () => {
    DirectoryPage.cards.should("have.length.greaterThan", 0);
    cy.contains("Record").should("be.visible");

    cy.reload();
    cy.wait("@getEmployees").its("response.statusCode").should("eq", 200);
  });

  it("TC_DIRECTORY_006 - API response has valid structure", () => {
    cy.reload();
    cy.wait("@getEmployees").then(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body.data).to.be.an("array").and.not.be.empty;
      expect(response.body.meta.total).to.be.a("number");
      expect(response.body.data[0]).to.have.property("empNumber");
    });
  });

  it("TC_DIRECTORY_007 - Filter employees by Job Title", () => {
    cy.selectFirstOption("Job Title");
    DirectoryPage.searchBtn.click();

    cy.wait("@getEmployees").its("request.url").should("include", "jobTitleId=");
  });

  it("TC_DIRECTORY_008 - Filter employees by Location", () => {
    cy.selectFirstOption("Location");
    DirectoryPage.searchBtn.click();

    cy.wait("@getEmployees").its("request.url").should("include", "locationId=");
  });
});
