const Money = require("../src/money.js");
const chai = require("chai");
const assert = require("chai").assert;
const should = require("chai").should();

describe("Money", function () {
  describe("#add()", function () {
    let m1;

    beforeEach(function () {
      m1 = new Money(10.0, "EUR");
    });

    it("should correctly add two moneys with the same currency", function () {
      m2 = new Money(20.0, "EUR");

      m1.add(m2); // On additionne m2 à m1. m1 est modifié

      let newAmount = m1.amount, // On récupère la valeur
        oracle = 30.0; // On souhaite comparer par rapport à la valeur théorique

      assert.equal(
        newAmount,
        oracle,
        `m1 vaut ${newAmount}€ alors qu'il devrait valoir ${oracle}€`
      );
    });

    it("should correctly add two moneys with different currencies", function () {
      m2 = new Money(20.0, "USD");

      m1.add(m2); // On additionne m2 à m1. m1 est modifié

      let newAmount = m1.amount, // On récupère la valeur
        oracle = 20.0; // On souhaite comparer par rapport à la valeur théorique

      newAmount.should.equal(oracle);
    });

    it("should throw an exception when the currency is neither EUR nor USD", function () {
      m2 = new Money(20.0, "BZR"); // BZR : Réal brésilien

      chai.expect(function () {
          m1.add(m2);
        }).to.throw("Unknown currency");
    });
  });
});
