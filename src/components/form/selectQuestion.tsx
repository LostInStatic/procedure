import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { FormikContextType } from 'formik';
import React = require('react');
import { ClosedQuestion } from './questions';

interface Props {
	formik: FormikContextType<any>,
	question: ClosedQuestion
}

const SelectQuestion: React.FC<Props> = (props) => {

	return <InputLabel id={props.question.id}>
		{props.question.label}
		<Select
			fullWidth
			labelId={props.question.id}
			name={props.question.id}
			value={props.formik.values[props.question.id]}
			onChange={props.formik.handleChange}
		>
			{
				props.question.answers.map(
					answer => {
						return <MenuItem value={answer.id} key={answer.id}>{answer.label}</MenuItem>;
					}
				)
			}
		</Select>
	</InputLabel>;
};

export default SelectQuestion;