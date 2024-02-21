/**
 * Prepare une matrice à deux dimensions et remplit la matrice
 * avec des 0.
 * @param {Number} lineNumber - le nombre de lignes.
 * @param {Number} columnNumber - le nombre de colonnes.
 * @return {Array.<Array.<Number>>} la matrice créee
 */
let prepareMatrix = function (lineNumber, columnNumber) {
  const arr = new Array(lineNumber);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(columnNumber).fill(0);
  }
  return arr;
};

/**
 * Initialise la matrice D.
 * @param {Array.<Array.<Number>>} d - la matrice d.
 */
let initD = function (d) {
  // On remplit la première colonne
  for (let i = 0; i < d.length; i++) {
    d[i][0] = i;
  }

  // On remplit la premiere ligne
  for (let i = 0; i < d[0].length; i++) {
    // Erreur présente ici (indice '0' manquant)
    d[0][i] = i;
  }
};

/**
 * Initialise la matrice Cout.
 * @param {Array.<Array.<Number>>} cout - la matrice Cout.
 * @param {string} str1 - première chaîne.
 * @param {string} str2 - seconde chaîne.
 */
let initCout = function (cout, str1, str2) {
  // Pour chaque ligne
  for (let i = 0; i < cout.length; i++) {
    // Pour chaque colonne
    for (let j = 0; j < cout[i].length; j++) {
      if (str1.charAt(i) === str2.charAt(j)) {
        cout[i][j] = 0;
      } else {
        cout[i][j] = 1;
      }
    }
  }
};

/**
 * Remplit la matrice D à partir des informations de la matrice Cout.
 * @param {Array.<Array.<Number>>} d - la matrice D.
 * @param {Array.<Array.<Number>>} cout - la matrice Cout.
 */
let fillD = function (d, cout) {
  // Pour chaque ligne
  for (let i = 1; i < d.length; i++) {
    // Pour chaque colonne
    for (let j = 1; j < d[i].length; j++) {
      let deletionValue = d[i - 1][j] + 1,
        insertionValue = d[i][j - 1] + 1,
        substitutionValue = d[i - 1][j - 1] + cout[i - 1][j - 1];

      let minValue = Math.min(deletionValue, insertionValue, substitutionValue);

      d[i][j] = minValue;
    }
  }
};

const Node = function (label, parentNode) {
  this.label = label;
  this.parentNode = parentNode || null;
  this.children = [];
};

/**
 * Calcule le graph d'appel inversé permettant d'obtenir les suites d'opérations possibles
 * permettant de passer d'une chaîne de caractères à l'autres.
 * @param {Array.<Array.<Number>>} d - la matrice D.
 * @param {string} str1 - première chaîne.
 * @param {string} str2 - seconde chaîne.
 * @param {number} i - ligne de la case en cours de lecture
 * @param {number} j - colonne de la case en cours de lecture
 * @param {Node} parentNode - noeud courant du graphe
 * @return {Node} le graphe complet
 */
let computeGraph = function (d, str1, str2, i, j, parentNode) {
  // Valeur du caractère de chaque chaines aux indices correspondants
  const charStr1 = str1.charAt(i - 1),
    charStr2 = str2.charAt(j - 1);

  // On est arrivé à la première cellule de la matrice D
  if (i === 0 && j === 0) {
    return parentNode;
  }

  // On regarde les valeurs des trois cases dans le coin supérieur gauche de la case actuelle
  const leftCell = j > 0 ? d[i][j - 1] : Infinity, // insertion
    topCell = i > 0 ? d[i - 1][j] : Infinity, // suppression
    topLeftCell = j > 0 && i > 0 ? d[i - 1][j - 1] : Infinity; // substitution (si valeur différente)

  // On calcule la valeur minimale parmi les trois valeurs du dessus
  const minValue = Math.min(leftCell, topCell, topLeftCell);

  if (leftCell === minValue) {
    // insertion
    let node = new Node('I', parentNode);
    parentNode.children.push(node);
    computeGraph(d, str1, str2, i, j - 1, node);
  }
  if (topCell === minValue) {
    // suppression
    let node = new Node('D', parentNode);
    parentNode.children.push(node);
    computeGraph(d, str1, str2, i - 1, j, node);
  }
  if (topLeftCell === minValue) {
    // substitution
    let letter = charStr1 === charStr2 ? 'E' : 'S';
    let node = new Node(letter, parentNode);
    parentNode.children.push(node);
    computeGraph(d, str1, str2, i - 1, j - 1, node);
  }
  return parentNode;
};

/**
 * À partir du graphe d'appel, récupérer toutes les suites d'opérations possibles.
 * Ne filtrer que celles donnant lieu au plus cours chemin.
 * @param {Node} root - noeud principal du graphe.
 * @return {Array.<Object>} l'ensemble des suites d'opérations possibles minimisant le plus court chemin.
 */
let computeAllShortestPaths = function (root) {
  let nodes = [root];
  paths = [];

  // On applique un algorithme DFS pour lire le graphe à l'envers
  while (nodes.length) {
    let n = nodes.shift();
    nodes.unshift(...n.children);
    let isLeaf = n.children.length === 0;

    // Si on arrive à un noeud tout en bout de l'arbre, on lit les operations à l'envers
    if (isLeaf) {
      let path = {
        numberOfInsertion: 0,
        numberOfDeletion: 0,
        numberOfSubstitution: 0,
        numberOfOperations: 0,
        operations: []
      };

      do {
        if (n.label) {
          if (n.label === 'S') {
            path.numberOfSubstitution++;
          } else if (n.label === 'D') {
            path.numberOfDeletion++;
          } else if (n.label === 'I') {
            path.numberOfInsertion++;
          }
          if (n.label !== 'E') {
            path.numberOfOperations++;
          }
          path.operations.push(n.label);
        }
      } while ((n = n.parentNode));
      paths.push(path);
    }
  }

  // On récupère le nombre minimal d'opérations
  const shortestNumberOfOperations = Math.min(
    ...paths.map((p) => p.numberOfOperations)
  );

  // On ne retourne que les chemins dont le nombre d'opérations est minimal
  return paths.filter(
    (p) => p.numberOfOperations === shortestNumberOfOperations
  );
};

/**
 * Calcule la distance entre deux chaînes de caractères.
 * @param {string} str1 - première chaîne.
 * @param {string} str2 - seconde chaîne.
 * @return {Object} un objet contenant la distance calculée ainsi que diverses autres informations.
 */
let levenshtein = function (str1, str2) {
  let n = str1.length; // Soit n la longueur de la chaine1,
  m = str2.length; // Soit m la longueur de la chaine2,

  let d = prepareMatrix(n + 1, m + 1), // Soit une matrice D
    cout = prepareMatrix(n, m); // Soit une matrice Cout

  initD(d);
  initCout(cout, str1, str2);
  fillD(d, cout);

  // Question bonus : récupérer l'ensemble des chemins possibles permettant
  // de transformer une chaine en une autre.
  let node = computeGraph(d, str1, str2, n, m, new Node()),
    shortestPaths = computeAllShortestPaths(node);

  return {
    d: d,
    cout: cout,
    shortestPaths: shortestPaths,
    distance: d[str1.length][str2.length]
  };
};

module.exports = levenshtein;

