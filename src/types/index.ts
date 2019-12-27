import { Action } from "redux";

// Data models
export interface NumberFormModel {
	number: number;
}

export interface BasicInfoFormModel {
	fullname: string;
	dob: string;
	gender: string;
	number: number;
}

export interface SurveyFormModel {
	date: string;
	weight: number;
	water: number;
	happy_level: number;
	number: number;
}

// App Store types
export interface Number extends NumberFormModel {
	id: string;
}

export interface BasicInfo extends BasicInfoFormModel {
	id: string;
}

export interface Survey extends SurveyFormModel {
	id: string;
}

export enum ViewEnum {
	NUMBER = "NUMBER FORM",
	BASIC_INFO = "BASIC INFO FORM",
	SURVEY = "SURVEY FORM"
}

export interface AppState {
	currentUser: number;
	error: boolean;
	errorMsg: string;
	loading: boolean;
	currentView: ViewEnum;
	number: Number[];
	basicInfo: BasicInfo[];
	survey: Survey[];
	editBasicId: string;
	editSurveyId: string;
}

export interface AppStateType {
	mainStore: AppState;
}

// App actions

export interface ErrorActionType extends Action {
	type: "ERROR";
	error: boolean;
	errorMsg: string;
}

export interface LoadingActionType extends Action {
	type: "LOADING";
	data: boolean;
}

export interface GetNumbersActionType extends Action {
	type: "GET_NUMBER";
	data: Number[];
}

export interface GetBasicInfoActionType extends Action {
	type: "GET_BASIC_INFO";
	data: BasicInfo[];
}

export interface GetSurveyActionType extends Action {
	type: "GET_SURVEY";
	data: Survey[];
}

export interface ChangeViewActionType extends Action {
	type: "CHANGE_VIEW";
	data: ViewEnum;
}

export interface SetCurrentUserActionType extends Action {
	type: "CURRENT_USER";
	data: number;
}

export interface EditBasicIdActionType extends Action {
	type: "EDIT_BASIC";
	data: string;
}

export interface EditSurveyIdActionType extends Action {
	type: "EDIT_SURVEY";
	data: string;
}

export type AppAction =
	| GetNumbersActionType
	| EditBasicIdActionType
	| EditSurveyIdActionType
	| ChangeViewActionType
	| LoadingActionType
	| SetCurrentUserActionType
	| ErrorActionType
	| GetBasicInfoActionType
	| GetSurveyActionType;
