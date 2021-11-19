import { Grid, Slider } from '@material-ui/core';
import React = require('react');

interface Props {
	label: string,
	axisLabels: {
		min: string,
		max: string,
	},
	onChange: (e: React.ChangeEvent, value: number) => void
}

const TLXInput: React.FC<Props> = (props) => {

	const defaultValue = 4;
	React.useEffect(
		() => {
			props.onChange(null, defaultValue);
		},
		[]
	);

	return <div className="tlx-input">
		<span className="input-label">{props.label}</span>
		<Grid container spacing={2}>
			<Grid item>
				{props.axisLabels.min}
			</Grid>
			<Grid item>
				<Slider
					style={{width: '400px'}}
					min={1}
					max={7}
					step={1}
					marks={true}
					defaultValue={defaultValue}
					onChange={props.onChange}
				/>
			</Grid>
			<Grid item>
				{props.axisLabels.max}
			</Grid>

		</Grid>
	</div>;
};

export default TLXInput;