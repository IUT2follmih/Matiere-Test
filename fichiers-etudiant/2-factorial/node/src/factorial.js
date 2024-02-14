/**
 * Return the factorial of i.
 * @param {number} i - an integer number.
 * @return {number} the factorial of i.
 */
let factorial = function (i) {
  if (i < 0) {
    throw "Negative number";
  }
  if (i !== parseInt(i)) {
    throw "Invalid input";
  }
  if (i === 0) {
    return 1;
  }
  return i * factorial(i - 1);
};

module.exports = factorial;
