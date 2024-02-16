const assert = require("assert");
const Chessboard = require("../src/chessboard");
const game = require("../games/2022-03-07-game.json");

/**
 * From a file number, get the corresponding letter.
 * Rank are 1-indexed.
 * Letters are 97-indexed to get lower-alpha characters.
 * @param {number} file - the file in its number representation.
 * @return {string} returns the file in its string representation.
 */
const convertFileToString = function (file) {
  return String.fromCharCode(97 - 1 + file);
};

describe("Game", function () {
  let chessboard;

  before(function () {
    chessboard = new Chessboard();
    chessboard.init();
  });

  describe("#move and #capture", function () {
    game.forEach((action) => {
      it(`should move ${action.piece} from ${action.from} to ${action.to}`, function () {
        if (action.type === "move") {
          const piece = chessboard.getPiece(action.from.rank, action.from.file);
          if (piece === null) {
            throw new Error("No piece found at ${action.from}");
          }
          const output = piece.canMove(action.to.rank, action.to.file);
          const oracle = true;

          piece.move(action.to.rank, action.to.file);

          assert.equal(output, oracle);
        } else {
          
        }
      });
    });
  });
});
