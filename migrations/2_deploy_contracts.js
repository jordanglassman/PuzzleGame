var PuzzleGame = artifacts.require("./PuzzleGame.sol");
var Bytes = artifacts.require("./Bytes.sol");

module.exports = function(deployer) {
  deployer.deploy(PuzzleGame, {value: 10});
  deployer.deploy(Bytes);
};
