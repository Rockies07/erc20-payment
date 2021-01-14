/**
 * @author Billy Editiano, Gleeger Indonesia
 */

const Web3 = require("web3");
const web3 = new Web3();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");

const privateKey = fs.readFileSync("./secrets/private.key").toString().trim();
const infuraKey = fs.readFileSync("./secrets/infura.key").toString().trim();
const etherscanKey = fs.readFileSync("./secrets/etherscan.key").toString().trim();

module.exports = {

  networks: {
    // development: {
    //  host: "127.0.0.1",     // Localhost (default: none)
    //  port: 8545,            // Standard Ethereum port (default: none)
    //  network_id: "*",       // Any network (default: none)
    // },
    // Another network with more advanced options...
    // advanced: {
    // port: 8777,             // Custom port
    // network_id: 1342,       // Custom network
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websockets: true        // Enable EventEmitter interface for web3 (default: false)
    // },
    mainnet: {
      provider: () => new HDWalletProvider(privateKey, `https://mainnet.infura.io/v3/${infuraKey}`),
      network_id: 1,
      gas: 1500000,
      gasPrice: web3.utils.toWei("55", "gwei"),
      confirmations: 2,
      timeoutBlocks: 100,
      skipDryRun: true
    },
    ropsten: {
      provider: () => new HDWalletProvider(privateKey, `https://ropsten.infura.io/v3/${infuraKey}`),
      network_id: 3,
      gas: 1500000,
      gasPrice: web3.utils.toWei("30", "gwei"),
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    kovan: {
      provider: () => new HDWalletProvider(privateKey, `https://kovan.infura.io/v3/${infuraKey}`),
      network_id: 42,
      gas: 1500000,
      gasPrice: web3.utils.toWei("100", "gwei"),
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.6.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: etherscanKey
  }
};
