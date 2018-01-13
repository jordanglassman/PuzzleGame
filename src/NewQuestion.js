import React, {Component} from 'react';

class NewQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            questionText: 'Enter question...'
        };

        this.handleQuestionTextChange = this.handleQuestionTextChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearDefault = this.clearDefault.bind(this);
    }

    clearDefault() {
        if(this.state.questionText === 'Enter question...') {
            this.setState({questionText: ''});
        }
    }

    handleQuestionTextChange(event) {
        this.setState({questionText: event.target.value});
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleSubmit(event) {
        // validate question

        const keccak = require('keccak')
        let questionHash = keccak('keccak256').update(this.state.questionText).digest('hex');

        this.props.onCreateQuestion({
            id: 'lolid',
            name: this.state.title,
            value: this.state.questionText,
            hash: questionHash
        });

        event.preventDefault();
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Title: <input type="text" value={this.state.title} onChange={this.handleTitleChange} /></label>
                    <label>Enter question: <textarea value={this.state.questionText} onClick={this.clearDefault} onChange={this.handleQuestionTextChange} /></label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default NewQuestion