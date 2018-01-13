import React, {Component} from 'react';

class BackButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button onClick={this.props.onClick}>Back</button>
        );
    }
}

export default BackButton