describe('test-rpg', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('TF1 : le personnage doit se trouver sur la tuile (2, 1)', function () {
    cy.get('#character').then((character) => {
      // On introduit manuellement un délai
      cy.wait(200);

      // On récupère la tuile positionnée à la rangée 2 et colonne 1, puis
      cy.get('#map .row:nth-child(2) .tile:nth-child(1)').then((tile) => {
        // On vérifie que la position du personnage correspond exactement
        // à la position de la tuile
        expect(character[0].getBoundingClientRect()).deep.equal(
          tile[0].getBoundingClientRect()
        );
      });
    });
  });

  it("TF2 : edition du nom du personnage", function () {
    // on click sur le bouton pour ouvrir le modal
    cy.get("#edit-btn").click();

    // on verifie que le modal est ouvert
    cy.get("#edit-modal").should("have.not.class", "hide");

    // on rentre le nouveau nom
    cy.get("#name-input").type("Paul");

    // on clique sur le bouton pour valider
    cy.get("#save-btn").click();

    // on click sur le boutton pour fermer le modal
    cy.get("#edit-modal>a").click();

    // on verifie que le modal est fermé
    cy.get("#edit-modal").should("have.class", "hide");

    // on verifie que le nom a bien été changé
    cy.get("#name-output").should("contain", "Paul");
  });

  it("TF3 : Attribution des points d'attaque", function () {
    // on click sur le bouton + pour augmenter les points d'attaque
    cy.get("#attack>button:last").click();

    // on verifie que les points d'attaque sont bien à 1
    cy.get("#attack>output").should("contain", "1");

    // on check le total de points egale a 4
    cy.get("#points-output").should("contain", "4");

    // on click sur le bouton - pour diminuer les points d'attaque
    cy.get("#attack>button:first").click();

    // on verifie que les points d'attaque sont bien à 0
    cy.get("#attack>output").should("contain", "0");

    // on check le total de points egale a 5
    cy.get("#points-output").should("contain", "5");
  });

  it("TF4 : Attribution jussqu'a la limite", function () {
    // on click sur le bouton + pour augmenter les points d'attaque
    cy.get("#attack>button:last").click();
    cy.get("#attack>button:last").click();
    cy.get("#attack>button:last").click();
    cy.get("#attack>button:last").click();
    cy.get("#attack>button:last").click();

    // on check que les bouton + est desactivé
    cy.get("#attack>button:last").should("be.disabled");
    cy.get("#speed>button:last").should("be.disabled");
    cy.get("#agility>button:last").should("be.disabled");
  });

  it("TF5 : Deplacement du personnage", function () {
    // on click sur le click droit de la souris
    cy.get('#map .row:nth-child(2) .tile:nth-child(4)').click();

    cy.wait(1000);

    // on check si le perso a bien bougé
    cy.get('#character').then((character) => {
      // On récupère la tuile positionnée à la rangée 2 et colonne 1, puis
      cy.get('#map .row:nth-child(2) .tile:nth-child(4)').then((tile) => {
        // On vérifie que la position du personnage correspond exactement
        // à la position de la tuile
        expect(character[0].getBoundingClientRect()).deep.equal(
          tile[0].getBoundingClientRect()
        );
      });
    });
  });

  it("TF6 : Deplacement du joueur dans l'eau", function () {
    // on click sur le click droit de la souris
    cy.get('#map .row:nth-child(3) .tile:nth-child(3)').click();

    cy.wait(1000);

    // on check si le perso a bien bougé
    cy.get('#character').then((character) => {
      // On récupère la tuile positionnée à la rangée 2 et colonne 1, puis
      cy.get('#map .row:nth-child(3) .tile:nth-child(3)').then((tile) => {
        // On vérifie que la position du personnage correspond exactement
        // à la position de la tuile
        expect(character[0].getBoundingClientRect()).not.deep.equal(
          tile[0].getBoundingClientRect()
        );
      });
    });
  });

  it("TF7 : Deplacement du joueur dans la prairie", function () {
        // on click sur le click droit de la souris
        cy.get('#map .row:nth-child(2) .tile:nth-child(7)').click();

        cy.wait(1000);
    
        // on check si le perso a bien bougé
        cy.get('#character').then((character) => {
          // On récupère la tuile positionnée à la rangée 2 et colonne 1, puis
          cy.get('#map .row:nth-child(2) .tile:nth-child(7)').then((tile) => {
            // On vérifie que la position du personnage correspond exactement
            // à la position de la tuile
            expect(character[0].getBoundingClientRect()).deep.equal(
              tile[0].getBoundingClientRect()
            );
          });
        });
  });
});
