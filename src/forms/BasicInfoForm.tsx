import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { apiURL } from "../config";
import { dateStringToISOdate, errorNotification } from "../helpers/Helpers";
import { axiosClient } from "../helpers/Utils";
import { changeViewAction, setEditBasicId } from "../store/Actions";
import { getAllBasicInfo } from "../store/Effects";
import { AppStateType, BasicInfoFormModel, ViewEnum } from "../types";

const Option = Select.Option;

function BasicInfoForm() {
	const store = useSelector(
		(state: AppStateType) => state.mainStore,
		shallowEqual
	);
	const dispatch = useDispatch();

	const [initData, setInitData] = useState<BasicInfoFormModel>({
		dob: "",
		gender: "",
		fullname: "",
		number: store.currentUser | 0
	});

	useEffect(() => {
		dispatch(getAllBasicInfo());
	}, [dispatch]);

	useEffect(() => {
		const checkData = store.basicInfo.find(d => d.number === initData.number);
		if (store.editBasicId !== "") {
			setInitData({
				dob: checkData?.dob!,
				fullname: checkData?.fullname!,
				gender: checkData?.gender!,
				number: checkData?.number!
			});
			return;
		}
		if (checkData) dispatch(changeViewAction(ViewEnum.SURVEY));
	}, [dispatch, initData.number, store.basicInfo, store.editBasicId]);

	const changeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setInitData({
			...initData,
			[event.target.name]: value
		});
	};

	const changeHandleSelect = (value: string) => {
		setInitData({ ...initData, gender: value });
	};

	const changeHandleDate = (date: any, dateString: string) => {
		setInitData({ ...initData, dob: dateStringToISOdate(dateString) });
	};

	const backClick = () => {
		dispatch(changeViewAction(ViewEnum.NUMBER));
	};

	const nextClick = () => {
		// validation check
		if (initData.fullname === "") {
			errorNotification("Please enter full name");
			return;
		}
		if (initData.fullname.length < 3) {
			errorNotification("Too short full name");
			return;
		}
		if (!/^[A-Za-z\s]*$/.test(initData.fullname)) {
			errorNotification("Only alphabets");
			return;
		}
		if (initData.dob === "") {
			errorNotification("Please select date of birth");
			return;
		}
		if (initData.gender === "") {
			errorNotification("Please select gender");
			return;
		}

		// sending data to server
		if (store.editBasicId === "") {
			axiosClient()
				.post(apiURL.basicInfo(), {
					data: {
						fullname: initData.fullname,
						dob: initData.dob,
						gender: initData.gender,
						number: store.currentUser.toString()
					}
				})
				.then(res => {
					dispatch(changeViewAction(ViewEnum.SURVEY));
				})
				.catch(err => {
					errorNotification("Something went wrong...");
				});
			return;
		}

		axiosClient()
			.put(apiURL.basicInfoById(store.editBasicId), {
				data: {
					fullname: initData.fullname,
					dob: initData.dob,
					gender: initData.gender,
					number: store.currentUser.toString()
				}
			})
			.then(res => {
				dispatch(changeViewAction(ViewEnum.SURVEY));
				dispatch(setEditBasicId(""));
			})
			.catch(err => {
				errorNotification("Something went wrong...");
			});
	};

	return (
		<div>
			<Row gutter={20} style={{ marginBottom: "20px" }}>
				<Col>
					<h3>Enter your full name: </h3>
				</Col>
				<Col>
					<Input
						type="text"
						name="fullname"
						value={initData.fullname}
						size="large"
						onChange={changeHandle}
					/>
				</Col>
			</Row>
			<Row style={{ marginBottom: "20px" }}>
				<Col md={11}>
					<Col>
						<h3>Enter your date of birth: </h3>
					</Col>
					<Col>
						<DatePicker
							name="dob"
							value={initData.dob === "" ? null : moment(initData.dob)}
							format="DD-MMM-YYYY"
							size="large"
							style={{ width: "100%" }}
							onChange={changeHandleDate}
							allowClear={false}
							disabledDate={(current: any) =>
								current && current > moment().endOf("day")
							}
						/>
					</Col>
				</Col>
				<Col md={1}></Col>
				<Col md={12}>
					<Col>
						<h3>Enter your gender: </h3>
					</Col>
					<Col>
						<Select
							size="large"
							style={{ width: "100%" }}
							value={initData.gender}
							onChange={changeHandleSelect}
						>
							<Option value="m">Male</Option>
							<Option value="f">Female</Option>
						</Select>
					</Col>
				</Col>
			</Row>
			<Row style={{ marginBottom: "10px", textAlign: "left" }}>
				<Button type="primary" size="large" onClick={backClick} disabled={store.editBasicId === "" ? false : true}>
					Back
				</Button>{" "}
				<Button type="primary" size="large" onClick={nextClick}>
					Next
				</Button>
			</Row>
		</div>
	);
}

export default BasicInfoForm;
