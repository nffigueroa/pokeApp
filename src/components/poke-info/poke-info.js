import React from 'react';
import './poke-info.css';
import { getPokemonSprite } from '../../services';

class PokeInfoComponent extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidUpdate() {
    }
    render () {
        return (
            <section className="poke-info">
                <div className="title"><h1>POKE-INFO</h1></div>
                <div className="img-container">
                    <img src={this.props.imgSrc} />
                </div>
                <div className="info-container">
                    <div className="detail-container">
                        <span className="label">Name:</span>
                        <span className="detail">{this.props.name}</span>
                    </div>
                    <div className="detail-container">
                        <span className="name">{this.props.height}</span>
                    </div>
                    
                </div>
            </section>
        )
    }
}

export default PokeInfoComponent;