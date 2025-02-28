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
      cy.get("@firstResult")
        .invoke("attr", "href")
        .then((href) => {
          cy.task("setHref", href);
        });
      cy.get("@firstResult").click();
    });
    it("It is at the request Webpage", function () {
      cy.task("getHref").then((href) => {
        cy.origin(href, { args: query }, function (query) {
          cy.url().should("include", query.q.toLowerCase());
        });
      });
    });
  });
});
