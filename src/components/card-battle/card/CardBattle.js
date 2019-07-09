import React from 'react';
import { pokeSprite } from '../../../config';
import BubbleComponent from '../bubble/Bubble';
import ProgressBarComponent from '../progressbar/ProgressBar';
import MovesComponent from '../moves/Moves';

class CardBatlle extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
                image1: false,
                image2: false
            }

    }
    render() {
        //TODO Segregate  this block into another component wich provide one card battle.
        const {pokemonPlayerOne, pokemonPlayerTwo, currentTurn, useAttk} = this.props;
        const showCard = pokemonPlayerOne && pokemonPlayerTwo;
        if (showCard) {
            return (<>
                <section className="pf-player-one" style={{boxShadow: Number(currentTurn) === 1 ? '10px 10px 56px 23px rgba(0,0,0,0.59)' : ''}}>
                    <h1>{pokemonPlayerOne  ? pokemonPlayerOne.name : ''}</h1>
                    <div className="attk-bubble">
                        <BubbleComponent fPrint={Number(currentTurn) === 1} {...this.props}/>
                    </div>
                    {!this.state.image1 
                    ?<i className="fas fa-spinner fa-pulse" />  
                    :''}
                    <img alt="Img" onLoad={ () => this.setState({image1: true})} src={pokemonPlayerOne.sprites ? pokemonPlayerOne.sprites[pokeSprite.back_default] : ''} />
                    <div className="container-progressbar">
                        <ProgressBarComponent {...this.props} />
                    </div>
                    <div className="moves">
                        <MovesComponent useAttack={useAttk} {...this.props} />
                    </div>
                </section>
                <section className="pf-player-one" style={{boxShadow: Number(currentTurn) === 2 ? '10px 10px 56px 23px rgba(0,0,0,0.59)' : ''}}>
                    <h1>{pokemonPlayerTwo ? pokemonPlayerTwo.name : ''}</h1>
                    <div className="attk-bubble">
                        <BubbleComponent fPrint={Number(currentTurn) === 2} {...this.props} />
                    </div>
                    {!this.state.image2 
                    ? <i className="fas fa-spinner fa-pulse" />
                    : ''}
                    <img alt="Img" onLoad={ () => this.setState({image2: true})}  src={pokemonPlayerTwo.sprites ? pokemonPlayerTwo.sprites[pokeSprite.front_default] : ''} /> 
                    <div className="container-progressbar">
                        <ProgressBarComponent {...this.props} playerTwo= {true} />
                    </div>
                    <div className="moves">
                        <MovesComponent playerTwo={true} uAttack={useAttk}  {...this.props}/>
                    </div>
                </section>
                </>
            )
        }
    }
    
}
 
export default CardBatlle;