// Main web page tests

describe("The Home is accessible", () => {
  it("Main page successfully loads", () => {
    cy.visit("/");
  });
});

describe("Current videogame page is accessible ", () => {
  it("Current game is successfully loads", () => {
    cy.visit("/");
    cy.contains("Cyber").click();
  });
});

describe("Navigate to cart ", () => {
  it("Cart is successfully loads", () => {
    cy.visit("/");
    cy.get("svg").click();
  });
});

describe("Navigate to main page via logo ", () => {
  it("Main page is successfully loads", () => {
    cy.visit("/");
    cy.contains("Game Store").click();
  });
});

describe("Open page with inserted game name into input ", () => {
  it("Game page is successfully opened", () => {
    cy.visit("/");
    cy.get("input").click().type("minecraft").should("have.value", "minecraft");
    cy.contains("Minecraft Starter Collection").click();
  });
});

describe("Current videogame is added to cart ", () => {
  it("Current game is successfully added to cart", () => {
    cy.visit("/");
    cy.contains("Cyber").click();
    cy.contains("Buy now").click();
  });
});
