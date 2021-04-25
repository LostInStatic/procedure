import React = require('react');
import Axis from './axis';
import models from '../../../data/models';
import { ArrayElement } from '../../../data/ArrayElement';

interface IProps {
	reportChange: (values: number[]) => void
	displayValues?: boolean
	model: ArrayElement<typeof models>;
}

const Input: React.FC<IProps> = (props) => {

	const [values, updateValues] = React.useReducer(
		(state, change: { value: number, index: number})  => {
			state[change.index] = change.value;
			return [...state];
		},
		[0, 0, 0]
	);

	React.useEffect(
		() => {props.reportChange(values);},
		[values]
	);

	const generateAxis = (axisData: ArrayElement<typeof props.model.scales>, index:number) => {
		return <Axis
			onChange={(e, value) => {updateValues({value, index});}}
			key={axisData.label}
			label={`${axisData.label}: `}
			min={0}
			max={axisData.max}
			displayValue={props.displayValues}
		/>;
	};

	return <div className="input container">
		{props.model.scales.map(generateAxis)}
	</div>;
};

export default Input;


