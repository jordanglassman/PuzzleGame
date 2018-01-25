import React, {Component} from 'react';

class NewQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            question: 'Enter question...',
            answer: ''
        };

        this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearDefaultQuestionText = this.clearDefaultQuestionText.bind(this);
    }

    clearDefaultQuestionText() {
        if(this.state.question === 'Enter question...') {
            this.setState({question: ''});
        }
    }

    handleAnswerChange(event) {
        this.setState({answer: event.target.value});
    }

    handleQuestionTextChange(event) {
        this.setState({question: event.target.value});
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleSubmit(event) {
        this.props.onCreateQuestion({
            title: this.state.title,
            question: this.state.question,
            answer: this.state.answer,
        });

        event.preventDefault();
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Title: <input type="text" value={this.state.title} onChange={this.handleTitleChange} /></label>
                    <label>Question: <textarea value={this.state.question} onClick={this.clearDefaultQuestionText} onChange={this.handleQuestionTextChange} /></label>
                    <label>Answer: <textarea value={this.state.answer} onChange={this.handleAnswerChange} /></label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default NewQuestion