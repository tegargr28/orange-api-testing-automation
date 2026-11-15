class DashboardPage {
  visit() {
    cy.visit("/web/index.php/dashboard/index");
  }

  get breadcrumb() { return cy.get(".oxd-topbar-header-breadcrumb h6"); }
  widget(title) { return cy.contains(".orangehrm-dashboard-widget", title); }

  logout() {
    cy.get(".oxd-userdropdown-tab").click();
    cy.contains(".oxd-userdropdown-link", "Logout").click();
  }
}

export default new DashboardPage();
