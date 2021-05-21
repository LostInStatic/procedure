import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { FormikContextType } from 'formik';
import React = require('react');
import { ClosedQuestion } from './questions';

interface Props {
	formik: FormikContextType<any>,
	question: ClosedQuestion
}

const RadioQuestion: React.FC<Props> = (props) => {

	return <label>
		{props.question.label}
		<RadioGroup row name={props.question.id} value={props.formik.values[props.question.id]} onChange={props.formik.handleChange}>
			{
				props.question.answers.map(
					answer => {
						return <FormControlLabel
							control={<Radio />}
							value={answer.id}
							key={answer.id}
							label={answer.label}
						/>;
					}
				)
			}
		</RadioGroup>
	</label>;
};

export default RadioQuestion;