import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { Field, Formik, FormikContextType, FormikValues, useFormik } from 'formik';
import React = require('react');
import { useDataLogger } from '../data/dataLogger';
import RadioQuestion from './radioQuestion';
import NumericQuestion from './numericQuestion';
import { Question, questionnaire } from './questions';
import SelectQuestion from './selectQuestion';
import MultipleChoiceQuestion from './multipleChoiceQuestion';

interface Props {
	nextView: () => void;
}

const EntryForm: React.FC<Props> = (props) => {

	const dataLogger = useDataLogger();

	const formik = useFormik({
		initialValues: getInitialValues(),
		onSubmit: (values) => {
			dataLogger.recordSessionData(values);
			props.nextView();
		},
	});

	return <div>
		<form onSubmit={formik.handleSubmit} className="entry-form">
			{generateQuestions(formik)}

			<Button color="primary" variant="contained" fullWidth type="submit">
				Dalej
			</Button>
		</form>
	</div>;
};

export default EntryForm;

const getInitialValues = () => {
	const output = {};
	questionnaire.map(
		question => {
			output[question.id] = question.placeholderValue || null;
		}
	);
	return output;
};

const generateQuestions = (formik: FormikContextType<any>) => {
	return questionnaire.map(question => generateQuestion(question, formik));
};

const generateQuestion = (question: Question, formik: FormikContextType<any>): JSX.Element => {
	switch (question.type) {
		case 'number':
			return <NumericQuestion formik={formik} question={question} key={question.id} />;
		case 'select':
			return <SelectQuestion formik={formik} question={question} key={question.id} />;
		case 'radio':
			return <RadioQuestion formik={formik} question={question} key={question.id} />;
		case 'multiple':
			return <MultipleChoiceQuestion formik={formik} question={question} key={question.id} />;
		default:
			break;
	}
};
