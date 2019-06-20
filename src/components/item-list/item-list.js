import React from 'react';

import './item.css';

/**
 * 
 * @param {*} props Parameters for render the card item.
 */
class ItemList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="item-container" id= {this.props.id} onClick={this.onClickitem}>
        <span className="item-id">{this.props.id}</span>
        <span key={this.props.id} className="item-name">{this.props.name}</span>
    </div>
    }

    onClickitem = () => {
        this.props.returnIdOnClick(this.props.id)
    }
    
}

export default ItemList;