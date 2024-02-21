(function () {
  let str1Field = document.getElementById('str1-field'),
    str2Field = document.getElementById('str2-field'),
    reverseBtn = document.getElementById('reverse-btn'),
    computeDistanceBtn = document.getElementById('compute-distance-btn');

  reverseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let temp = str1Field.value;
    str1Field.value = str2Field.value;
    str2Field.value = temp;
  });

  computeDistanceBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let str1 = str1Field.value.toLowerCase(),
      str2 = str2Field.value.toLowerCase(),
      output = document.getElementById('output');

    if (!str1.length && !str2.length) {
      output.style.visibility = 'hidden';
      return;
    }

    let data = levenshtein(str1, str2);

    output.style.visibility = 'visible';
    output.querySelector('#str1').innerHTML = str1;
    output.querySelector('#str2').innerHTML = str2;
    output.querySelector('#distance').innerHTML = data.distance;
  });
})();
