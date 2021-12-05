import { Button } from '@material-ui/core';
import React = require('react');
import { useDataLogger } from '../data/dataLogger';
import models from '../../data/models';
import { Model, TrialData } from '../../data/types';
import Stimulus from './stimulus';
import colorDifference from '../../data/deltaE';
import Color from 'colorjs.io';

interface Props {
	finishedCallback: () => void
	trial? :TrialData
}

const Feedback: React.FC<Props> = (props) => {
	const [result] = props.trial ? [props.trial] : useDataLogger().trials.slice(-1);
	const model = models.find(model => model.name === result.model);
	const difference = colorDifference(
		new Color(model.setColor(result.target).backgroundColor), 
		new Color(model.setColor(result.answer).backgroundColor)
	);

	return <>
		<div className="stimuli-container">
			<Stimulus colorStyle={model.setColor(result.target)} />
			<Stimulus colorStyle={model.setColor(result.answer)} />
		</div>
		<div className="feedback">
			<div className="feedback-message">{difference.description}</div>
			{/* <div className="deltaE">Różnica między kolorami: {Math.floor(difference.deltaE)}</div> */}
			{generateFeedbackTable(model, result.target, result.answer)}
		</div>
		<Button
			variant='contained'
			color='primary'
			className="next-button"
			onClick={
				() => props.finishedCallback()
			}
		>Dalej</Button>
	</>;
};

export default Feedback;

const generateFeedbackTable = (model: Model, target: number[], answer: number[]) => {
	return <table>
		<tbody>
			<tr>
				<th></th>
				<th>Cel</th>
				<th>Odpowiedź</th>
			</tr>
			{model.axes.map(
				(axis, index) => {
					return <tr key={axis.label}>
						<td>{`${axis.label}:`}</td>
						<td>{target[index]}</td>
						<td>{answer[index]}</td>
					</tr>;
				}
			)}
		</tbody>
	</table>;
};