const notificationReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            console.log(action);
            return action.notification;
        default:
            return state;
    }
};

export const setNotification = (notification, duration) => {
    return async (dispatch) => {
        setTimeout(
            await dispatch({
                type: "SET_NOTIFICATION",
                notification,
            })
        );
    };
};

export default notificationReducer;
