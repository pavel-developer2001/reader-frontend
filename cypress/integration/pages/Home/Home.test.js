describe("Home page", () => {
  it("visit to catalog page", () => {
    cy.visit("/");
    cy.get('a[href*=catalog"]').click();
    cy.url().should("include", "/catalog");
    cy.get("h1").contains("Каталог");
  });
});
