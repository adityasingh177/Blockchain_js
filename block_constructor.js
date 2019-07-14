class Block {
  constructor(index, transactions, hash){
    this.index = index;
    this.transactions = transactions;
    this.timestamp = new Date().getTime();
    this.hash = hash;
  };

  toString() {
    return JSON.stringify(this);
  }
}

let genesisBlock = new Block(0, [], new Date().getTime(), "this_is_hash");

console.log(genesisBlock);
