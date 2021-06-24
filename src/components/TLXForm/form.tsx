import { Button } from '@material-ui/core';
import React = require('react');
import { useDataLogger } from '../data/dataLogger';
import TLXInput from './input';

interface Props {
	
}

const TLXForm: React.FC<Props> = (props) => {
	const logger = useDataLogger();

	const [values, updateValues] = React.useReducer(
		(state, change: { value: number, id: string})  => {
			state[change.id] = change.value;
			return {...state};
		},
		{}
	);


	return <>
		{questions.map(
			question => <TLXInput
				key={question.id}
				label={question.label}
				axisLabels={question.axisLabels}
				onChange={(e, value) => updateValues({value: value, id: question.id})}
			/>
		)}
		<Button
			variant='contained'
			color='primary'
			className="next-button"
			onClick={
				() => {
					console.log(values);
				}
			}
		>Zakończ</Button>
	</>;
};

export default TLXForm;

interface Question {
	id: string
	label: string,
	axisLabels: {
		min: string,
		max: string
	}
}
const questions: Question[] = [
	{
		id: 'Test',
		label: 'Test question?',
		axisLabels: {
			min: 'min',
			max: 'max'
		}
	},
	{
		id: '2',
		label: 'Two?',
		axisLabels: {
			min: 'XD',
			max: 'DX'
		}
	}

];