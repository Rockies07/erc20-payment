const TokenMock = artifacts.require("TokenMock");
const Payment = artifacts.require("Payment");

const DESIRED_OWNER = "0x3a0925aEe9856f9bc35751199643D24677542B6C";

module.exports = async function (deployer, network, accounts) {
  const [owner, __payer] = accounts
  if (network == "ganache") {
    await deployer.deploy(TokenMock, web3.utils.toWei("1000000000", "mwei"));
    const tm = await TokenMock.deployed();
    await tm.transfer(__payer, web3.utils.toWei("1000", "mwei"));
    await deployer.deploy(Payment, tm.address);
  } else if (network == "ropsten" || network == "kovan") {
    await deployer.deploy(TokenMock, web3.utils.toWei("10000000", "mwei"));
    const tm = await TokenMock.deployed();
    await deployer.deploy(Payment, tm.address);
  } else {
    if (owner !== DESIRED_OWNER) return;
    const ERC20_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
    await deployer.deploy(Payment, ERC20_ADDRESS);
  }
};
