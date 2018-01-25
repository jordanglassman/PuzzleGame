import React, {Component} from 'react';
// import Button from './Button.js'

class AnswerQuestion extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: ''
        }

        this.handleAnswerChange = this.handleAnswerChange.bind(this);
    }

    handleAnswerChange(e) {
        this.setState({
            title: e.target.value
        })
    }
    
    handleSubmit(event) {
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
                    <label>Answer: <input type="text" value={this.state.title} onChange={this.handleAnswerChange} /></label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default AnswerQuestion