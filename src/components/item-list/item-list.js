import React from 'react';

import './item.css';

/**
 * 
 * @param {*} props Parameters for render the card item.
 */
function ItemList ({name, index, imgSrc}) {
    return <div className="item-container">
        <span key={index} className="item-name">{name}</span>
        <img src={imgSrc} alt={name} />
    </div>
}

export default ItemList;