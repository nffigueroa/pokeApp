import React from 'react';

const BubbleComponent = (props) => {
    return <div className="bubble" style={{opacity: props.fPrint ? 1 : 0, bottom: props.fPrint ? '-25px' : '-100px'}}>-{props.tAttk}</div>
}
 
export default BubbleComponent;