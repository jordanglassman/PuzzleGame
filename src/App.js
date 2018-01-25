import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import contractLib from './utils/contractLib'

import PuzzleGameHeader from './PuzzleGameHeader.js';
import QuestionList from './QuestionList.js';
import NewQuestion from './NewQuestion.js';
import NewQuestionButton from './NewQuestionButton.js';
import BackButton from './BackButton.js';
import AnswerQuestion from './AnswerQuestion.js';

const AppState = {
    QUESTION_LIST: 0,
    NEW_QUESTION: 1,
    ANSWER_QUESTION: 2
};

import {Segment} from "semantic-ui-react";

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

function AccountsList(props) {
    if(props.web3 !== null && props.web3.eth !== null) {
        return <h1>{props.web3 !== null && props.web3.eth && props.web3.eth.accounts}</h1>;
    } else {
        return <h1>Accounts not loaded yet</h1>
    }
}

class App extends Component {
  constructor(props) {
    super(props);

      this.state = {
          web3: null,
          appState: AppState.QUESTION_LIST,
          previousAppState: null,
          questions: [],
          currentQuestion: null,
          account: null
      };

      this.handleNewQuestionClick = this.handleNewQuestionClick.bind(this);
      this.handleBackClick = this.handleBackClick.bind(this);
      this.handleCreateQuestion = this.handleCreateQuestion.bind(this);
      this.handleAnswerQuestion = this.handleAnswerQuestion.bind(this);
      this.handleSubmitAnswerQuestion = this.handleSubmitAnswerQuestion.bind(this);
  }

    componentWillMount() {
        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                });

                contractLib.init(this.state.web3);
                contractLib.getQuestions(
                    result => {
                        result.forEach(q => {
                            fetch("http://localhost:3001/questions/" + q, {
                                method: 'GET'
                            }).then(res => {
                                if(res.ok) {
                                    res.json().then(json => {
                                        this.state.questions.push(json);
                                        this.setState({
                                            appState: AppState.QUESTION_LIST
                                        });
                                    });
                                }
                            }).catch(error => {
                                return this.setState({error: error});
                            });
                        });
                    }, error => {
                        return this.setState({error});
                    });

                this.setState({account: this.state.web3.eth.accounts[0]});
            })
            .catch((error) => {
                this.setState({error})
            });
    }

    handleNewQuestionClick() {
        this.setState({
            previousAppState: this.state.appState,
            appState: AppState.NEW_QUESTION
        });
    }

    handleBackClick() {
        this.setState({
            previousAppState: this.state.appState,
            appState: AppState.QUESTION_LIST
        });
    }

    handleCreateQuestion(question) {
        fetch("http://localhost:3001/questions", {
            method: 'POST',
            body: JSON.stringify(question),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => {
            if(res.ok) {
                res.json().then(json => {
                    contractLib.newQuestion(json.questionHash, json.answerHash, this.state.account,
                        txResult => this.setState({txStatus: txResult}),
                        error => {
                            return this.setState({error: error});
                        });

                    // TODO: refresh question list more efficiently
                    this.state.questions.push(json);
                    this.setState({
                        appState: AppState.QUESTION_LIST
                    });
                });
            }
        }).catch(error => this.setState({ error: error }));
    }

    handleAnswerQuestion(question) {
        this.setState({
            previousAppState: this.state.appState,
            appState: AppState.ANSWER_QUESTION,
            currentQuestion: question
        });
    }

    handleSubmitAnswerQuestion(question) {
        // submit answer to contract
        // add event handler to see if it's right

        this.setState({
            previousAppState: this.state.appState,
            appState: AppState.QUESTION_LIST,
            currentQuestion: null
        });
    }

    render() {
        const appState = this.state.appState;
        let currentAppComponent = null;

        if(this.state.error) {
            console.log(this.state.error);
        }

        let error = <Segment inverted color='red'>
                {this.state.error && this.state.error.message}
            </Segment>;

        console.log(this.state.txStatus);
        let txStatus = <Segment inverted color='red'>
            {this.state.txStatus && 'tx: ' + this.state.txStatus.tx}
        </Segment>;

        if (appState === AppState.NEW_QUESTION) {
            currentAppComponent = (
                <div>
                    <NewQuestion onCreateQuestion={this.handleCreateQuestion} />
                </div>
            );
        } else if(appState === AppState.QUESTION_LIST) {
            currentAppComponent = (
                <div>
                    <AccountsList web3={this.state.web3}/>
                    <QuestionList questions={this.state.questions} onClickAnswerQuestion={this.handleAnswerQuestion}/>
                    <NewQuestionButton onClick={this.handleNewQuestionClick} />
                </div>
            );
        } else if(appState === AppState.ANSWER_QUESTION) {
            currentAppComponent = (
                <div>
                    <AnswerQuestion question={this.state.question} onClickAnswerQuestion={this.props.onClickAnswerQuestion}/>
                </div>
            );
        }

        return (
            <div className="App">
                <PuzzleGameHeader/>
                {error}
                {txStatus}
                {currentAppComponent}
                <BackButton onClick={this.handleBackClick} />
            </div>
        );
    }
}

export default App
