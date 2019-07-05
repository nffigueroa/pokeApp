export const ADD_USER = 'ADD_USER [user]';

export default function AddUser(user) {
    return {
        type: ADD_USER,
        payload: user
    }
}
