import { Button } from '@material-ui/core';
import React = require('react');
import { ArrayElement, Model, TrialData } from '../../data/types';
import models from '../../data/models';
import Input from './input/input';
import Stimulus from './stimulus';
import { useDataLogger } from '../data/dataLogger';
import { randomInteger } from '../../data/randomInteger';

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

	const [events, logEvent] = React.useReducer((state: TrialData['events'], event: Event) => [...state, {type: event.type, time: Date.now()}], []);
	const [midpoints, logMidpoint] = React.useReducer((state: TrialData['midpoints'], values: number[]) => [...state, {values, time: Date.now()}], []);

	React.useEffect(
		() => {
			setTargetValues(
				createTargetValues(props.model)
			);

			function handleEvent(e){logEvent(e);}
			document.addEventListener('blur', handleEvent);
			document.addEventListener('focus', handleEvent);
			document.addEventListener('mouseleave', handleEvent);
			document.addEventListener('mouseenter', handleEvent);
			return () => {
				document.removeEventListener('blur', handleEvent);
				document.removeEventListener('focusin', handleEvent);
				document.removeEventListener('mouseleave', handleEvent);
				document.removeEventListener('mouseenter', handleEvent);
			};
		},
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
			displayValues={props.feedbackLevel !== 'minimal'} 
			displayGradients={props.feedbackLevel === 'gradients'}
			reportChange={values => setCurrentValues([...values])}
			reportChangeComitted={() => logMidpoint(currentValues)}
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
							events: events,
							midpoints: midpoints
						}]
					);
					props.trialFinishedCallback();
				}
			}
		>Zakończ</Button>
	</>;
};

export default Trial;


const createTargetValues = (model: Model) => {
	return [...model.axes.map(
		element => randomInteger(1, element.max / 10 - 1) * 10
	)
	];
};