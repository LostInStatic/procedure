import React = require('react');
import Feedback from '../task/feedback';
import FixationPoint from '../task/fixPoint';
import Trial from '../task/trial';
import DumpData from '../data/dumpData';
import models from '../../data/models';
import TextDisplay from '../instructions/textDisplay';
import instructions from '../instructions/instructions';

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
	models.map(
		model => {
			feedbackLevels.map(
				level => {
					output = [...output, ...generateTrials(model, type === 'study' ? 4 : 2, type, level, callback)];
				}
			);
		}
	);
	return output;
};

const generateProcedure = (callback) => {
	return [
		() => <TextDisplay nextViewCallback={callback}>{instructions.beforeSession}</TextDisplay>,
		() => <TextDisplay nextViewCallback={callback}>{instructions.beforeTraining}</TextDisplay>,
		...generateSet('training', callback),
		() => <TextDisplay nextViewCallback={callback}>{instructions.beforeStudy}</TextDisplay>,
		...generateSet('study', callback),
		() => <DumpData/>
	];
};

export default generateProcedure;