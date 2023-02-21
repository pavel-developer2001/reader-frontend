describe("Testing", () => {
  it("auth testing, comment testing", () => {
    cy.visit("/");
    cy.get("[data-testid='authModal']").click();
    cy.get("[data-testid='loginEmail']").type("nextjs@gmail.com");
    cy.get("[data-testid='loginPassword']").type("12345678");
    cy.get("[data-testid='login']").click();

    cy.get("[data-testid='cardManga']").first().click();
    cy.url().should("include", "/manga/");

    cy.get(".ant-tabs-nav-list").get(".ant-tabs-tab").last().click();
    cy.get("[data-testid='commentInput']").type("test123");
    cy.get("[data-testid='addCommentBtn']").click();
  });
});
