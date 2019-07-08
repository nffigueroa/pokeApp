import React from 'react';
import {connect} from 'react-redux';
import './header.css';

const HeaderComponent = (props) => {
    return ( 
        <div className="header">
            <h1>POKEMON!</h1>
            <h3>Hi! welcome to the jungle {props.name}</h3>
            <h4>Please select at least four Pokemon for start a battle</h4>
        </div>
     );
}

const mapStateToProps  = (state) => ({
    name: state.user.payload.userName   
})
 
export default connect(mapStateToProps)(HeaderComponent);