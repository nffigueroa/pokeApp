export const ADD_ONE_FIGHT = 'ADD_ONE_FIGHT [pokemon]';
export const ADD_TO_POKELIST = 'ADD_TO_POKELIST [pokemon]';

export function addOneToFight(pokemon) {
    return {
        type: ADD_ONE_FIGHT,
        payload: {
            pokemon
        }
    }
}

export function addToPokeList(pokemon) {
    return {
        type: ADD_TO_POKELIST,
        payload: {
            pokemon
        }
    }
}