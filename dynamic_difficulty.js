const crypto = require('crypto');

let genesisBlock = {
  index: 0,
  transactions: [],
  difficulty: "000000000000000000000000000000000ffffffffffffffffffffffffff",
  timestamp: 1536907693191,
  nonce: 238199,
  prevHash: 'fffffffffffffffffffffffff',
  hash: '36a1517830a8a71a50cc619a4991ca5a1fef0289d82e8276e62a93263cb718f5',
};

let difficultyStep = "ffffffffffffffffffffffff";
let idealBlockTime = 2 * 1000; // In miliseconds
let blockchain = [genesisBlock];
let block_hash_length = 30; 

class Block {
  constructor(index, transactions, prevHash, difficulty, timestamp, nonce) {
    this.index = index;
    this.transactions = transactions;
    this.prevHash = prevHash;
    this.difficulty = difficulty;
    if (typeof timestamp === "undefined") {
      this.timestamp = new Date().getTime();
    }

    if (typeof nonce === "undefined") {
      this.nonce = 0;
    } else {
      this.nonce = nonce
    }

    this.hash = crypto.createHash('sha256').update(this.toString()).digest('hex').substring(0, block_hash_length);
  }

  updateNonce() {
    this.nonce += 1;
    let updatedBlock = new Block(this.index, this.transactions, this.prevHash, this.difficulty, this.timestamp, this.nonce);
    this.hash = updatedBlock.hash; 
  }

  toString() {
    return JSON.stringify(this);
  }
}

let hexAddition = (firstNumber, secondNumber) => {
  return (parseInt(firstNumber, 16) + parseInt(secondNumber, 16)).toString(16);
};

let hexSubtraction = (firstNumber, secondNumber) => {
  return (parseInt(firstNumber, 16) - parseInt(secondNumber, 16)).toString(16);
};

let calculateDifficulty = (index) => {

  if (blockchain.length < 3) {
    return genesisBlock.difficulty;
  }

  let lastBlockDifficulty = blockchain[index - 1].difficulty;
  let lastBlockTime = blockchain[index - 1].timestamp;
  let blockBeforeLastBlockTime = blockchain[index - 2].timestamp;
  let timeDifference = lastBlockTime - blockBeforeLastBlockTime;
  console.log("difficulty " + lastBlockDifficulty);
  console.log('Ideal Block Time', (idealBlockTime/1000), 'sec, Current Block Time', (timeDifference/1000), 'sec');

  if (timeDifference > idealBlockTime) {
    console.log('Higher Block Time, Decreaseing Difficulty');
    return hexAddition(lastBlockDifficulty, difficultyStep);
  }
  else if (timeDifference < idealBlockTime) {
    console.log('Higher Block Time, Increasing Difficulty');
    return hexSubtraction(lastBlockDifficulty, difficultyStep);
  }
  else
    return lastBlockDifficulty;
};


let createBlock = () => {
  return new Promise((resolve) => {
    console.log('Mining block', blockchain.length);
    const new_difficulty = calculateDifficulty(blockchain.length);
    let newBlock = new Block(blockchain.length, [], blockchain[blockchain.length - 1].hash, new_difficulty);

    while (parseInt(newBlock.hash, 16) > parseInt(new_difficulty, 16)) {
      newBlock.updateNonce();
    }
    resolve(newBlock);
  });
};


function main() {
  function loop() {
    return createBlock()
      .then(function (newBlock) {
        blockchain.push(newBlock);
        setTimeout(loop, 1000)
      });
  }

  return loop();
}

main();
