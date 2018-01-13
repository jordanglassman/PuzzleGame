import PuzzleGame from '../../build/contracts/PuzzleGame.json'

let contract = {
    truffleContract: require('truffle-contract'),
    init: function(web3) {
        this.puzzleGame = this.truffleContract(PuzzleGame);
        this.puzzleGame.setProvider(web3.currentProvider);
        this.puzzleGame.defaults({from: web3.eth.accounts[0], gas:2000000});
        console.log(PuzzleGame);
        console.log(PuzzleGame.defaults);
        console.log(this.puzzleGame);
    },
    newQuestion: function() {
        let pg;

        this.puzzleGame.deployed().then((instance) => {
            pg = instance;
            console.log(pg);
            pg.newQuestion(12, 23, {value:10}).then(function(result) {
                console.log(result);
            }).catch(function(result) {
                console.log(result);
            })
        }).then(function(result) {
            pg.getQuestions().then(function(result) {
                console.log(result.map(q => q.toNumber()));
            });
        });
    }
};

export default contract