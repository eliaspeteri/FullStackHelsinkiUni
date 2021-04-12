import { useResource } from "../hooks/index";

const userService = useResource("/api/users");

/* eslint-disable indent */
const userReducer = (state = [], action) => {
    switch (action.type) {
        case "INIT_USERS":
            return action.data;
        default:
            return state;
    }
};

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await userService.getAll();
        dispatch({ type: "INIT_USERS", data: users });
    };
};

export default userReducer;
