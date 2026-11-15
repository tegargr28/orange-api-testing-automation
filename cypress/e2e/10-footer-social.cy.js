describe("Footer & Social Media", () => {
  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
    cy.get(".orangehrm-login-footer").should("exist");
  });

  // Social links open in a new tab on external domains, which Cypress cannot follow.
  // We validate the link target (href) and that it opens in a new tab.
  const verifySocialLink = (selector, domainPattern) => {
    cy.get(`.orangehrm-login-footer-sm ${selector}`)
      .should("be.visible")
      .and("have.attr", "target", "_blank")
      .and("have.attr", "href")
      .and("match", domainPattern);
  };

  it("TC_FOOTER_001 - Verify LinkedIn redirect", () => {
    verifySocialLink('a[href*="linkedin"]', /linkedin\.com\/company\/orangehrm/i);
  });

  it("TC_FOOTER_002 - Verify Twitter redirect", () => {
    verifySocialLink('a[href*="twitter"], a[href*="x.com"]', /(twitter|x)\.com\/orangehrm/i);
  });

  it("TC_FOOTER_003 - Verify Facebook redirect", () => {
    verifySocialLink('a[href*="facebook"]', /facebook\.com\/orangehrm/i);
  });

  it("TC_FOOTER_004 - Verify YouTube redirect", () => {
    verifySocialLink('a[href*="youtube"]', /youtube\.com/i);
  });

  it("TC_FOOTER_005 - Verify OrangeHRM footer link", () => {
    cy.get(".orangehrm-copyright-wrapper a")
      .should("have.attr", "href")
      .and("match", /orangehrm\.com/i);
  });

  it("TC_FOOTER_006 - Footer shows copyright text", () => {
    cy.get(".orangehrm-copyright-wrapper").should("contain", "OrangeHRM");
  });
});
