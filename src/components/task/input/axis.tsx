import { makeStyles, Slider } from '@material-ui/core';
import React = require('react');
import models from '../../../data/models';

interface IProps {
	label: string
	min: number
	max: number
	displayValue?: boolean;
	gradientCSS?: string;
	onChange: (e: React.ChangeEvent, value: number) => void
}

const Axis: React.FC<IProps> = (props) => {

	const defaultValue = Math.floor(props.max / 2);
	React.useEffect(
		() => {
			props.onChange(null, defaultValue);
		},
		[]
	);

	const useStyles = makeStyles(
		{
			rail: {
				backgroundImage: props.gradientCSS,
				height: '6px',
				marginTop: '-2px',
				opacity: 1
			},
			track: {
				background: 'transparent'
			}
		}
	);

	return <div className="axis">
		<span className="axis-label">{props.label}</span>
		<Slider
			{...props}
			classes={props.gradientCSS ? useStyles(props) : undefined}
			step={10}
			defaultValue={defaultValue}
			valueLabelDisplay={props.displayValue ? 'auto' : 'off'}
		/>
	</div>;
};

export default Axis;