const querys = require("../fixtures/example.json");

describe("Search on Google", function () {
  querys.forEach(function (query) {
    it(`User is able to get to ${query.q}`, function () {
      cy.visit("https://duckduckgo.com/");
      // cy.get("textarea[id='APjFqb']").type(`${query}\n`); Google version
      cy.get("input[id='searchbox_input']").type(`${query.q}\n`);
      cy.get("a[data-testid='result-title-a']")
        .should("exist")
        .first()
        .as("firstResult");
      cy.get("@firstResult").click();
    });
  });
});
