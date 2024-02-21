const { game } = require('../../support/e2e.js');

describe('Move a piece on the chessboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8090/web/');
  });

  it('move a white pawn from c7 to c6', function () {
    cy.get('#chessboard .rank:nth-child(2) div:nth-child(3)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(3)').should(
      'have.class',
      'active'
    );

    cy.get('#chessboard .rank:nth-child(3) div:nth-child(3)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(3)').should(
      'not.have.class',
      'active'
    );
  });

  it('move a black pawn from d2 to d3', function () {
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(4)').click();

    cy.get('#chessboard .rank:nth-child(7) div:nth-child(4)').should(
      'have.class',
      'active'
    );

    cy.get('#chessboard .rank:nth-child(6) div:nth-child(4)').click();

    cy.get('#chessboard .rank:nth-child(7) div:nth-child(4)').should(
      'not.have.class',
      'active'
    );
  });

  it('move a white pawn from e2 to e4', function () {
    cy.get('#chessboard .rank:nth-child(2) div:nth-child(5)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(5)').should(
      'have.class',
      'active'
    );

    cy.get('#chessboard .rank:nth-child(4) div:nth-child(5)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(5)').should(
      'not.have.class',
      'active'
    );
  });

  it('move a black pawn from f7 to f5', function () {
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(6)').click();

    cy.get('#chessboard .rank:nth-child(7) div:nth-child(6)').should(
      'have.class',
      'active'
    );

    cy.get('#chessboard .rank:nth-child(5) div:nth-child(6)').click();

    cy.get('#chessboard .rank:nth-child(7) div:nth-child(6)').should(
      'not.have.class',
      'active'
    );
  });

  it('move a white pawn from g2 to g4', function () {
    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').should(
      'have.class',
      'active'
    );

    cy.get('#chessboard .rank:nth-child(4) div:nth-child(7)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(7)').should(
      'not.have.class',
      'active'
    );
  });

  it('move a black pawn from h7 to h5', function () {
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(7) div:nth-child(8)').should(
      'have.class',
      'active'
    );

    cy.get('#chessboard .rank:nth-child(5) div:nth-child(8)').click();

    cy.get('#chessboard .rank:nth-child(7) div:nth-child(8)').should(
      'not.have.class',
      'active'
    );
  });

  it('move a white pawn from b2 to b4', function () {
    cy.get('#chessboard .rank:nth-child(2) div:nth-child(2)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(2)').should(
      'have.class',
      'active'
    );

    cy.get('#chessboard .rank:nth-child(4) div:nth-child(2)').click();

    cy.get('#chessboard .rank:nth-child(2) div:nth-child(2)').should(
      'not.have.class',
      'active'
    );
  });

  // Teste de la construction de l'histoirique
  it('should have an history of 1 moves', function () {
    cy.get('#chessboard .rank:nth-child(7) div:nth-child(5)').click();
    cy.get('#chessboard .rank:nth-child(6) div:nth-child(5)').click();

    cy.get('#history p:last-child').contains("white Pawn moved from e2 to e3");
  });
});
