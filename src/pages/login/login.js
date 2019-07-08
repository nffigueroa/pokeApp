import React from 'react';
import {connect} from 'react-redux';

import {AddUser} from '../../actions/user';

import './login.css'
import { bindActionCreators } from 'redux';

class LoginPage extends React.Component {
    state = { userName : '' , password: '', buttonDisabled: true }
    render() { 
        return (
            <section className="login">
                <div className="login-container">
                        <input placeholder="User" id="userName" onChange={(e) => this.handleChange(e)} type="text" value={this.state.userName}/>
                        <input placeholder="password" id="password" type="password" value={this.state.password} onChange={(e) => this.handleChange(e)}/>
                        <button disabled={this.state.buttonDisabled} type="submit" id="btn_login" onClick={(e) => this.handleSubmit(e)}>Log In</button>
                </div>
            </section>
        )
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.AddUser(this.state)
        this.props.history.push('/list');
    }
    handleChange = (e) => {
        const {value, id} = e.target;
        this.setState({
            [id] : value,
            buttonDisabled: !!(this.state.userName.length < 3)
        })
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})
const mapDispatchToProps = (dispatch) => bindActionCreators({AddUser}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
