import { InputLabel, TextField } from '@material-ui/core';
import { FormikContextType } from 'formik';
import React = require('react');
import { ProvidePlugin } from 'webpack';
import { OpenQuestion } from './questions';

interface Props {
	formik: FormikContextType<any>,
	question: OpenQuestion
}

const NumericQuestion: React.FC<Props> = (props) => {
	return <InputLabel id={props.question.id}>
		{props.question.label}
		<TextField
			fullWidth
			id={props.question.id}
			name={props.question.id}
			type="number"
			value={props.formik.values[props.question.id]}
			onChange={props.formik.handleChange}
		/>
	</InputLabel>;
};

export default NumericQuestion;