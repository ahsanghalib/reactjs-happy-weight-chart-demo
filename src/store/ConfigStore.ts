import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import Reducer from "./Reducer";

export function rootReducer() {
	return combineReducers({
		mainStore: Reducer
	});
}

export const store = createStore(
	rootReducer(),
	composeWithDevTools(applyMiddleware(thunk))
);
