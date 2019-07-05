export const ADD_USER = 'ADD_USER';

export const  AddUser = (user) => {
    return {
        type: ADD_USER,
        payload: user
    }
}
