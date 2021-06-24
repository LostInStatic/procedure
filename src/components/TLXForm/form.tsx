import { Button } from '@material-ui/core';
import React = require('react');
import { FeedbackLevel, ModelName } from '../../data/types';
import { useDataLogger } from '../data/dataLogger';
import TLXInput from './input';

interface Props {
	model: ModelName,
	feedbackLevel: FeedbackLevel,
	formFinishedCallback: () => void;
}

const TLXForm: React.FC<Props> = (props) => {
	const logger = useDataLogger();

	const [values, updateValues] = React.useReducer(
		(state, change: { value: number, id: string }) => {
			state[change.id] = change.value;
			return { ...state };
		},
		{}
	);


	return <form>

		<p>Wypełnij formularz, biorąc pod uwagę TYLKO typ zadania, w którym wyświetlane były {feedbackLevelsTextMap.find((el) => props.feedbackLevel === el.level).text}</p>
		
		<div className="tlx-questions">
			{questions.map(
				question => <TLXInput
					key={question.id}
					label={question.label}
					axisLabels={question.axisLabels}
					onChange={(e, value) => updateValues({ value: value, id: question.id })}
				/>
			)}
		</div>

		<Button
			variant='contained'
			color='primary'
			className="next-button"
			onClick={
				() => {
					logger.pushTLX(
						[{
							model: props.model,
							feedbackLevel: props.feedbackLevel,
							...values
						}]
					);
					props.formFinishedCallback();
				}
			}
		>Dalej</Button>
	</form>;
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

const feedbackLevelsTextMap:{level:FeedbackLevel, text: string}[] = [
	{level: 'full', text: 'dwa kolorowe koła, trzeba było dopasować prawe do lewego.'},
	{level: 'gradients', text: 'kolorowe suwaki z gradientem oraz pojedyncze koło'},
	{level: 'values', text: 'niebieskie suwaki oraz pojedyncze koło'}
];

