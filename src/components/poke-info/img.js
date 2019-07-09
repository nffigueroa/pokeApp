import React from 'react';

class ImgComponent extends React.PureComponent {
    state = { image: false, imgStatus: 'loading' }
    render() { 
        return ( <>
            {this.state.image ? '' : <i className="fas fa-spinner fa-pulse" />}
            <img alt="imgPokeInfo" src={this.props.imgSrc} onLoad={this.imgLoaded} />
        </> );
    }
    imgLoaded =  () => {
        this.setState({image: true, imgStatus: 'Img Loaded'});
    }
}
 
export default ImgComponent;