import { RadioGroup, FormControlLabel, Radio, InputLabel } from '@material-ui/core';
import { FormikContextType } from 'formik';
import React = require('react');
import { ClosedQuestion } from './questions';

interface Props {
	formik: FormikContextType<any>,
	question: ClosedQuestion
}

const RadioQuestion: React.FC<Props> = (props) => {

	return <InputLabel id={props.question.id}>
		{props.question.label}
		<RadioGroup row name={props.question.id} value={props.formik.values[props.question.id]} onChange={props.formik.handleChange}>
			{
				props.question.answers.map(
					answer => {
						return <FormControlLabel
							control={<Radio/>}
							value={answer.id}
							key={answer.id}
							label={answer.label}
							labelPlacement="bottom"
						/>;
					}
				)
			}
		</RadioGroup>
	</InputLabel>;
};

export default RadioQuestion;