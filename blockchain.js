const crypto = require('crypto');

class Block {
  constructor(index, transactions, timestamp, prevHash){
    this.index = index;
    this.transactions = transactions;
    this.timestamp = timestamp;
    this.hash = crypto.createHash('sha256').update(this.toString()).digest('hex');
    this.prevHash = prevHash;
  };

  toString() {
    return JSON.stringify(this);
  }
}

let genesisBlock = new Block(0, [], new Date().getTime(), "00000000000000000000000000000000");

let blockchain = [genesisBlock];

for (let i = 1; i < 10; i++) {
  blockchain.push(new Block(i, [], new Date().getTime(), blockchain[i-1].hash));
}

console.log(blockchain);
