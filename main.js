const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "17/03/2003", "Genesis Block by Meet Harsoda", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash != previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let meetCoin = new Blockchain();
meetCoin.addBlock(new Block(1, "10/10/2024", { amount: 41 }));
meetCoin.addBlock(new Block(2, "10/10/2024", { amount: 31 }));

// console.log("Is blockchain valid? " + meetCoin.isChainValid());
// meetCoin.chain[1].data = { amount: 411 };
// console.log("Is blockchain valid? " + meetCoin.isChainValid());

console.log(JSON.stringify(meetCoin, null, 4));