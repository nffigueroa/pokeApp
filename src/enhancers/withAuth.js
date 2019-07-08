import React from 'react';

export function WithAuthentication (WrappedComponent, nameProp) {
    return class AuthRenderProp  extends React.Component {
        state = {
            username: null,
            password: null,
          }
          componentDidMount() {
            const username = window.localStorage.getItem('username')
            const password = window.localStorage.getItem('password')
            this.setState({ username, password })
          }
        render() { 
            const { userName, password } = this.props
            const props = {
                [nameProp]: userName,
                ...this.props
              }
            if (userName && password) {
                return <WrappedComponent {...props}></WrappedComponent>
            } else {
                return 'You need to be logged'
            }
        }
    }
}
 
export default WithAuthentication;