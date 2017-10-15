var EnsRelay = artifacts.require("./EnsRelay.sol");

module.exports = function(deployer) {
  deployer.deploy(EnsRelay, 0x314159265dd8dbb310642f98f50c066173c1259b);
};
