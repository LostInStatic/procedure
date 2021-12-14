import React = require('react');
import models from '../../data/models';
import { useDataLogger } from '../data/dataLogger';
import Stimulus from '../task/stimulus';
import Color from 'colorjs.io';
import { randomInteger } from '../../data/randomInteger';
import { shuffleArray } from '../procedure/shuffleArray';
import { ProgressPlugin } from 'webpack';
import { BlindnessTestTrialData } from '../../data/types';

interface Props {
	trialFinishedCallback: () => void;
	targetLightness: number;
}

const BlindnessTest: React.FC<Props> = (props) => {

	const colors = generateColors(props.targetLightness);

	const logger = useDataLogger();

	const started = React.useMemo(() => Date.now(), []);

	const submit = ( partialResult: Pick<BlindnessTestTrialData, 'answer' | 'correct'> ) => {
		const result: BlindnessTestTrialData = {
			started: started,
			ended: Date.now(),
			target: colors.target.srgb.map(val => Math.floor(val*255)),
			...partialResult
		};
		logger.pushBlindnessTrial([result]);
		props.trialFinishedCallback();
	};

	return <>
		<p className="reminder">Kliknij w kółko, którego kolor jest identyczny z dużym kołem.</p>
		<div className="stimuli-container">
			<Stimulus colorStyle={{ backgroundColor: colors.target }} />
		</div>
		<div className="input">
			{generateInputs(colors, submit)}

		</div>
	</>;
};

export default BlindnessTest;


const generateInputs = (colors, submit: (result: Pick<BlindnessTestTrialData, 'answer' | 'correct'>) => void) => {
	const arr = colors.inputs.map(
		(color, index) => {
			return <button key={index} onClick={e => submit({answer: color.srgb.map(val => Math.floor(val*255)), correct: false})}>
				<Stimulus colorStyle={{ backgroundColor: color }} />
			</button>;
		}
	);
	arr.push(
		<button key={9} onClick={e => submit({answer: colors.target.srgb.map(val => Math.floor(val*255)), correct: true})}>
			<Stimulus colorStyle={{ backgroundColor: colors.target.toString() }} />
		</button>
	);
	return shuffleArray(arr);
};


const generateColors = (trgtLightness: number) => {
	const target = new Color('srgb', [trgtLightness, trgtLightness, 0]);
	const inputColors = [];
	const [offsetModifiersR, offsetModifiersG] = [
		shuffleArray([2, 4, 6, 8, 10, 12, 14, 16]),
		shuffleArray([1, 3, 5, 7, 9, 11, 13, 15])
	];
	for (let index = 0; index < 8; index++) {
		const [offsetR, offsetG] = [-offsetModifiersR[index]/100, -offsetModifiersG[index]/100];
		const color = new Color(target.toString());
		color.srgb.red += offsetR;
		color.srgb.green += offsetG;
		inputColors.push(
			color
		);
	}
	return { inputs: inputColors, target: target };
};