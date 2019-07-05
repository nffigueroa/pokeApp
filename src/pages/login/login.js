import React from 'react';
import {connect} from 'react-redux';

import {AddUser} from '../../actions/user';

import './login.css'
import { bindActionCreators } from 'redux';

class LoginPage extends React.Component {
    state = {  }
    render() { 
        return (
            <section className="login">
                <div className="login-container">
                    <input placeholder="User" id="user" type="text" />
                    <input placeholder="password" id="password" type="password"/>
                    <button id="btn_login">Log In</button>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})
const mapDispatchToProps = (dispatch) => bindActionCreators({AddUser}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
