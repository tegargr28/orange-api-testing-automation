import DashboardPage from "../support/pages/DashboardPage";
import SidebarPage from "../support/pages/SidebarPage";

const widgets = [
  "Time at Work",
  "My Actions",
  "Quick Launch",
  "Buzz Latest Posts",
  "Employees on Leave Today",
  "Employee Distribution by Sub Unit",
  "Employee Distribution by Location",
];

const menus = [
  ["Admin", "/admin/"],
  ["PIM", "/pim/"],
  ["Leave", "/leave/"],
  ["Time", "/time/"],
  ["Recruitment", "/recruitment/"],
  ["My Info", "/pim/viewPersonalDetails"],
  ["Performance", "/performance/"],
  ["Directory", "/directory/"],
  ["Claim", "/claim/"],
  ["Buzz", "/buzz/"],
];

describe("Dashboard", () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visit();
  });

  it("TC_DASH_001 - Dashboard page loads after login", () => {
    cy.url().should("include", "/dashboard");
    DashboardPage.breadcrumb.should("have.text", "Dashboard");
  });

  widgets.forEach((title, i) => {
    it(`TC_DASH_W${String(i + 1).padStart(2, "0")} - Widget "${title}" is displayed`, () => {
      DashboardPage.widget(title).should("be.visible");
    });
  });

  menus.forEach(([menu, path], i) => {
    it(`TC_DASH_M${String(i + 1).padStart(2, "0")} - Sidebar menu "${menu}" navigates correctly`, () => {
      SidebarPage.open(menu);
      cy.url().should("include", path);
    });
  });

  it("TC_DASH_020 - Sidebar search filters menu items", () => {
    SidebarPage.search("Dir");

    SidebarPage.items.should("have.length", 1).and("contain", "Directory");
  });

  it("TC_DASH_021 - User can logout from user dropdown", () => {
    DashboardPage.logout();

    cy.url().should("include", "/auth/login");
  });
});
