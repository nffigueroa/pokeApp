import React from 'react';

import './item.css';

/**
 * 
 * @param {*} props Parameters for render the card item.
 */
const ItemList = ()  => {
        return <div className={this.props.isSelected ? 'item-container item-contianer-selected' : 'item-container'} id= {this.props.id} onClick={() => this.props.returnIdOnClick(this.props.id)}>
        <span className="item-id">{this.props.id}</span>
        <span key={this.props.id} className="item-name">{this.props.name}</span>
    </div>
    
}
export default ItemList;