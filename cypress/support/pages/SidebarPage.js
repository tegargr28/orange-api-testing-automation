class SidebarPage {
  open(menu) { cy.contains(".oxd-main-menu-item", menu).click(); }
  search(text) { cy.get('.oxd-main-menu-search input[placeholder="Search"]').type(text); }
  get items() { return cy.get(".oxd-main-menu-item"); }
}

export default new SidebarPage();
