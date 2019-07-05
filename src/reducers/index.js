import {combineReducers} from 'redux';
import managePokemon from './pokemon';
import { UserReducer } from './user';

export default combineReducers({
    pokemon: managePokemon,
    user: UserReducer
})