import { Slider } from '@material-ui/core';
import React = require('react');

interface IProps {
	label: string
	min: number
	max: number
	displayValue?: boolean;
	onChange: (e: React.ChangeEvent, value: number) => void
}

const Axis: React.FC<IProps> = (props) => {
	
	const defaultValue = Math.floor(props.max/2);
	React.useEffect (
		() => {
			props.onChange(null, defaultValue);
		},
		[]
	);

	return <div className="axis">
		<span className="axis-label">{props.label}</span>
		<Slider
			{...props}
			step={10}
			defaultValue={defaultValue}
			valueLabelDisplay={props.displayValue ? 'auto' : 'off'}
		/>
	</div>;
};

export default Axis;