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
});
