export const visitAppLoginWindow = () => {
    // try to visit app login window
    cy.visitWithoutFetch("");
    cy.wait(1000);
    cy.get(".userlogin").trigger("mouseover").should("be.visible").click();
    cy.wait(6000);
    cy.get("a").contains("Einloggen").should("be.visible").click({force: true});
    cy.wait(3000);
};

export const visitAppLoginWindowEnglish = () => {
    // try to visit app login window English
    cy.visitWithoutFetch("/en");
    cy.wait(1000);
    cy.get(".userlogin").trigger("mouseover").should("be.visible").click();
    cy.wait(6000);
    cy.get("a").contains("Login").should("be.visible").click({force: true});
    cy.wait(3000);
};


export const enterUserCredentials = (credentials) => {
    // try to enter default credentials
    cy.get("input[name='username']")
        .type(credentials.login)
        .should("have.value", credentials.login);
    cy.get("input[name='password']")
        .type(credentials.password)
        .should("have.value", credentials.password);
    cy.get("input[type='submit']").click();
    cy.wait(4000);
};

export const quickDefaultLogin = () => {
    // visit app login window
    cy.visitWithoutFetch("");
    cy.wait(1000);
    cy.get(".userlogin").trigger("mouseover").should("be.visible").click();
    cy.wait(5000);
    cy.get("a").contains("Einloggen").should("be.visible").click({force: true});
    cy.wait(3000);

    // get mock data
    cy.fixture("users/default.json").then(defaultUser => {
        // try to sign in
        enterUserCredentials(defaultUser);

        // check if loading
        cy.get("span[class='name']", {timeout: 15000}).should("be.visible")

        // check if can go to my account page on successful login
        cy.get("span[class='name']").click();
        cy.location("pathname", {timeout: 15000}).should("equal", "/meinaccount");
    });
};
