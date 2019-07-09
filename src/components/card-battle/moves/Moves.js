import React from 'react';

const MovesComponent = (props) => {
    const {pokemonPlayerOne, pokemonPlayerTwo, playerTwo} = props;
        const showMoves = !!(pokemonPlayerOne.moves || pokemonPlayerTwo.moves);
        const arrMoves = playerTwo ? pokemonPlayerTwo.moves : pokemonPlayerOne.moves;
        if (showMoves && arrMoves) {
             return (
                 arrMoves.map( ({move}, index) => {
                    return (
                        <div className="moves-container" key={index} onClick={() => props.useAttk(move, playerTwo)}>
                            <div className="move">{move.name}</div>
                        </div>)
                })
            )
        } else {return null}
}
 
export default MovesComponent;