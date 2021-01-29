// Cart page tests

describe("2 videogames is added to cart ", () => {
  it("2 videogames is successfully added into cart", () => {
    cy.visit("/");
    cy.contains("Death").click();
    cy.contains("Buy now").click();
    cy.contains("Game Store").click();
    cy.contains("Mafia").click();
    cy.contains("Buy now").click();
    cy.get("svg").click();
  });
});

describe("Fist game quantity should be 3 and second quantity should be 2", () => {
  it("Increase curren item quantity by 1", () => {
    cy.contains("+").click();
    cy.contains("+").click();
    cy.contains("+").click();
    cy.get(":nth-child(3) > .orders-quantity > :nth-child(1)").click();
    cy.get(":nth-child(3) > .orders-quantity > :nth-child(1)").click();
  });
});

describe("Decrease curren item quantity by 1 ", () => {
  it("Fist game quantity should be 3 and second quantity should be 2", () => {
    cy.contains("-").click();
    cy.get(":nth-child(3) > .orders-quantity > :nth-child(2)").click();
  });
});

describe("Remove all games from cart", () => {
  it("Cart should be empty", () => {
    cy.contains("Remove all").click();
  });
});

//  Customer information tests

describe("Insert data into customers fields", () => {
  it("Customers fields should be filled", () => {
    cy.get(".cart-inputs > :nth-child(1) > :nth-child(4)").click().type("Maria_Nieminen@example.com").should("have.value", "Maria_Nieminen@example.com");
    cy.get(".cart-inputs > :nth-child(1) > :nth-child(6)").click().type("Maria").should("have.value", "Maria");
    cy.get(".cart-inputs > :nth-child(1) > :nth-child(8)").click().type("Nieminen").should("have.value", "Nieminen");
    cy.get(".cart-inputs > :nth-child(1) > :nth-child(10)").click().type("358449388").should("have.value", "358449388");
    cy.get(".cart-inputs > :nth-child(1) > :nth-child(12)").click().type("Aleksanterinkatu 45 A 34 Helsinki").should("have.value", "Aleksanterinkatu 45 A 34 Helsinki");
    cy.get(".cart-inputs > :nth-child(1) > :nth-child(14)").click().type("00655").should("have.value", "00655");
    cy.contains("Send").click();
  });
});
