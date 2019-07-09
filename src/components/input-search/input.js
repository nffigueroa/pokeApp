import React from 'react';
import './input.css';

class InputSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    emitValue = (e) => {
       // this.props.cb({text : e.target.value})
    }
    render () {
        return (
            <input type="text" onChange={this.emitValue} />
        )
    }
}

export default InputSearch;