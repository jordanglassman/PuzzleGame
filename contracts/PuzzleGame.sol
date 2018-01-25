pragma solidity ^0.4.18;


import 'zeppelin-solidity/contracts/lifecycle/Destructible.sol';

// first question
// --- BEGIN QUESTION ---what is the answer to life, the universe, and everything?--- END QUESTION ---
// --- BEGIN ANSWER ---42--- END ANSWER ---
// fab21be2ca0e2ea701895cbfe8e4bfafdb3afe7f18752968aa98924124d32eaf
// 7da29579a53031f2f75a3b310fedb19e841ce21aaf12de35b29239b75e0f0c5c

// --- BEGIN QUESTION ---what is the answer to life, the universe, and everything + 1?--- END QUESTION ---
// --- BEGIN ANSWER ---43--- END ANSWER ---
// 7e57cef933064fc15bb0d76a5da7815f00f5d54af1de35bd100ba1621dc52156
// ead7add44d96e1a14a1c4196a9f03949878ce45ec53bd05d369562b888105c41

// --- BEGIN QUESTION ---what is the answer to life, the universe, and everything + 1?--- END QUESTION ---
// --- BEGIN ANSWER ---44--- END ANSWER ---
// 7cab416a90be7a8b4e795080a64be9b9a42da2703ce31f3417a3b213c790ee77
// c5e6c783bcdbf1b7cb6cae615b5fe565b220b9faeb5ae0a94ac6e35673864452

// https://www.decrane.io/keccak

contract PuzzleGame is Destructible {
    struct Question {
        address creator;
        bytes32 answer;
        uint256 value;
        // config for creator/guesser payout?
    }

    bytes32[] questionIds;
    mapping (bytes32 => Question) public questions;
    mapping (address => uint256) pendingWithdrawals;

    function PuzzleGame() public payable {
//         for testing, instantiate with a couple of questions
        newQuestion(hex"fab21be2ca0e2ea701895cbfe8e4bfafdb3afe7f18752968aa98924124d32eaf", hex"ccb1f717aa77602faf03a594761a36956b1c4cf44c6b336d1db57da799b331b8");
        newQuestion(hex"7e57cef933064fc15bb0d76a5da7815f00f5d54af1de35bd100ba1621dc52156", hex"ead7add44d96e1a14a1c4196a9f03949878ce45ec53bd05d369562b888105c41");
        newQuestion(hex"7cab416a90be7a8b4e795080a64be9b9a42da2703ce31f3417a3b213c790ee77", hex"c5e6c783bcdbf1b7cb6cae615b5fe565b220b9faeb5ae0a94ac6e35673864452");
    }

    event CorrectGuess(address guesser, bytes32 question);

    // status codes:  100 question exists
    // event Status(uint indexed statusCode);

    function newQuestion(bytes32 question, bytes32 answer) public payable {
        // new questions cost at least 1
        require(msg.value > 0);

        // check if question already exists
        require(questions[question].answer == 0);

        questionIds.push(question);
        questions[question] = Question({
            creator: msg.sender,
            answer: answer,
            value: msg.value});
    }

    function guessAnswer(bytes32 question, bytes32 guess) public payable {
        // guesses cost at least 1
        require(msg.value > 0);
        require(questions[question].answer != 0);

        questions[question].value += msg.value;

        if (guess == questions[question].answer) {
            CorrectGuess(msg.sender, question);
            payout(question);
            delete questions[question];
        }
    }

    function payout(bytes32 question) internal {
        uint256 questionValue = questions[question].value;

        // creator share
        uint256 creatorShare = fractionOf(questionValue, 45);
        questionValue -= creatorShare;
        pendingWithdrawals[questions[question].creator] = creatorShare;

        // creator share
        uint256 guesserShare = fractionOf(questionValue, 45);
        questionValue -= guesserShare;
        pendingWithdrawals[msg.sender] = guesserShare;

        // remainder goes to contract owner
        owner.transfer(questionValue);
    }

    function fractionOf(uint256 value, uint8 fraction) public pure returns (uint256) {
        return (value * fraction)/100;
    }

    function withdraw() public {
        uint amount = pendingWithdrawals[msg.sender];
        pendingWithdrawals[msg.sender] = 0;
        msg.sender.transfer(amount);
    }

    function getQuestionValue(bytes32 question) view public returns (uint256) {
        return questions[question].value;
    }

    function getQuestions() public view returns (bytes32[]) {
        return questionIds;
    }
}