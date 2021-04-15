import loginService from "../services/login";
/* eslint-disable indent */
const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case "LOGGED_IN":
            return action.data;
        case "LOGIN":
            return action.data;
        case "LOGOUT":
            return action.data;
        default:
            return state;
    }
};

export const loginUser = (object) => {
    return async (dispatch) => {
        const user = await loginService.login(object);
        window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
        dispatch({ type: "LOGIN", data: user });
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({ type: "LOGOUT", data: {} });
    };
};

export default loginReducer;
