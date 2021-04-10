import counterReducer from "./reducer";
import deepFreeze from "deep-freeze";

describe("unicafe reducer", () => {
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0,
    };

    // PASS
    test("should return a proper initial state when called with undefined state", () => {
        const state = {};
        const action = {
            type: "DO_NOTHING",
        };

        const newState = counterReducer(undefined, action);
        expect(newState).toEqual(initialState);
    });

    // FAIL
    test("good is incremented", () => {
        const state = initialState;
        const action = {
            type: "GOOD",
        };

        deepFreeze(state);
        const newState = counterReducer(state, action);
        expect(newState).toEqual({
            good: 1,
            ok: 0,
            bad: 0,
        });
    });
    test("neutral is incremented", () => {
        const state = initialState;
        const action = {
            type: "OK",
        };

        deepFreeze(state);
        const newState = counterReducer(state, action);
        expect(newState).toEqual({
            good: 0,
            ok: 1,
            bad: 0,
        });
    });
    test("bad is incremented", () => {
        const state = initialState;
        const action = {
            type: "BAD",
        };

        deepFreeze(state);
        const newState = counterReducer(state, action);
        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 1,
        });
    });
    test("state is reset", () => {
        const state = { good: 1, ok: 1, bad: 1 };
        const action = { type: "ZERO" };

        deepFreeze(state);
        const newState = counterReducer(state, action);
        expect(newState).toEqual(initialState);
    });
});
