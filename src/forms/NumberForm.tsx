import { Button, Row } from "antd";
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import MaskInput from "../components/MaskInput";
import { apiURL } from "../config";
import { errorNotification } from "../helpers/Helpers";
import { axiosClient } from "../helpers/Utils";
import { changeViewAction, setCurrentUserAction } from "../store/Actions";
import { AppStateType, NumberFormModel, ViewEnum } from "../types";

function NumberForm() {
	const store = useSelector(
		(state: AppStateType) => state.mainStore,
		shallowEqual
	);
	const dispatch = useDispatch();
	const [initData, setInitData] = useState<NumberFormModel>({ number: 0 });

	const changeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInitData({ number: parseInt(event.target.value) });
	};

	const clickNext = () => {
		if (initData.number.toString().length < 4) {
			errorNotification("Please enter 4 digits");
			return;
		}
		const dataCheck = store.number.find(d => d.number === initData.number);
		if (dataCheck) {
			dispatch(changeViewAction(ViewEnum.BASIC_INFO));
			dispatch(setCurrentUserAction(initData.number));
			return;
		}

		axiosClient()
			.post(apiURL.numbers(), {
				data: {
					phonenumber: initData.number.toString()
				}
			})
			.then(res => {
				dispatch(changeViewAction(ViewEnum.BASIC_INFO));
				dispatch(setCurrentUserAction(initData.number));
			})
			.catch(err => {
				errorNotification("Something went wrong...");
			});
	};

	const enterPressHandle = () => {
		clickNext();
	};

	return (
		<div>
			<Row style={{ marginBottom: "10px" }}>
				<h3>Enter last 4 digits of your mobile number: </h3>
			</Row>
			<Row style={{ marginBottom: "10px" }}>
				<MaskInput
					mask="9999"
					size="large"
					name="number"
					value={initData.number === 0 ? "" : initData.number}
					onChangeHandle={changeHandle}
					onEnterPress={enterPressHandle}
				/>
			</Row>
			<Row style={{ marginBottom: "10px", textAlign: "left" }}>
				<Button type="primary" size="large" onClick={clickNext}>
					Next
				</Button>
			</Row>
		</div>
	);
}

export default NumberForm;
