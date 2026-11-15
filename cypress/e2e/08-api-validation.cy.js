describe("API Validation (cy.request)", () => {
  const employeesApi = "/web/index.php/api/v2/pim/employees";

  it("TC_API_001 - Request without session is rejected (401)", () => {
    cy.request({
      url: `${employeesApi}?limit=5`,
      failOnStatusCode: false,
      followRedirect: false,
    })
      .its("status")
      .should("eq", 401);
  });

  context("authenticated", () => {
    beforeEach(() => {
      cy.login();
    });

    it("TC_API_002 - Get employee list returns 200 and data array", () => {
      cy.request(`${employeesApi}?limit=5`).then(({ status, body }) => {
        expect(status).to.eq(200);
        expect(body.data).to.be.an("array").and.not.be.empty;
        expect(body.meta.total).to.be.a("number");
      });
    });

    it("TC_API_003 - Pagination limit is respected", () => {
      cy.request(`${employeesApi}?limit=2&offset=0`).then(({ body }) => {
        expect(body.data.length).to.be.at.most(2);
      });
    });

    it("TC_API_004 - Employee item has required fields", () => {
      cy.request(`${employeesApi}?limit=1`).then(({ body }) => {
        expect(body.data[0]).to.include.keys("empNumber", "firstName", "lastName");
      });
    });

    it("TC_API_005 - Non-existing employee returns client error", () => {
      cy.request({
        url: `${employeesApi}/99999999/personal-details`,
        failOnStatusCode: false,
      })
        .its("status")
        .should("be.within", 400, 499);
    });

    it("TC_API_006 - Response is JSON and fast enough", () => {
      cy.request(`${employeesApi}?limit=5`).then((res) => {
        expect(res.headers["content-type"]).to.include("application/json");
        expect(res.duration).to.be.lessThan(5000);
      });
    });
  });
});
