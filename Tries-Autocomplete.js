class Node {
  constructor(letter) {
    this.letter = letter
    this.children = Array(26);
    this.word = false;
  }
}

class Tries {
  constructor() {
    this.root = new Node();
    let az = 'az'
    let start = az.charCodeAt(0);
    let end = az.charCodeAt(1)
    for (let i = start; i <= end; i++) {
      let newNode = new Node(String.fromCharCode(i))
      this.root.children[i - start] = newNode;
    }
  }

  add = (word) => {
    let az = 'az';
    let start = az.charCodeAt(0);
    let end = az.charCodeAt(1);
    let walk = (word, currentNode = this.root) => {
      // base case
      if (word.length === 0) {
        return;
      }
      // first letter of work doesn't exist as child of currentNode
      if (!currentNode.children[word.charCodeAt(0) - start]) {
        let newNode = new Node(word.charAt(0));
        if (word.length === 1) {
          newNode.word = true;
        }
        currentNode.children[word.charCodeAt(0) - start] = newNode;
      }
      walk(word.slice(1), currentNode.children[word.charCodeAt(0) - start])
    }
    walk(word)
  }

  remove = (word) => {

  }

  entry = (chars, currentNode = this.root) => {
    let az = 'az';
    let start = az.charCodeAt(0);
    let end = az.charCodeAt(1);
    // traverse through chars
    let walk = (chars, currentNode = this.root) => {
      // base case
      if (chars.length === 0) {
        console.log('autocomplete word exists')
        return currentNode;
      }
      // first letter of work doesn't exist as child of currentNode
      if (!currentNode.children[chars.charCodeAt(0) - start]) {
        console.log('new word - no autocomplete exists')
        return null;
      }
      return walk(chars.slice(1), currentNode.children[chars.charCodeAt(0) - start])
    }
    let startingNode = walk(chars);
    // now traverse from startingNode to find next shortest word
    let path = chars.split('');
    let found = false
    if (startingNode instanceof Node) {
      let traverse = (currentNode) => {
        console.log('traverse is running')
        console.log('currentNode: ', currentNode);
        // base case - will always occur
        if (currentNode.word) {
          found = true;
          return;
        }
        for (let char of currentNode.children) {
          console.log('got here')
          if (char instanceof Node && !found) {
            path.push(char.letter)
            traverse(char);
          }
        }
      }
      traverse(startingNode);
    } else {
      return chars;
    }
    return path.join('');
  }
}

let autocomplete = new Tries;
autocomplete.add('brett');
autocomplete.add('breading');
autocomplete.add('brands');
// console.log(autocomplete.root);
console.log(autocomplete.entry('br'));
