export const ADD_ONE_FIGHT = 'ADD_ONE_FIGHT [profile]';
export const DELETE = 'DELETE [profile]';

export function managePokemon(pokemon) {
    return {
        type: ADD_ONE_FIGHT,
        payload: {
            pokemon
        }
    }
}