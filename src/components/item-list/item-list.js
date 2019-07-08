import React from 'react';

import './item.css';

/**
 * 
 * @param {*} props Parameters for render the card item.
 */
const ItemList = (props)  => {
        return <div className={props.isSelected ? 'item-container item-contianer-selected' : 'item-container'} id= {props.id} onClick={() => props.returnIdOnClick(props.id)}>
        <span className="item-id">{props.id}</span>
        <span key={props.id} className="item-name">{props.name}</span>
    </div>
    
}
export default ItemList;