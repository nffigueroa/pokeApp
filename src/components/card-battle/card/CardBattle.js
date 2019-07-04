import React from 'react';
import { pokeSprite } from '../../../config';
import BubbleComponent from '../bubble/Bubble';
import ProgressBarComponent from '../progressbar/ProgressBar';
import MovesComponent from '../moves/Moves';

const CardBatlle = (props) => {
    const {pokemonPlayerOne, pokemonPlayerTwo, currentTurn, useAttk} = props;
        const showCard = pokemonPlayerOne && pokemonPlayerTwo;
        if (showCard) {
            return (<>
                <section className="pf-player-one">
                    <h1>{pokemonPlayerOne  ? pokemonPlayerOne.name : ''}</h1>
                    <div className="attk-bubble">
                        <BubbleComponent fPrint={Number(currentTurn) === 1} {...props}/>
                    </div>
                    <img src={pokemonPlayerOne.sprites ? pokemonPlayerOne.sprites[pokeSprite.back_default] : ''} />
                    <div className="container-progressbar">
                        <ProgressBarComponent {...props} />
                    </div>
                    <div className="moves">
                        <MovesComponent useAttack={useAttk} {...props} />
                    </div>
                </section>
                <section className="pf-player-one">
                    <h1>{pokemonPlayerTwo ? pokemonPlayerTwo.name : ''}</h1>
                    <div className="attk-bubble">
                        <BubbleComponent fPrint={Number(currentTurn) === 2} {...props} />
                    </div>
                    <img src={pokemonPlayerTwo.sprites ? pokemonPlayerTwo.sprites[pokeSprite.front_default] : ''} />
                    <div className="container-progressbar">
                        <ProgressBarComponent {...props} playerTwo= {true} />
                    </div>
                    <div className="moves">
                        <MovesComponent playerTwo={true} uAttack={useAttk}  {...props}/>
                    </div>
                </section>
                </>
            )
        }
}
 
export default CardBatlle;