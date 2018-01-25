import React, {Component} from 'react';
import Question from './Question.js';

class QuestionList extends Component {
    render() {
        const questions = this.props.questions;
        if (questions.length > 0) {
            return <table>
                <tbody>
                    <tr>
                        <th>Question Mongo Id</th>
                        <th>Question Title</th>
                        <th>Question</th>
                        <th>Hash</th>
                    </tr>
                    {questions.map(q => <Question key={q._id} question={q} onClickAnswerQuestion={this.props.onClickAnswerQuestion} />)}
                </tbody>
            </table>;
        } else {
            return <div>
                No questions!
            </div>;
        }
    }
}

export default QuestionList