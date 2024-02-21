describe("Simple test suite", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8090/web/");
  });

  it("La distance de levenshtein entre 'niche' et 'chiens' est de 5", () => {
    // On simule la saisie clavier de l'utilisateur et on en profite pour tester les majuscules.
    cy.get("#str1-field").type("Niche");
    cy.get("#str2-field").type("chiens");

    // On simule le clic sur le bouton "Compute distance"
    cy.get("#compute-distance-btn").click();

    // On vérifie la valeur du champ <output> "distance"
    cy.get("#distance").should("have.value", 5);

    // On vérifie que l'élément <output> str1 contient "niche" sans majuscule
    cy.get("#str1").should("have.value", "niche");
    cy.get("#str2").should("have.value", "chiens");

    // On vérifie que l'élément #output est visible
    cy.get("#output").should("have.css", "visibility", "visible");
  });

  // On teste la distance si les deux chaînes sont vides
  it("La distance n'affiche rien si les champs sont vides", () => {
    // On simule la saisie clavier de l'utilisateur et on en profite pour tester les majuscules.
    cy.get("#str1-field").type("{selectall}{backspace}");
    cy.get("#str2-field").type("{selectall}{backspace}");

    // On simule le clic sur le bouton "Compute distance"
    cy.get("#compute-distance-btn").click();

    // On vérifie que l'élément #output est invisible
    cy.get("#output").should("have.css", "visibility", "hidden");
  });

  // On teste le bouton "Swap"
  it("Le bouton inverse les champs", () => {
    cy.get("#str1-field").type("niche");
    cy.get("#str2-field").type("chiens");

    // On simule le clic sur le bouton "Swap"
    cy.get("#reverse-btn").click();

    // On vérifie que les champs ont été inversés
    cy.get("#str1-field").should("have.value", "chiens");
    cy.get("#str2-field").should("have.value", "niche");
  });
});
