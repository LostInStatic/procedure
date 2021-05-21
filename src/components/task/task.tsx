import { Button } from '@material-ui/core';
import React = require('react');
import { ArrayElement, Model, TrialData } from '../../data/types';
import models from '../../data/models';
import Input from './input/input';
import Stimulus from './stimulus';
import { useDataLogger } from '../data/dataLogger';

interface Props {
	type: TrialData['trialType']
	feedbackLevel: TrialData['feedbackLevel']
	model: ArrayElement<typeof models>
	trialFinishedCallback: () => void;
}

const Trial: React.FC<Props> = (props) => {
	const logger = useDataLogger();

	const [targetValues, setTargetValues] = React.useState(
		[]
	);
	const [currentValues, setCurrentValues] = React.useState(
		[]
	);

	React.useEffect(
		() => setTargetValues(
			createTargetValues(props.model)
		),
		[]
	);

	const data = React.useMemo(() => {
		return {
			started: Date.now(),
			model: props.model.name,
			trialType: props.type,
			feedbackLevel: props.feedbackLevel
		};
	}, []
	);


	return <>
		<p className="reminder">Przesuń suwaki tak, aby wartości odpowiadały wyświetlanemu kolorowi.</p>
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
			className="next-button"
			onClick={
				() => {
					logger.pushTrial(
						[{
							...data,
							ended: Date.now(),
							target: targetValues,
							answer: currentValues,
						}]
					);
					props.trialFinishedCallback();
				}
			}
		>Zakończ</Button>
	</>;
};

export default Trial;


function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createTargetValues = (model: Model) => {
	return [...model.axes.map(
		element => randomInteger(1, element.max / 10 - 1) * 10
	)
	];
};