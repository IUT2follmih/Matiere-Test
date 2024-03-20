describe("test-login", () => {
  beforeEach(() => {
    cy.clock()
    cy.visit("http://localhost:8080/");
  });

  it("TF1 : it is possible to log in", () => {
    // on rentre le mail et le mot de passe
    cy.get("#email-field").type("test@gmail.com");
    cy.get("#password-field").type("password");

    // on vérifie que le bouton est n'est plus désactivé
    cy.get("#login-btn").should("be.enabled");

    // on clique sur le bouton
    cy.get("#login-btn").click();

    // on verifie que la fenêtre modal est ouverte
    cy.get("#welcome-modal").should("exist");
  });

  it("TF2 : a confirmation code is required", () => {
    cy.intercept("GET", "/verification", {
      trusted: false,    
    });
    // on rentre le mail et le mot de passe
    cy.get("#email-field").type("test@gmail.com");
    cy.get("#password-field").type("password");

    // on clique sur le bouton
    cy.get("#login-btn").click();

    // on verifie que la fenêtre modal est ouverte
    cy.get("#confirm-modal").should("exist");
  });

  it("TF3 : a confirmation code is incorrectly entered", () => {
    cy.intercept("GET", "/verification", {
      trusted: false,    
    });
    // on rentre le mail et le mot de passe
    cy.get("#email-field").type("test@gmail.com");
    cy.get("#password-field").type("password");

    // on clique sur le bouton
    cy.get("#login-btn").click();

    // on verifie que la fenêtre modal est ouverte
    cy.get("#confirm-modal").should("exist");

    // on rentre le code de confirmation a 5 chiffres
    cy.get("#code-group>input:first").type("a");
    cy.get("#code-group>input:first").should("have.value", "");

    cy.get("#code-group>input:nth-child(2)").type("b");
    cy.get("#code-group>input:nth-child(2)").should("have.value", "");

    cy.get("#code-group>input:nth-child(3)").type("c");
    cy.get("#code-group>input:nth-child(3)").should("have.value", "");

    cy.get("#code-group>input:nth-child(4)").type("d");
    cy.get("#code-group>input:nth-child(4)").should("have.value", "");

    cy.get("#code-group>input:nth-child(5)").type("e");
    cy.get("#code-group>input:nth-child(5)").should("have.value", "");
  });

  it("TF4 : a confirmation code is correctly entered", () => {
    cy.intercept("GET", "/verification", {
      trusted: false,    
    });
    // on rentre le mail et le mot de passe
    cy.get("#email-field").type("test@gmail.com" );
    cy.get("#password-field").type("password");

    // on clique sur le bouton
    cy.get("#login-btn").click();

    // on rentre le code de confirmation a 5 chiffres
    cy.get("#code-group>input:first").type("1");
    cy.get("#code-group>input:first").should("not.be.focused");
    cy.get("#code-group>input:nth-child(2)").should("be.focused");

    cy.get("#code-group>input:nth-child(2)").type("2");
    cy.get("#code-group>input:nth-child(2)").should("not.be.focused");
    cy.get("#code-group>input:nth-child(3)").should("be.focused");

    cy.get("#code-group>input:nth-child(3)").type("3");
    cy.get("#code-group>input:nth-child(3)").should("not.be.focused");
    cy.get("#code-group>input:nth-child(4)").should("be.focused");

    cy.get("#code-group>input:nth-child(4)").type("4");
    cy.get("#code-group>input:nth-child(4)").should("not.be.focused");
    cy.get("#code-group>input:nth-child(5)").should("be.focused");

    cy.get("#code-group>input:nth-child(5)").type("5");
    cy.get("#code-group>input:nth-child(5)").should("be.focused");

    // on check que le boutton est activé
    cy.get("#confirm-btn").should("be.enabled");
  });

  it("TF5 : no confirmation email has been received", () => {
    cy.intercept("GET", "/verification", {
      trusted: false,    
    });
    // on rentre le mail et le mot de passe
    cy.get("#email-field").type("test@gmail.com");
    cy.get("#password-field").type("password");

    // on clique sur le bouton
    cy.get("#login-btn").click();

    // on attent 51 secondes
    cy.tick(51000);

    // on check que le button de renvoi est activé
    cy.get("#send-again-btn").should("be.enabled");
  });

  it("TF6 : a confirmation code has been sent again", () => {
    cy.intercept("GET", "/verification", {
      trusted: false,    
    });
    // on rentre le mail et le mot de passe
    cy.get("#email-field").type("test@gmail.com");
    cy.get("#password-field").type("password");

    // on clique sur le bouton
    cy.get("#login-btn").click();

    cy.get("#code-group>input:nth-child(2)").type("2");
    // on attent 51 secondes
    cy.tick(51000);

    // On click
    cy.get("#send-again-btn").click();

    // on check que les 5 champs sont vides
    cy.get("#code-group>input:first").should("have.value", "");
    cy.get("#code-group>input:nth-child(2)").should("have.value", "");
    cy.get("#code-group>input:nth-child(3)").should("have.value", "");
    cy.get("#code-group>input:nth-child(4)").should("have.value", "");
    cy.get("#code-group>input:nth-child(5)").should("have.value", "");

    // on check que le boutton est re-désactivé
    cy.get("#send-again-btn").should("be.disabled");

    // on check si le compteur est bien a 50
    cy.get("#send-again-btn>output").should("contain", "50");
  });
});
