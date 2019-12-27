import { ThunkAction } from "redux-thunk";
import { apiURL } from "../config";
import { axiosClient } from "../helpers/Utils";
import { AppAction, AppState } from "../types";
import { errorAction, getAllBasicInfoAction, getAllNumbersAction, getAllSurveyAction, loadingAction } from "./Actions";

type Effect = ThunkAction<any, AppState, any, AppAction>;

export function getAllNumbers(): Effect {
	return function(dispatch) {
		dispatch(loadingAction(true));
		// getting all numbers
		axiosClient()
			.get(apiURL.numbers())
			.then(res => {
				const value = res.data.map((d: any) => {
					return {
						id: d._id,
						number: parseInt(d.data["phonenumber"])
					};
				});
				dispatch(getAllNumbersAction(value));
				dispatch(loadingAction(false));
			})
			.catch(err => {
				dispatch(errorAction(true, err.message));
				dispatch(loadingAction(false));
			});
	};
}

export function getAllBasicInfo(): Effect {
	return function(dispatch) {
		dispatch(loadingAction(true));
		// getting all basic info
		axiosClient()
			.get(apiURL.basicInfo())
			.then(res => {
				const value = res.data.map((d: any) => {
					return {
						id: d._id,
						fullname: d.data["fullname"],
						dob: d.data["dob"],
						gender: d.data["gender"],
						number: parseInt(d.data["number"])
					};
				});
				dispatch(getAllBasicInfoAction(value));
				dispatch(loadingAction(false));
			})
			.catch(err => {
				dispatch(errorAction(true, err.message));
				dispatch(loadingAction(false));
			});
	};
}

export function getAllSurveys(): Effect {
	return function(dispatch) {
		dispatch(loadingAction(true));
		// getting all basic info
		axiosClient()
			.get(apiURL.surveys())
			.then(res => {
				const value = res.data.map((d: any) => {
					return {
						id: d._id,
						date: d.data["date"],
						weight: parseInt(d.data["weight"]),
						water: parseInt(d.data["water"]),
						happy_level: d.data["happy_level"],
						number: parseInt(d.data["number"])
					};
				});
				dispatch(getAllSurveyAction(value));
				dispatch(loadingAction(false));
			})
			.catch(err => {
				dispatch(errorAction(true, err.message));
				dispatch(loadingAction(false));
			});
	};
}
