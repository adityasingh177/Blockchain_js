const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

function stringToHex (tmp) {
  let str = '',
    i = 0,
    tmp_len = tmp.length,
    c;

  for (; i < tmp_len; i += 1) {
    c = tmp.charCodeAt(i);
    str += c.toString(16) + '';
  }
  return str;
}

let key = ec.genKeyPair();

let msg = "This is a test message";

let msgHex = stringToHex(msg);

console.log("Message hex : ", msgHex);

let signature = key.sign(msgHex);

console.log("Signature : ", signature);

let publicKey = "04" + key.getPublic().getX().toString('hex') + key.getPublic().getY().toString('hex');

let keyFromPublicKeyOnly = ec.keyFromPublic(publicKey, 'hex');

console.log("Is it correct signature ? => ", keyFromPublicKeyOnly.verify(msgHex, signature));
