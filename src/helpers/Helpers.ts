import { notification } from "antd";
import moment from "moment";

export function errorNotification(msg: string) {
	notification.error({
		message: "Error",
		description: msg
	});
}

export function successNotification(msg: string) {
	notification.success({
		message: "Added",
		description: msg
	});
}

// It converts string of type '01-Jan-1970' to ISO format '1970-01-01'
export function dateStringToISOdate(dateString: string): string {
	const date = dateString.split("-")[0];
	const month = moment()
		.month(dateString.split("-")[1])
		.format("MM");
	const year = dateString.split("-")[2];

	return `${year}-${month}-${date}`;
}
