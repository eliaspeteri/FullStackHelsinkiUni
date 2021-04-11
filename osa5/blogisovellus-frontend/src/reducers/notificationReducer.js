/* eslint-disable indent */
const notificationReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.notification;
        default:
            return state;
    }
};

export const setNotification = (notification, duration = 5) => {
    return async (dispatch) => {
        await dispatch({ type: "SET_NOTIFICATION", notification });
        setTimeout(
            () => dispatch({ type: "SET_NOTIFICATION", notification: "" }),
            duration * 1000
        );
    };
};

export default notificationReducer;
