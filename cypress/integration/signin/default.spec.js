import {visitAppLoginWindow} from "../../support/signin_helpers"
import {visitAppLoginWindowEnglish} from "../../support/signin_helpers"
import {enterUserCredentials} from "../../support/signin_helpers";

describe("Testing default app entarance", () => {
    beforeEach(() => {
        // clear language setup
        cy.resetLanguage();
    });

    /* Check if form can handle empty data correctly */
    it("can process empty form correctly", () => {
        // get error messages
        cy.fixture("errors/required.json").then(requiredError => {
            // try to switch language to deutsch
            cy.switchToDeutsch().should(() => {
                expect(localStorage.getItem("SS:SHARED:LOCALE")).to.equal("de");
            });

            // try visit app login window
            visitAppLoginWindow();

            // try to click submit button
            cy.get("input[type='submit']").click();

            // check if error exist
            cy.contains(requiredError.de.message).should("be.visible");

            // try to switch language to english
            cy.switchToEnglish().should(() => {
                expect(localStorage.getItem("SS:SHARED:LOCALE")).to.equal("en");
            });

            // try visit app login window
            visitAppLoginWindowEnglish();

            // try to click submit button
            cy.get("input[type='submit']").click();

            // check if error exist
            cy.contains(requiredError.en.message).should("be.visible");
        });
    });

    /* Check if form can handle incorrect data */
    it("does not pass incorrect data", () => {
        // get mock data
        cy.fixture("users/incorrect.json").then(incorrect => {
            // get error messages
            cy.fixture("errors/incorrect.json").then(incorrectError => {
                // try to switch language to deutsch
                cy.switchToDeutsch().should(() => {
                    expect(localStorage.getItem("SS:SHARED:LOCALE")).to.equal("de");
                });

                // try visit app login window
                visitAppLoginWindow();

                // try to enter incorrect credentials
                enterUserCredentials(incorrect);

                // try to click submit button
                cy.get("input[type='submit']").click();

                // check if error exist
                cy.contains(incorrectError.de.message).should("be.visible");

                // try to switch language to english
                cy.switchToEnglish().should(() => {
                    expect(localStorage.getItem("SS:SHARED:LOCALE")).to.equal("en");
                });

                // try visit app login window
                visitAppLoginWindowEnglish();

                // try to enter incorrect credentials
                enterUserCredentials(incorrect);

                // try to click submit button
                cy.get("input[type='submit']").click();

                // check if error exist
                cy.contains(incorrectError.en.message).should("be.visible");
            });
        });
    });

    /* Check if an existing default user can sign in */
    it("can sign in", () => {
        // get mock data
        cy.fixture("users/default.json").then(defaultUser => {
            let isLoggedIn = false;

            // try visit app login window
            visitAppLoginWindow();

            cy.server();

            // check if POST request with action "login" response 200 OK
            cy.route({
                method: "POST",
                url: "https://www.lieferando.de/**",
                onRequest: xhr => {
                    if (xhr.request.body.includes("login")) {
                        isLoggedIn = true;
                    }
                }
            }).as("postResponse");

            // try to enter credentials
            enterUserCredentials(defaultUser);

            // check if loading
            cy.get("span[class='name']")
                .should("be.visible")
                .then(() => {
                    cy.expect(isLoggedIn, {timeout: 15000}).to.equal(true);
                });

            // check if can go to my account page on successful login
            cy.get("span[class='name']").click();
            cy.location("pathname", {timeout: 5000}).should("equal", "/meinaccount");

            // check if correct isLogged cookie set
            cy.getCookie("isLogged").should(
                "have.property",
                "value",
                "1"
            );
        });
    });
});
