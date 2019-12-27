import { Button, Col, DatePicker, InputNumber, Row, Slider } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { apiURL } from "../config";
import {
	dateStringToISOdate,
	errorNotification,
	successNotification
} from "../helpers/Helpers";
import { axiosClient } from "../helpers/Utils";
import {
	changeViewAction,
	setCurrentUserAction,
	setEditBasicId
} from "../store/Actions";
import { getAllBasicInfo, getAllSurveys } from "../store/Effects";
import { AppStateType, SurveyFormModel, ViewEnum } from "../types";
import Chart from "../components/Chart";

function SurveyForm() {
	const initState = {
		date: new Date().toISOString().split("T")[0],
		happy_level: 1,
		number: 0,
		water: 1,
		weight: 140
	};
	const store = useSelector(
		(state: AppStateType) => state.mainStore,
		shallowEqual
	);
	const dispatch = useDispatch();
	const [initData, setInitData] = useState<SurveyFormModel>(initState);

	useEffect(() => {
		dispatch(getAllBasicInfo());
		dispatch(getAllSurveys());
	}, [dispatch]);

	const weightChangeHanlde = (value: any) => {
		setInitData({ ...initData, weight: value });
	};

	const waterChangeHanlde = (value: any) => {
		setInitData({ ...initData, water: value });
	};

	const happyChangeHanlde = (value: any) => {
		setInitData({ ...initData, happy_level: value });
	};

	const changeHandleDate = (date: any, dateString: string) => {
		setInitData({ ...initData, date: dateStringToISOdate(dateString) });
	};

	const changeUser = () => {
		dispatch(changeViewAction(ViewEnum.NUMBER));
		dispatch(setCurrentUserAction(0));
	};

	const currentUserBasicInfo = store.basicInfo.find(
		d => d.number === store.currentUser
	);

	const currentUserSurvey = store.survey.reduce((acc: any, cur: any) => {
			if (cur.number === store.currentUser)
				acc.push(cur);
			return acc;
		}, []);

	const editBasicInfo = () => {
		dispatch(setEditBasicId(currentUserBasicInfo?.id!));
		dispatch(changeViewAction(ViewEnum.BASIC_INFO));
	};

	const clickAdd = () => {
		const dateCheck = store.survey.reduce((acc: any, cur: any) => {
			if (cur.number === store.currentUser && cur.date === initData.date)
				acc.push(cur);
			return acc;
		}, []);

		if (dateCheck.length > 0) {
			errorNotification("This date record is already exists");
			return;
		}

		axiosClient()
			.post(apiURL.surveys(), {
				data: {
					date: initData.date,
					weight: initData.weight.toString(),
					water: initData.water.toString(),
					happy_level: initData.happy_level.toString(),
					number: store.currentUser.toString()
				}
			})
			.then(res => {
				successNotification("Record added.");
				setInitData(initState);
				dispatch(getAllSurveys());
			})
			.catch(err => {
				errorNotification("Something went wrong...");
			});
	};

	return (
		<div>
			<Row style={{ marginBottom: "10px" }}>
				<Button
					type="link"
					size="small"
					style={{ padding: "0" }}
					onClick={changeUser}
				>
					Change User
				</Button>
			</Row>
			<Row style={{ marginBottom: "20px" }}>
				<Col xs={24} md={10}>
					Name: <b>{currentUserBasicInfo?.fullname}</b>
				</Col>
				<Col xs={24} md={7}>
					Date of Birth:{" "}
					<b>
						{currentUserBasicInfo?.dob
							? moment(currentUserBasicInfo.dob).format("DD-MMM-YYYY")
							: ""}
					</b>
				</Col>
				<Col xs={24} md={4}>
					Gender:{" "}
					<b>{currentUserBasicInfo?.gender === "f" ? "Female" : "Male"}</b>
				</Col>
				<Col xs={24} md={3}>
					<Button type="default" onClick={editBasicInfo}>
						Edit
					</Button>
				</Col>
			</Row>
			<Row>
				<Col xs={24} md={10}>
					<Row style={{ marginBottom: "20px" }}>
						<Col>
							<h3>Date: </h3>
						</Col>
						<Col xs={24} md={14}>
							<DatePicker
								name="date"
								value={moment(initData.date)}
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
					</Row>
					<Row>
						<Col>
							<h3>Weight in Pounds:</h3>
						</Col>
						<Col xs={24} md={20}>
							<Slider
								min={140}
								max={600}
								value={
									typeof initData.weight === "number" ? initData.weight : 0
								}
								onChange={weightChangeHanlde}
							/>
						</Col>
						<Col xs={24} md={4}>
							<InputNumber
								min={140}
								max={600}
								style={{ marginLeft: "10px" }}
								value={initData.weight}
								onChange={weightChangeHanlde}
							/>
						</Col>
					</Row>
					<Row>
						<Col>
							<h3>Glasses of Water Daily:</h3>
						</Col>
						<Col xs={24} md={20}>
							<Slider
								min={1}
								max={12}
								value={typeof initData.water === "number" ? initData.water : 0}
								onChange={waterChangeHanlde}
							/>
						</Col>
						<Col xs={24} md={4}>
							<InputNumber
								min={1}
								max={12}
								style={{ marginLeft: "10px" }}
								value={initData.water}
								onChange={waterChangeHanlde}
							/>
						</Col>
					</Row>
					<Row style={{ marginBottom: "20px" }}>
						<Col>
							<h3>Happines Level:</h3>
						</Col>
						<Col xs={24} md={20}>
							<Slider
								min={1}
								max={10}
								value={
									typeof initData.happy_level === "number"
										? initData.happy_level
										: 0
								}
								onChange={happyChangeHanlde}
							/>
						</Col>
						<Col xs={24} md={4}>
							<InputNumber
								min={1}
								max={10}
								style={{ marginLeft: "10px" }}
								value={initData.happy_level}
								onChange={happyChangeHanlde}
							/>
						</Col>
					</Row>
					<Row style={{ marginBottom: "10px", textAlign: "left" }}>
						<Button type="primary" size="large" onClick={clickAdd}>
							Add
						</Button>
					</Row>
				</Col>
				<Col xs={24} md={1}></Col>
				<Col xs={24} md={13}>
					<Chart
						title="Happy Level"
						data={currentUserSurvey}
						height={200}
						width={650}
						xKey="date"
						yKey="happy_level"
						syncId="chart"
						fillColor="#5FB49C"
						strokeColor="#010312"
					/>
					<Chart
						title="Weight"
						data={currentUserSurvey}
						height={200}
						width={650}
						xKey="date"
						yKey="weight"
						syncId="chart"
						fillColor="#414288"
						strokeColor="#010312"
					/>
					<Chart
						title="Water"
						data={currentUserSurvey}
						height={200}
						width={650}
						xKey="date"
						yKey="water"
						syncId="chart"
						fillColor="#682D63"
						strokeColor="#010312"
					/>
				</Col>
			</Row>
		</div>
	);
}

export default SurveyForm;
