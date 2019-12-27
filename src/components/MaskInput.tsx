import { Input } from "antd";
import React from "react";
import ReactInputMask from "react-input-mask";

interface Props {
	mask: string;
	value?: string | number | any;
	size?: "small" | "default" | "large";
	onChangeHandle?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onEnterPress?: () => void;
	name?: string;
}

function MaskInput(props: Props) {
	return (
		<ReactInputMask
			mask={props.mask}
			maskChar={null}
			value={props.value}
			onChange={props.onChangeHandle}
		>
			{() => (
				<Input
					size={props.size}
					name={props.name}
					onPressEnter={props.onEnterPress}
				/>
			)}
		</ReactInputMask>
	);
}

export default MaskInput;
