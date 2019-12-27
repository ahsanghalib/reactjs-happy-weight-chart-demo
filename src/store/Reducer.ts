import { produce } from "immer";
import { AppAction, AppState, ViewEnum } from "../types";

const initialState: AppState = {
	basicInfo: [],
	number: [],
	survey: [],
	error: false,
	errorMsg: "",
	loading: false,
	currentView: ViewEnum.NUMBER,
	currentUser: 0,
	editBasicId: "",
	editSurveyId: ""
};

function Reducer(state = initialState, action: AppAction) {
	switch (action.type) {
		case "EDIT_BASIC":
			return produce(state, draft => {
				draft.editBasicId = action.data;
			});
		case "EDIT_SURVEY":
			return produce(state, draft => {
				draft.editSurveyId = action.data;
			});
		case "CURRENT_USER":
			return produce(state, draft => {
				draft.currentUser = action.data;
			});
		case "CHANGE_VIEW":
			return produce(state, draft => {
				draft.currentView = action.data;
			});
		case "GET_NUMBER":
			return produce(state, draft => {
				draft.number = action.data;
			});
		case "GET_BASIC_INFO":
			return produce(state, draft => {
				draft.basicInfo = action.data;
			});
		case "GET_SURVEY":
			return produce(state, draft => {
				draft.survey = action.data;
			});
		case "ERROR":
			return produce(state, draft => {
				draft.error = action.error;
				draft.errorMsg = action.errorMsg;
			});
		case "LOADING":
			return produce(state, draft => {
				draft.loading = action.data;
			});
		default:
			return state;
	}
}

export default Reducer;
