Cypress.Commands.add("visitWithoutFetch", (path, opts = {}) => {
  cy.visit(
    path,
    Object.assign(opts, {
      onBeforeLoad(win) {
        delete win.fetch;
      }
    })
  );
});

Cypress.Commands.add("resetLanguage", () => {
  // clear language setup
  cy.clearLocalStorage("SS:SHARED:LOCALE").should(ls => {
    expect(ls.getItem("SS:SHARED:LOCALE")).to.be.null;
  });
});

Cypress.Commands.add("switchToDeutsch", () => {
  window.localStorage.setItem("SS:SHARED:LOCALE", "de");
  cy.reload();
});

Cypress.Commands.add("switchToEnglish", () => {
  window.localStorage.setItem("SS:SHARED:LOCALE", "en");
  cy.reload();
});
