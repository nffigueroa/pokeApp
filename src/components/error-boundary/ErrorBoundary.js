import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props){
        super(props);
        this.state = {hasError: false};
    }
    comoponentDidCatch(){
        this.setState({ hasError: true });
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
      }
    render () {
        if (this.state.hasError) {
            return <h1>OMFG! Let's try again</h1>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
