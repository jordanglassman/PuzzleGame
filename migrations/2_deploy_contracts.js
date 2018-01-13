var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var PuzzleGame = artifacts.require("./PuzzleGame.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(PuzzleGame);
};
