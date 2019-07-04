import React from 'react';

const PokemonRemainingComponent = (props) => {
    const {pokemonEnemies, pokemonFight, showEnemies} = props;
    const arrPokemon = showEnemies ? pokemonEnemies : pokemonFight;
    return (arrPokemon.map((item, index) => {
        return (
            <div className="pokeball" onClick={(e) => props.selectPok(`${index}${showEnemies ? 'E' : 'F'}`, e) } key={index}>
                <div className="background-red">
                    <div className="background-white"></div>
                    </div>
            </div>
        )
    }))
}
 
export default PokemonRemainingComponent;