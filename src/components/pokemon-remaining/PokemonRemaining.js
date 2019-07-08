import React from 'react';
import {connect} from 'react-redux';

const PokemonRemainingComponent = (props) => {
    const {pokeEnemies, pokemonFight, showEnemies} = props;
    const arrPokemon = showEnemies ? pokeEnemies : pokemonFight;
    return arrPokemon
    ? (arrPokemon.map((item, index) => {
        return (
            <div className="pokeball" onClick={(e) => props.selectPok(`${index}${showEnemies ? 'E' : 'F'}`, e) } key={index}>
                <div className="background-red">
                    <div className="background-white"></div>
                    </div>
            </div>
        )
    }))
    : <i className="fas fa-spinner fa-pulse" />;
}
 
const mapStateToProps = (state) => ({
    pokeEnemies: state.pokemon.pokeEnemies ? state.pokemon.pokeEnemies.payload : []
})
export default connect(mapStateToProps)(PokemonRemainingComponent);