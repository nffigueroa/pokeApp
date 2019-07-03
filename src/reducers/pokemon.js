import {
    ADD_ONE_FIGHT, ADD_TO_POKELIST
} from '../actions/pokemon';

const managePokemon = (state = [] , {type, paylaod}) => {
    switch(type) {
        case ADD_ONE_FIGHT:
            return state;
        case ADD_TO_POKELIST :
            return paylaod.pokemon;
        default:
            return state;
    }
}

export default managePokemon;