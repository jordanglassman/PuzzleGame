pragma solidity ^0.4.18;


//import 'zeppelin-solidity/contracts/lifecycle/Destructible.sol';
import 'zeppelin/contracts/lifecycle/Destructible.sol';

contract PuzzleGame is Destructible {
    struct Question {
        address creator;
        uint256 answer;
        uint256 value;
        // config for creator/guesser payout?
    }

    uint256[] questionIds;
    mapping (uint256 => Question) public questions;
    mapping (address => uint256) pendingWithdrawals;

    event CorrectGuess(address guesser, uint256 question);

    // status codes:  100 question exists
    event Status(uint indexed statusCode);

    function newQuestion(uint256 question, uint256 answer) public payable {
        // new questions cost at least 1
        require(msg.value > 0);
//        if (msg.value > 0) {
//            Status(100);
//            revert();
//        }

        // check if question already exists
        require(questions[question].answer == 0);

        questionIds.push(question);
        questions[question] = Question({
            creator: msg.sender,
            answer: answer,
            value: msg.value});
    }

    function guessAnswer(uint256 question, uint256 guess) public payable {
        // guesses cost at least 1
        require(msg.value > 0);
        require(questions[question].answer != 0);

        questions[question].value += msg.value;

        if (questions[question].answer == guess) {
            CorrectGuess(msg.sender, question);
            payout(question);
            delete questions[question];
        }
    }

    function payout(uint256 question) internal {
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

    function getQuestionValue(uint256 question) view public returns (uint256) {
        return questions[question].value;
    }

    function getQuestions() public view returns (uint256[]) {
        return questionIds;
    }
}