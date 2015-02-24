var dictionary = require('./dictionary.js');

// Simple class for storing word ladders, with each
// node holding a word and a reference to a previous
// node which allows for a tree of words forming
// ladders.
//
// This takes less memory than storing each potential
// ladder as an array, as this way each word is stored
// once at most.
function WordLadder(word) {
  this.prev = null;
  this.word = word;
}

// Create a new word node referencing this word
WordLadder.prototype.extendLadder = function(word) {
  var result = new WordLadder(word);
  result.prev = this;
  return result;
};

// Traverse the word ladder starting from this leaf word
// and return the array of words in this ladder.
WordLadder.prototype.toArray = function() {
  var result = [];
  for (var curr = this; curr !== null; curr = curr.prev) {
    result.unshift(curr.word);
  }
  return result;
};

// Given a word, find valid words that could be a bridge towards
// the goal word.
function findSuccessors(givenWord, dictionary) {
  var successors = [];

  // For each letter in the given word
  for (var i = 0; i <= givenWord.word.length; ++i) {
    // For each character in the alphabet
    for (var ch = 'a'.charCodeAt(0); ch <= 'z'.charCodeAt(0); ++ch) {
      // Build candidate word
      var candidate = givenWord.word.substring(0, i) +
                      String.fromCharCode(ch) +
                      givenWord.word.substring(i + 1);
      // See if the word we built is valid
      if (dictionary[candidate] !== undefined) {
        successors.push(givenWord.extendLadder(candidate));
      }
    }
  }

  return successors;
}

// Given a start word, an end word, and a dictionary
// do a breadth first search to find the shortest
// word ladder between start word and end word.
function findWordLadder(startWord, endWord, dictionary) {
  var working = [
    new WordLadder(startWord)
  ];
  var usedWords = {};
  usedWords[startWord] = null; // Ensure the start word is alread used.

  while (working.length !== 0) {
    var ladder = working.shift();

    // Make sure that we don't get caught in an
    // infinite loop of repeated words in a tree.
    if (usedWords[ladder.word] !== undefined) {
      continue;
    }
    usedWords[ladder.word] = null;

    // Check to see if this current word ladder has reached
    // the destination word.
    if (ladder.word == endWord) {
      return ladder.toArray();
    }

    // Find potential words one letter away
    // from the current word and add them to the work list
    working = working.concat(findSuccessors(ladder, dictionary));
  }

  return "No word ladder found!";
}

var result = findWordLadder('chance', 'comedy', dictionary);

console.log(result);
