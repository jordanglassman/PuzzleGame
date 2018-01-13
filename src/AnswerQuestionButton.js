import React, {Component} from 'react';
import Button from './Button.js'

class AnswerQuestionButton extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(question, e) {
        this.props.onClickAnswerQuestion(question);
    }

    render() {
        return (
            <Button onClick={this.handleClick.bind(this, this.props.question)} text='Answer Question' />
        );
    }
}

export default AnswerQuestionButton