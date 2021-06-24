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

const labelsHighLow = {
	min: 'Bardzo mało',
	max: 'Bardzo dużo'
};

const questions: Question[] = [
	{
		id: 'mental',
		label: 'Jak psychicznie obciążające było to zadanie?',
		axisLabels: labelsHighLow
	},
	{
		id: 'physical',
		label: 'Jak fizycznie wymagające było to zadanie?',
		axisLabels: labelsHighLow
	},
	{
		id: 'performance',
		label: 'Jak skuteczny/a byłaś w wypełnieniu zadania, o które byłeś/aś poproszony/a?',
		axisLabels: {
			min: 'Idealnie',
			max: 'Porażka'
		}
	},
	{
		id: 'effort',
		label: 'Jak ciężko musiałeś/aś pracować, by osiągnąć dany poziom wykonania zadania? ',
		axisLabels: labelsHighLow
	},
	{
		id: 'frustration',
		label: 'Jak niepewny/a, zniechęcony/a, zirytowany/a, zestresowany/a lub zdenerwowany/a byłeś/aś podczas zadania?',
		axisLabels: labelsHighLow
	}
];

