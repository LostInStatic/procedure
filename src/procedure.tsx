import React = require('react');
import Feedback from './components/task/feedback';
import Trial from './components/task/trial';
import models from './data/models';

const feedbackLevels = [
	'full',
	'values',
	'minimal'
];

const trialTypes = [
	'study',
	'training'
];


const generateTrials = (model, repeats: number, type: 'study' | 'training', feedbackLevel, callback):React.FC[] => {
	const output = [];
	for (let index = 0; index < repeats; index++) {
		output.push(
			() => {
				return <Trial
					model={model}
					type={type}
					feedbackLevel={feedbackLevel}
					trialFinishedCallback={callback}
				/>;
			}
		);
		if (type === 'training') {
			output.push (
				() => {
					return <Feedback finishedCallback={callback}/>;
				}
			);
		}
	}
	return output;
};

const generateSet = (type, callback):React.FC[] => {
	let output = [];
	models.forEach(
		model => {
			feedbackLevels.forEach(
				level => {
					output = [...output, ...generateTrials(model, 1, type, level, callback)];
				}
			);
		}
	);
	return output;
};

const generateProcedure = (callback) => {
	return [
		() => <p onClick={callback}>początek treningu</p>,
		...generateSet('training', callback),
		() => <p onClick={callback}>koniec treningu</p>,
		...generateSet('study', callback)
	];
};

export default generateProcedure;