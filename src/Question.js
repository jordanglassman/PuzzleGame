import React, {Component} from 'react';
import AnswerQuestionButton from "./AnswerQuestionButton";

class Question extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const question = this.props.question;
        return (
            <tr>
                <td>{question.id}</td>
                <td>{question.name}</td>
                <td>{question.value}</td>
                <td>{question.hash}</td>
                <td><AnswerQuestionButton question={question} onClickAnswerQuestion={this.props.onClickAnswerQuestion} text='Answer Question' /></td>
            </tr>
        );
    }
}

export default Question