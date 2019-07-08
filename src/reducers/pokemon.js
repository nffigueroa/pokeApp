import {
    ADD_ONE_FIGHT, ADD_TO_POKELIST, SELECT_ONE_TO_FIGHT, ADD_ENEMIES
} from '../actions/pokemon';

const managePokemon = (state = [] , {type, payload}) => {
    switch(type) {
        case ADD_ONE_FIGHT:
            return {
                ...state,
                pokemonFight: {
                    ...state.pokemonFight,
                    payload
                }
            };
        case ADD_TO_POKELIST :
            return {
                ...state,
                pokeList: {
                    payload
                }
            };
        case SELECT_ONE_TO_FIGHT:
            return payload.pokemon;
        case ADD_ENEMIES :
            return {
                ...state,
                pokeEnemies: {
                    ...state.pokeEnemies,
                    payload
                }
            }
        default:
            return state;
    }
}

export default managePokemon;