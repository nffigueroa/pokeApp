export const ADD_ONE_FIGHT = 'ADD_ONE_FIGHT [pokemon]';
export const ADD_TO_POKELIST = 'ADD_TO_POKELIST [pokemon]';
export const SELECT_ONE_TO_FIGHT = 'SELECT_ONE_TO_FIGHT [pokemon]';
export const ADD_ENEMIES = 'ADD_ENEMIES [pokemon]'

export function addOneToFight(payload) {
    return {
        type: ADD_ONE_FIGHT,
        payload: {
            pokemonFight: payload
        }
    }
}

export function addToPokeList(payload) {
    return {
        type: ADD_TO_POKELIST,
        payload: {
            pokeList: payload
        }
    }
}

export function selectOneToFigth(pokemon) {
    return {
        type: SELECT_ONE_TO_FIGHT,
        payload: {
            pokemon
        }
    }
}

export function addEnemies(payload) {
    return {
        type: ADD_ENEMIES,
        payload
    }
}