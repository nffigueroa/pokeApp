import React from 'react';

import './login.css'

class LoginPage extends React.Component {
    state = {  }
    render() { 
        return (
            <section classname="login">
                <div className="login-container">
                    <input placeholder="User" id="user" type="text" />
                    <input placeholder="password" id="password" type="password"/>
                    <button id="btn_login">Log In</button>
                </div>
            </section>
        )
    }
}
 
export default LoginPage;