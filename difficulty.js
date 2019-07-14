const crypto = require('crypto');

class Block {
 constructor(index, transactions, prevHash, nonce){
   this.index = index;
   this.transactions = transactions;
   if (typeof timestamp === "undefined") {
     this.timestamp = new Date().getTime();
   } else {
     this.timestamp = timestamp
   }

   if (typeof nonce === "undefined") {
     this.nonce = 0;
   } else {
     this.nonce = nonce;
   }

   this.hash = crypto.createHash('sha256').update(this.toString()).digest('hex');
   this.prevHash=prevHash;
 };

 updateNonce() {
   this.nonce += 1;
   let updatedBlock = new Block(this.index, this.transactions, this.prevHash, this.nonce);
   this.hash = updatedBlock.hash;
 }

 toString() {
   return JSON.stringify(this);
 }
}
let genesisBlock = new Block(0, [], new Date().getTime(), "this_is_hash_for_block_0", "this_is_prev_hash");

let blockchain = [genesisBlock];
let newBlock = new Block(1, [], genesisBlock.hash);

console.log(newBlock);

let difficulty = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

while (parseInt(newBlock.hash, 16) > parseInt(difficulty, 16)) {
 newBlock.updateNonce();
}

blockchain.push(newBlock);

console.log(blockchain);

console.log("Mined block => ", newBlock);
