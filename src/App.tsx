import { Icon, Spin } from "antd";
import React, { useEffect } from "react";
import { createUseStyles } from "react-jss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BasicInfoForm from "./forms/BasicInfoForm";
import NumberForm from "./forms/NumberForm";
import SurveyForm from "./forms/SurveyForm";
import { getAllNumbers } from "./store/Effects";
import { AppStateType, ViewEnum } from "./types";

const useStyles = createUseStyles({
	app: {
		position: "absolute",
		top: "10%",
		bottom: "5%",
		left: "0",
		right: "0",
		width: "80%",
		margin: "auto"
	}
});

function App() {
	const classes = useStyles();
	const state = useSelector(
		(state: AppStateType) => state.mainStore,
		shallowEqual
	);
	const dispatch = useDispatch();
	const loadingIcon = <Icon type="loading" style={{ fontSize: 60 }} spin />;

	useEffect(() => {
		dispatch(getAllNumbers());
	}, [dispatch]);

	let view: any;

	if (state.currentView === ViewEnum.NUMBER) {
		view = <NumberForm />;
	}

	if (state.currentView === ViewEnum.BASIC_INFO) {
		view = <BasicInfoForm />;
	}

	if (state.currentView === ViewEnum.SURVEY) {
		view = <SurveyForm />;
	}

	return (
		<div className={classes.app}>
			<Spin indicator={loadingIcon} spinning={state.loading}>
				{view}
			</Spin>
		</div>
	);
}

export default App;
