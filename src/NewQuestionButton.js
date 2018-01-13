import React, {Component} from 'react';
import Button from './Button.js'

class NewQuestionButton extends Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        return (
            <Button onClick={this.props.onClick} text='New Question' />
        );
    }
}

export default NewQuestionButton