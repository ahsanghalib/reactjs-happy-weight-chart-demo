import axios, { AxiosRequestConfig } from "axios";
import { API_KEY, BASE_URL } from "../config";

export function axiosClient() {
	let defaultOptions: AxiosRequestConfig = {
		baseURL: BASE_URL,
		headers: {
			"x-token": API_KEY
		}
	};

	return axios.create(defaultOptions);
}


