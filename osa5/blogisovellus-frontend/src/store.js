import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";
const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    login: loginReducer,
    users: userReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
// store.subscribe(() => console.log("store.login", store.getState().login));
export default store;
