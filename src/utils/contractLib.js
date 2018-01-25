import PuzzleGame from '../../build/contracts/PuzzleGame.json'

let truffleContract = require('truffle-contract');
let puzzleGame = truffleContract(PuzzleGame);

exports.init = function(web3) {
    puzzleGame.setProvider(web3.currentProvider);
};

exports.newQuestion = function(questionHash, answerHash, account, callback, errorCallback) {
    puzzleGame.deployed().then((instance) => {
        instance.newQuestion(questionHash, answerHash, {from: account, value:10, gas: 2000000}).then(function(result) {
            callback(result);
        }).catch(function(error) {
            errorCallback(error);
        })
    });
};

exports.getQuestions = function(callback, errorCallback) {
    puzzleGame.deployed().then((instance) => {
        instance.getQuestions().then(function(result) {
            callback(result);
        }).catch(function(error) {
            errorCallback(error);
        })
    });
};