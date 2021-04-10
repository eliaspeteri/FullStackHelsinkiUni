const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
};

const counterReducer = (state = initialState, action) => {
    let newState = { ...state };
    console.log(action);
    switch (action.type) {
        case "GOOD":
            newState.good++;
            return newState;
        case "OK":
            newState.ok++;
            return newState;
        case "BAD":
            newState.bad++;
            return newState;
        case "ZERO":
            state = initialState;
            return state;
        default:
            return state;
    }
};

export default counterReducer;
