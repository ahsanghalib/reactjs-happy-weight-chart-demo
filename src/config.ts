// Form.io api key
export const API_KEY = "zKwgnRedqIoSoxZoZS52AZfjQpN1vR";

// Form.io base url
export const BASE_URL = "https://dmxivfjsnomicef.form.io";

// API URLs
export const apiURL = {
	numbers: function() {
		return "/phonenumber/submission";
	},
	numberById: function(id: any) {
		return `/phonenumber/submission/${id}`;
	},
	basicInfo: function() {
		return "/basicinfo/submission";
	},
	basicInfoById: function(id: any) {
		return `/basicinfo/submission/${id}`;
	},
	surveys: function() {
		return "/survey/submission";
	},
	surveysById: function(id: any) {
		return `/survey/submission/${id}`;
	}
};
