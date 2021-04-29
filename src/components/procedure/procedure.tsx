import React = require('react');
import Feedback from '../task/feedback';
import FixationPoint from '../task/fixPoint';
import Trial from '../task/trial';
import DumpData from '../data/dumpData';
import models from '../../data/models';

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
			() => <FixationPoint nextViewCallback={callback}/>
		);
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
		...generateSet('study', callback),
		() => <DumpData/>
	];
};

export default generateProcedure;