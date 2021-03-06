import React = require('react');
import Axis from './axis';
import models from '../../../data/models';
import { ArrayElement } from '../../../data/types';

interface IProps {
	reportChange: (values: number[]) => void
	reportChangeComitted: () => void
	displayValues?: boolean
	displayGradients?: boolean
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

	const generateAxis = (axisData: ArrayElement<typeof props.model.axes>, index:number) => {
		return <Axis
			onChange={(e, value) => {updateValues({value, index});}}
			onChangeCommitted={props.reportChangeComitted}
			key={axisData.label}
			label={`${axisData.label}: `}
			min={0}
			max={axisData.max}
			displayValue={props.displayValues}
			gradientCSS={props.displayGradients ? axisData.gradientCSS : undefined}
		/>;
	};

	return <div className="input-container">
		{props.model.axes.map(generateAxis)}
	</div>;
};

export default Input;


