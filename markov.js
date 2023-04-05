"Use strict";

/** Textual markov chain generator. */

class MarkovMachine {

  /** Build markov machine; read in text.*/
  constructor(text) {

    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */
  getChains() {
    let chains = {};
    const words = this.words;

    for (let i = 0; i < words.length; i++) {
      if (words[i] in chains) {
        if (i === words.length - 1) {
          chains[words[i]].push(null);
        } else {
          chains[words[i]].push(words[i + 1]);
        }
      } else {
        if (i === words.length - 1) {
          chains[words[i]] = [null];
        } else {
          chains[words[i]] = [words[i + 1]];
        }
      }
    }

    return chains;
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */
  getText() {

    let textMap = new Map();
    const firstWord = Object.keys(this.chains)[0];
    textMap.set(firstWord, this.chains[firstWord]);
    let curr = firstWord;

    do {
      // grab chains from curr
      let currChain = this.chains[curr];

      // grab random word index from curr's chain
      let idx = Math.floor(
        Math.random() * currChain.length);

      // update curr to rand word from chain
      curr = currChain[idx];
      console.log("curr", curr);

      // if curr is null
      if (curr === null) {
        break;
      }

      // update curr to rand word from chain
      textMap.set(curr, this.chains[curr]);

    } while (curr !== null);

    // generate new text from textMap and return it
    const newText = Array.from(textMap.keys()).join(' ');
    console.log(newText);
    return newText;
  }
}

// const testMarkov = new MarkovMachine("The cat is in the hat. Cats like hats. Hats in the cats.");
// console.log(testMarkov.getChains());
// console.log(testMarkov.getText());

module.exports = {
  MarkovMachine,
};