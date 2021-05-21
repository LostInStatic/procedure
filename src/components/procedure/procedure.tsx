import React = require('react');
import Feedback from '../task/feedback';
import FixationPoint from '../task/fixPoint';
import Trial from '../task/task';
import DumpData from '../data/dumpData';
import models from '../../data/models';
import TextDisplay from '../instructions/textDisplay';
import instructions from '../instructions/instructions';
import { FeedbackLevel, Model, ModelName, TrialType } from '../../data/types';
import feedbackLevels from '../../data/feedbackLevels';
import Form from '../form/form';


const CONFIG = {
	trainingRepeats: 2,
	studyRepeats: 4
};

const generateTrials = (model: Model, repeats: number, type: TrialType, feedbackLevel: FeedbackLevel, callback): React.FC[] => {
	let output = [];
	for (let index = 0; index < repeats; index++) {
		const trial = [];
		trial.push(
			() => <FixationPoint nextViewCallback={callback} />
		);
		trial.push(
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
			trial.push(
				() => {
					return <Feedback finishedCallback={callback} />;
				}
			);
		}
		output.push(trial);
	}
	if (type === 'study') {
		output = shuffleArray(output);
	}
	return output;
};

const generateSet = (type: TrialType, model: Model, callback): React.FC[] => {
	let trials = [];

	feedbackLevels.map(
		level => {
			trials.push(
				generateTrials(
					model,
					type === 'study' ? CONFIG.studyRepeats : CONFIG.trainingRepeats,
					type,
					level,
					callback
				)
			);
		}
	);
	console.log(trials);
	trials = trials.flat();
	console.log(trials);
	if (type === 'study') {
		trials = shuffleArray(trials);
	}
	return trials.flat(Infinity);
};

const generateProcedure = (callback) => {
	return [
		() => <TextDisplay nextViewCallback={callback}><p>{instructions.beforeForm}</p></TextDisplay>,
		() => <Form nextView={callback}/>,
		() => <TextDisplay nextViewCallback={callback}><p>{instructions.beforeTask}</p></TextDisplay>,
		...flattenArray(shuffleArray([
			[
				() => <TextDisplay nextViewCallback={callback}>
					<p>{instructions.beforeRGB}</p>
					<p>{instructions.beforeTraining}</p>
				</TextDisplay>,
				...generateSet('training', models[0], callback),
				() => <TextDisplay nextViewCallback={callback}><p>{instructions.beforeStudy}</p></TextDisplay>,
				...generateSet('study', models[0], callback)
			],
			[
				() => <TextDisplay nextViewCallback={callback}>
					<p>{instructions.beforeHSL}</p>
					<p>{instructions.beforeTraining}</p>
				</TextDisplay>,
				...generateSet('training', models[1], callback),
				() => <TextDisplay nextViewCallback={callback}><p>{instructions.beforeStudy}</p></TextDisplay>,
				...generateSet('study', models[1], callback)
			],
		])),
		() => <DumpData />
	];
};

export default generateProcedure;

const shuffleArray = (arr: any[]) => {
	const array = [...arr];
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
};

const flattenArray = (arr: any[]) => {
	return Array.prototype.concat.apply([], arr);
};