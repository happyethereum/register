const HappyEns = artifacts.require("./HappyEns.sol");

module.exports = function(deployer) {
    // address of Ethereum ENS Contract on Mainnet
    deployer.deploy(HappyEns, "0x314159265dD8dbb310642f98f50C066173C1259b");
};
