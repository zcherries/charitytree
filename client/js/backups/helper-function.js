var results = [];
var permutation = function(array) {

}

var recurse = function(word, array) {
  for (var i = 0; i < array.length; i++) {
    recurse(array[i], )
  }
};

recurse('', array);

for (var i = 0; i < array.length; i++) {
  if (word.indexOf(array[i]) === -1) {
    word += ' ' + array[i];
    if (results.indexOf(word) === -1) {
      results.push(word);
    }
  }
}
