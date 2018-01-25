import React, {Component} from 'react';

class BackButton extends Component {
    render() {
        return (
            <button onClick={this.props.onClick}>Back</button>
        );
    }
}

export default BackButton