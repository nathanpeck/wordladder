/* Instructions:

   Below is a piece of code, which is functional, but extremely hard to read.

   The purpose of this code is to find a word ladder between two words. The word
   ladder is a series of words that each differ by a single letter, forming a bridge
   between two provided words.

   An example of a word ladder between "god" and "dog" might be:

   god -> got -> dot -> dog

   1. First pretend that the code below was sent to you for a code review
      prior to being merged in. Write a critique of the code and what you notice
      with it that should be improved before it can be merged in:



   2. Then spend some time understanding how the code works, and refactoring it
      to improve clarity, style and how it operates. Try to follow best practices
      for JavaScript style, and make better use of the native JavaScript functions.

   3. Afterward, please write a few thoughts about what you changed to make the code
      better:
      
      

   4. Write unit tests for the findWordLadder() function and underlying WordLadder
      class. These tests should exercise the code, validate that it actually returns
      a valid word ladder, and validate that it responds appropriately to various
      edge cases. If edge case issues are discovered in writing the tests then
      fix them.

*/

function findWordLadder(startWord, endWord, dictionary) {
  function WordLadder(word) {
    this.prev = null
    this.word = word
    this.extendLadder = function(word) {
      var result = new WordLadder(word)
      result.prev = this
      return result
    };
    this.toArray = function() {
      var result = []
      for (var curr = this; curr !== null; curr = curr.prev) result.push(curr.word)
      var reversedArray = []
      for (var i = result.length-1; i >= 0; i--) reversedArray[result.length-i-1] = result[i]
      return reversedArray
    };
  }
  var working = [ new WordLadder(startWord)]
  var usedWords = {}
  while (working.length !== 0) {
    var ladder = working.shift()
    if (usedWords[ladder.word] !== undefined) continue
    usedWords[ladder.word] = null
    if (ladder.word == endWord)
    return ladder.toArray()
    // Find the next word
    var successors = []
    for (var i = 0; i <= ladder.word.length; ++i) {
      for (var ch = 'a'.charCodeAt(0); ch <= 'z'.charCodeAt(0); ++ch) {
        var candidate = ""
        for (var j = 0; j < i; j++) candidate += ladder.word[j]
        candidate += String.fromCharCode(ch)
        for (var k = i+1; k < ladder.word.length; k++) candidate += ladder.word[k]
        if (dictionary[candidate] !== undefined)
          working[working.length] = ladder.extendLadder(candidate)
      }
    }
  }
}

var abbreviatedDictionary = {
  "chance": null,
  "change": null,
  "changs": null,
  "chants": null,
  "chints": null,
  "chines": null,
  "chined": null,
  "coined": null,
  "conned": null,
  "conner": null,
  "conger": null,
  "starch": null,
  "stared": null,
  "starer": null,
  "stares": null,
  "starry": null,
  "starts": null,
  "starve": null,
  "stases": null,
  "stasis": null,
  "statal": null,
  "stated": null,
  "stater": null,
  "states": null,
  "static": null,
  "stator": null,
  "statue": null,
  "status": null,
  "staved": null,
  "staves": null,
  "conges": null,
  "conies": null,
  "conins": null,
  "coning": null,
  "honing": null,
  "homing": null,
  "hominy": null,
  "homily": null,
  "homely": null,
  "comely": null,
  "comedy": null
}

var result = findWordLadder('chance', 'comedy', abbreviatedDictionary)

console.log(result)
