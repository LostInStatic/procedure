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
import Form from '../entryForm/form';
import TLXInput from '../TLXForm/input';
import TLXForm from '../TLXForm/form';
import BlindnessTest from '../blindnessTest/test';
import { shuffleArray } from './shuffleArray';


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
	trials = trials.flat();
	if (type === 'study') {
		trials = shuffleArray(trials);
	}
	return trials.flat(Infinity);
};

const generateTLX = (model: ModelName, callback) => {
	const forms = [];
	forms.push(() => <TextDisplay nextViewCallback={callback}><p>{instructions.beforeTLX}</p></TextDisplay>);
	feedbackLevels.map( level => {forms.push( () => <TLXForm model={model} feedbackLevel={level} formFinishedCallback={callback}/>);} );
	return forms;
};

const generateBlindnessTrials = (callback) => {
	const lightnessLevels = [0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80];
	return lightnessLevels.map(level => {
		// eslint-disable-next-line react/display-name
		return () => <BlindnessTest trialFinishedCallback={callback} targetLightness={level}/>;
	});
};

const generateProcedure = (callback) => {
	return [
		() => <TextDisplay nextViewCallback={callback}><p>{instructions.beforeForm}</p></TextDisplay>,
		() => <Form nextView={callback}/>,
		() => <DumpData/>,
		() => <TextDisplay nextViewCallback={callback}><p>{instructions.beforeBlindnessTest}</p></TextDisplay>,
		...shuffleArray(generateBlindnessTrials(callback)),
		() => <TextDisplay nextViewCallback={callback}><p>{instructions.beforeTask}</p></TextDisplay>,
		...flattenArray(shuffleArray([
			[
				() => <TextDisplay nextViewCallback={callback}>
					<p>{instructions.beforeRGB}</p>
					<p>{instructions.beforeTraining}</p>
				</TextDisplay>,
				...generateSet('training', models[0], callback),
				() => <TextDisplay nextViewCallback={callback}><p>{instructions.beforeStudy}</p></TextDisplay>,
				...generateSet('study', models[0], callback),
				...generateTLX('RGB', callback)
			],
			[
				() => <TextDisplay nextViewCallback={callback}>
					<p>{instructions.beforeHSL}</p>
					<p>{instructions.beforeTraining}</p>
				</TextDisplay>,
				...generateSet('training', models[1], callback),
				() => <TextDisplay nextViewCallback={callback}><p>{instructions.beforeStudy}</p></TextDisplay>,
				...generateSet('study', models[1], callback),
				...generateTLX('HSL', callback)
			],
		])),
		() => <DumpData />
	];
};

export default generateProcedure;

const flattenArray = (arr: any[]) => {
	return Array.prototype.concat.apply([], arr);
};