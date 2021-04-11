/* eslint-disable indent */
const loginReducer = (state = [], action) => {
    switch (action.type) {
        case "LOGIN":
            return state;
        case "LOGOUT":
            return state;
        default:
            return state;
    }
};

export default loginReducer;
