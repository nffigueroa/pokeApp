import React from 'react';
import './poke-info.css';

class PokeInfoComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pokeInfo: this.props
        }
    }
    renderMoves = () => {

        return (
                this.props.moves.map((move, index) => {
                    return (<span key={index} className="label">
                                {move.move.name}
                            </span>)
                })
        )
    }
    render () {
        const {hp, imgSrc, name} = this.props;
        return (
            <section className="poke-info">
                <article className="card">
                <div className="title"><h1>POKE-INFO</h1></div>
                <div className="img-container">
                    <img src={imgSrc} />
                </div>
                <div className="info-container">
                    <div className="detail-container">
                        <span className="label">Name:</span>
                        <span className="detail">{name}</span>
                    </div>

                    <div className="detail-container">
                        <span className="label">HP:</span>
                        <span className="name">{hp}</span>
                    </div>
                   
                </div>
              
                </article>
                
            </section>
        )
    }
}

export default PokeInfoComponent;