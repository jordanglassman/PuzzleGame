import React, {Component} from 'react';
import Question from './Question.js';

class QuestionList extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const questions = this.props.questions;
        if (questions.length > 0) {
            return <table>
                <tbody>
                    <tr>
                        <th>Question Id</th>
                        <th>Question Name</th>
                        <th>Value</th>
                        <th>Hash</th>
                    </tr>
                    {questions.map(q => <Question key={q.id} question={q} onClickAnswerQuestion={this.props.onClickAnswerQuestion} />)}
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