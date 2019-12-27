import React from "react";
import {
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Area,
	Tooltip
} from "recharts";

interface Props {
	title: string;
	width: number;
	height: number;
	syncId: string;
	xKey: string;
	yKey: string;
	strokeColor: string;
	fillColor: string;
	data: any[];
}

function Chart(props: Props) {
	return (
		<div>
			<h4>{props.title}</h4>
			<AreaChart
				width={props.width}
				height={props.height}
				data={props.data}
				syncId={props.syncId}
				margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey={props.xKey} />
				<YAxis />
				<Tooltip />
				<Area
					type="monotone"
					dataKey={props.yKey}
					stroke={props.strokeColor}
					fill={props.fillColor}
				/>
			</AreaChart>
		</div>
	);
}

export default Chart;
