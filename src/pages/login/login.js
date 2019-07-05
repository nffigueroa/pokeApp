import React from 'react';
import {connect} from 'react-redux';

import {AddUser} from '../../actions/user';

import './login.css'
import { bindActionCreators } from 'redux';

class LoginPage extends React.Component {
    state = { userName : '' , password: '' }
    render() { 
        return (
            <section className="login">
                <div className="login-container">
                        <input placeholder="User" id="userName" onChange={(e) => this.handleChange(e)} type="text" value={this.state.userName}/>
                        <input placeholder="password" id="password" type="password" value={this.state.password} onChange={(e) => this.handleChange(e)}/>
                        <button type="submit" id="btn_login" onClick={(e) => this.props.AddUser(this.state)}>Log In</button>
                </div>
            </section>
        )
    }
    handleChange = (e) => {
        const {value, id} = e.target;
        this.setState({
            [id] : value
        })
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})
const mapDispatchToProps = (dispatch) => bindActionCreators({AddUser}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
