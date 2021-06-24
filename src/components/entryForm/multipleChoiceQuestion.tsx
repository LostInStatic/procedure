import { RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox, InputLabel } from '@material-ui/core';
import { FormikContextType } from 'formik';
import React = require('react');
import { ClosedQuestion } from './questions';

interface Props {
	formik: FormikContextType<any>,
	question: ClosedQuestion
}

const MultipleChoiceQuestion: React.FC<Props> = (props) => {

	return <InputLabel id={props.question.id}>
		{props.question.label}
		<FormGroup onChange={props.formik.handleChange}>
			{
				props.question.answers.map(
					answer => {
						return <FormControlLabel
							control={<Checkbox/>}
							name={props.question.id}
							value={answer.id}
							key={answer.id}
							label={answer.label}
						/>;
					}
				)
			}
		</FormGroup>
	</InputLabel>;
};

export default MultipleChoiceQuestion;