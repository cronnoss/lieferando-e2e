import {quickDefaultLogin} from "../../../support/signin_helpers";

/*
  Test simply goes through the mandatory steps of the wizard,
  choosing the first value from the proposed ones
*/

describe("Testing new order creation with basic step completion", () => {
    /* Sign in before all tests in the block */
    before(() => {
        quickDefaultLogin();
    });

    /* Check if can create new order  */
    it("can create new order", () => {

        // try to type address field
        cy.get("input[placeholder='Adresse, z.B. Kirchstraße 1']").type("Lübecker Straße 19, 10559 Berlin").type("{enter}");
        cy.wait(6000);

        // try to click first restaurant in list
        cy.get("a[class='restaurantname']")
            .should("be.visible")
            .first()
            .click({timeout: 1500});

        //try to click first product in list
        cy.get("span[class='meal-name']")
            .first()
            .click()
            .click();
        cy.wait(5000);

        // try to increase quantaty of product
        cy.get("button[class='button-add-sidedish']")
            .should("be.visible")
            .should("be.enabled")
            .first()
            .click({force: true});

        // try to add first product to basket
        cy.get(".add-btn-icon")
            .should("be.visible")
            .should("be.enabled")
            .first()
            .click({force: true});

        // try to click Basket button
        cy.get(".btn-basket-products")
            .should("be.visible")
            .should("be.enabled")
            .click();

        // try to click Order button
        cy.get("button")
            .contains("Bestellen")
            .should("be.visible")
            .should("be.enabled")
            .click();

        // try to choose payment method
        cy.get("#iselectpayment")
            .select("Visa")
            .should("have.value", "6_1")
            .should("be.visible")
        cy.wait(4000);

        // try to click "Order and pay" button
        cy.get("input[type='submit']")
            .contains("Zahlungspflichtig bestellen")
            .click()
            .then(() => {
                cy.url().should("eq", "https://live.adyen.com/hpp/pay.shtml")
            });
    });
});
