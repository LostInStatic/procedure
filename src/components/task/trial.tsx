import { Button } from '@material-ui/core';
import React = require('react');
import { ArrayElement, TrialData } from '../../data/types';
import models from '../../data/models';
import Input from './input/input';
import Stimulus from './stimulus';

interface IProps {
	type: TrialData['trialType']
	feedbackLevel: TrialData['feedbackLevel']
	model: ArrayElement<typeof models>
	trialFinishedCallback: (data: TrialData) => void;
}

const Trial: React.FC<IProps> = (props) => {
	const [targetValues, setTargetValues] = React.useState(
		[]
	);
	const [currentValues, setCurrentValues] = React.useState(
		[]
	);

	React.useEffect(
		() => setTargetValues([...props.model.scales.map(
			element => randomInteger(0, element.max / 10) * 10
		)]),
		[]
	);

	const [data, recordData] = React.useReducer(
		dataReducer,
		{ started: Date.now() }
	);


	return <>
		<div className="stimuli-container">
			<Stimulus colorStyle={props.model.setColor(targetValues)} />
			{
				props.feedbackLevel === 'full' ?
					<Stimulus colorStyle={props.model.setColor(currentValues)} /> :
					null
			}
		</div>
		<Input
			model={props.model}
			displayValues={props.feedbackLevel === 'values' || props.feedbackLevel === 'full'}
			reportChange={values => setCurrentValues([...values])}
		/>
		<Button
			variant='contained'
			color='primary'
			className="submit"
			onClick={
				() => {
					recordData({
						ended: Date.now(),
						target: targetValues,
						answer: currentValues,
						model: props.model.name,
						trialType: props.type,
						feedbackLevel: props.feedbackLevel
					});
					props.trialFinishedCallback(data);
				}
			}
		>Zakończ</Button>
	</>;
};

export default Trial;



const dataReducer = (state, newData) => {
	return { ...state, ...newData };
};


function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}