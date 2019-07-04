import React from 'react';

const ProgressBarComponent = (props) => {
    const {pokemonPlayerOne, pokemonPlayerTwo, playerTwo} = props;
    const { currrentHp, hp } = playerTwo ? pokemonPlayerTwo : pokemonPlayerOne;
    return (
        <div className="progressbar" style={{width: `${currrentHp * 100 / hp}%`}}></div>
    )
}
 
export default ProgressBarComponent;