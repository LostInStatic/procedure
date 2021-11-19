import { Button } from '@material-ui/core';
import React = require('react');
import { useDataLogger } from '../data/dataLogger';
import models from '../../data/models';
import { Model, TrialData } from '../../data/types';
import Stimulus from './stimulus';

interface Props {
	finishedCallback: () => void
}

const Feedback: React.FC<Props> = (props) => {
	const [result] = useDataLogger().trials.slice(-1);
	const model = models.find(model => model.name === result.model);

	return <>
		<div className="stimuli-container">
			<Stimulus colorStyle={model.setColor(result.target)} />
			<Stimulus colorStyle={model.setColor(result.answer)} />
		</div>
		<div className="feedback">
			{generateFeedbackTable(model, result.target, result.answer)}
		</div>
		<Button
			variant='contained'
			color='primary'
			className="next-button"
			onClick={
				() => props.finishedCallback()
			}
		>Zakończ</Button>
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