describe("Blog app", function () {
    // PASS
    beforeEach(function () {
        // Creates a new user with username "cypress" for testing
        cy.request("POST", "http://localhost:3003/api/testing/reset");
        const user = {
            name: "Cypress",
            username: "cypress",
            password: "salainen",
        };
        cy.request("POST", "http://localhost:3003/api/users", user);
        cy.visit("http://localhost:3000");
    });
    // PASS
    it("login fails with wrong password", function () {
        cy.contains("login").click();
        cy.get("#username").type("elipet");
        cy.get("#password").type("wrong");
        cy.get("#login-button").click();

        cy.get(".error").contains("wrong credentials");
    });
    // PASS
    it("front page can be opened", function () {
        cy.contains("Blogs");
        cy.contains("Login");
    });
    // PASS
    it("login form can be opened", function () {
        cy.contains("login").click();
    });
    // PASS
    it("user can login and logout", function () {
        cy.contains("login").click();
        cy.get("#username").type("cypress");
        cy.get("#password").type("salainen");
        cy.get("#login-button").click();
        cy.get("#logout-button").click();
    });
    describe("when logged in", function () {
        describe("and several blogs exist", function () {
            beforeEach(function () {
                cy.createBlog({
                    title: "first blog",
                    author: "Cypress",
                    url: "",
                });
                cy.createBlog({
                    title: "second blog",
                    author: "Cypress",
                    url: "",
                });
                cy.createBlog({
                    title: "third blog",
                    author: "Cypress",
                    url: "",
                });
                cy.visit("http://localhost:3000");
            });
            // PASS
            it("details of one can be shown", function () {
                cy.contains("second blog")
                    .parent()
                    .find("button")
                    .as("theButton");
                cy.get("@theButton").click();
                cy.get("@theButton").should("contain", "hide");
            });
        });
        // PASS
        beforeEach(function () {
            // Logs into the API and places a JWT to the local storage
            cy.request("POST", "http://localhost:3003/api/login", {
                username: "cypress",
                password: "salainen",
            }).then((response) => {
                localStorage.setItem(
                    "loggedBlogappUser",
                    JSON.stringify(response.body)
                );
                cy.visit("http://localhost:3000");
            });
        });
        // PASS
        it("can add a new blog manually", function () {
            cy.get("#title").type("a new blog");
            cy.get("#author").type("Cypress");
            cy.contains("save").click();
            cy.contains("Successfully added blog a new blog by Cypress.");
        });
        describe("and a blog exists", function () {
            beforeEach(function () {
                cy.createBlog({
                    title: "another blog",
                    author: "Cypress",
                    url: "",
                });
                cy.visit("http://localhost:3000/");
            });

            // PASS
            it("details can be shown", function () {
                cy.contains("another blog by Cypress");
                cy.contains("show").click();
                cy.contains("another blog by Cypress");
                cy.contains("hide");
            });
            it.only("blog can be removed", function () {
                cy.contains("another blog by Cypress");
                cy.contains("show").click();
                cy.contains("remove").click();
                cy.contains("Successfully removed blog.");
            });
        });
    });
});
