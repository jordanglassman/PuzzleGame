var PuzzleGame = artifacts.require("../contracts/PuzzleGame.sol");
var Bytes = artifacts.require("../contracts/Bytes.sol");
var createKeccakHash = require('keccak');

contract('PuzzleGame', function(accounts) {
    it("should create 3 test questions in the ctor", function() {
        return PuzzleGame.deployed().then(function(instance) {
            return instance.getQuestions();
        }).then(function(questions) {
            assert.equal(questions.length, 3, "did not detect 3 test questions");
        });
    });

    it("should be possible to read the test questions back in their original form", function() {
        return PuzzleGame.deployed().then(function(instance) {
            return instance.getQuestions();
        }).then(function(questions) {
            assert.notEqual(questions.findIndex(q => q === "0x7cab416a90be7a8b4e795080a64be9b9a42da2703ce31f3417a3b213c790ee77"), -1, "did not detect specific test question, questions=" + questions);
        });
    });

    it("should create a new question", function() {
        let someAccount = accounts[0];

        let questionText = (Math.random() + 1).toString(36).substring(10);
        let questionHash = createKeccakHash('keccak256').update(questionText).digest("binary");
        let questionHashHex = createKeccakHash('keccak256').update(questionText).digest("hex");
        let answerHash = createKeccakHash('keccak256').update((Math.random() + 1).toString(36).substring(10)).digest('binary');

        return PuzzleGame.deployed().then(function(instance) {
            instance.newQuestion(questionHash, answerHash, {from: someAccount, value: 10});
            return instance;
        }).then(function(instance) {
            return instance.getQuestions();
        }).then(function(questions) {
            assert.notEqual(questions.findIndex(q => q.slice(2) === questionHashHex), -1, "did not detect specific test question, questions=" + questions);
        });
    });

    it("should something", function() {
        let someString = new Buffer("abcde", "hex").toString("binary");
        console.log(someString);
        return Bytes.deployed().then(function(instance) {
            instance.setA(someString);
            return instance;
        }).then(function(instance) {
            return instance.setB();
        }).then(function(a) {
            console.log(a);
            assert.equal(a, "abcde");
        });
    });

    // it("should send coin correctly", function() {
    //     var meta;
    //
    //     // Get initial balances of first and second account.
    //     var account_one = accounts[0];
    //     var account_two = accounts[1];
    //
    //     var account_one_starting_balance;
    //     var account_two_starting_balance;
    //     var account_one_ending_balance;
    //     var account_two_ending_balance;
    //
    //     var amount = 10;
    //
    //     return MetaCoin.deployed().then(function(instance) {
    //         meta = instance;
    //         return meta.getBalance.call(account_one);
    //     }).then(function(balance) {
    //         account_one_starting_balance = balance.toNumber();
    //         return meta.getBalance.call(account_two);
    //     }).then(function(balance) {
    //         account_two_starting_balance = balance.toNumber();
    //         return meta.sendCoin(account_two, amount, {from: account_one});
    //     }).then(function() {
    //         return meta.getBalance.call(account_one);
    //     }).then(function(balance) {
    //         account_one_ending_balance = balance.toNumber();
    //         return meta.getBalance.call(account_two);
    //     }).then(function(balance) {
    //         account_two_ending_balance = balance.toNumber();
    //
    //         assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
    //         assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    //     });
    // });
});