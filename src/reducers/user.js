
import { ADD_USER } from '../actions/user';

export const UserReducer = (state = {}, {type, payload}) => {
    switch (type) {
        case ADD_USER:
            return {
                ...state,
                payload: {
                        userName : payload.userName,
                        password: payload.password
                }
            }
        default:
            return state;
    }
}