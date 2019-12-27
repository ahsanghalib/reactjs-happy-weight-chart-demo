import {
	BasicInfo,
	ChangeViewActionType,
	ErrorActionType,
	GetBasicInfoActionType,
	GetNumbersActionType,
	GetSurveyActionType,
	LoadingActionType,
	Number,
	SetCurrentUserActionType,
	Survey,
	ViewEnum,
	EditBasicIdActionType,
	EditSurveyIdActionType
} from "../types";

export function loadingAction(data: boolean): LoadingActionType {
	return {
		type: "LOADING",
		data: data
	};
}

export function errorAction(error: boolean, errorMsg: string): ErrorActionType {
	return {
		type: "ERROR",
		error: error,
		errorMsg: errorMsg
	};
}

export function getAllNumbersAction(data: Number[]): GetNumbersActionType {
	return {
		type: "GET_NUMBER",
		data: data
	};
}

export function getAllBasicInfoAction(
	data: BasicInfo[]
): GetBasicInfoActionType {
	return {
		type: "GET_BASIC_INFO",
		data: data
	};
}

export function getAllSurveyAction(data: Survey[]): GetSurveyActionType {
	return {
		type: "GET_SURVEY",
		data: data
	};
}

export function changeViewAction(data: ViewEnum): ChangeViewActionType {
	return {
		type: "CHANGE_VIEW",
		data: data
	};
}

export function setCurrentUserAction(data: number): SetCurrentUserActionType {
	return {
		type: "CURRENT_USER",
		data: data
	};
}

export function setEditBasicId(data: string): EditBasicIdActionType {
	return {
		type: "EDIT_BASIC",
		data: data
	};
}

export function setEditSurveyId(data: string): EditSurveyIdActionType {
	return {
		type: "EDIT_SURVEY",
		data: data
	};
}
