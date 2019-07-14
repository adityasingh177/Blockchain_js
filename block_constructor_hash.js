const crypto = require('crypto');

class Block {
  constructor(index, transactions){
    this.index = index;
    this.transactions = transactions;
    this.timestamp = new Date().getTime();
    this.hash = crypto.createHash('sha256').update(this.toString()).digest('hex');
  };

  toString() {
    return JSON.stringify(this);
  }
}

let genesisBlock = new Block(0, [], new Date().getTime());

console.log(genesisBlock);
