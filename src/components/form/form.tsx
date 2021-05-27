import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { Field, Formik, FormikContextType, FormikValues, useFormik } from 'formik';
import React = require('react');
import { useDataLogger } from '../data/dataLogger';
import RadioQuestion from './radioQuestion';
import NumericQuestion from './numericQuestion';
import { ClosedQuestion, FormItem, OpenQuestion, questionnaire } from './questions';
import SelectQuestion from './selectQuestion';
import MultipleChoiceQuestion from './multipleChoiceQuestion';
import Divider from './divider';

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
	const output = {
		id: Date.now()
	};
	questionnaire.filter(
		(item): item is OpenQuestion | ClosedQuestion => item.type !== 'divider'
	).map(
		question => {
			output[question.id] = question.placeholderValue ||
				question.type === 'number' ? 0 : '';
		}
	);
	return output;
};

const generateQuestions = (formik: FormikContextType<any>) => {
	return questionnaire.map(question => generateQuestion(question, formik));
};

const generateQuestion = (item: FormItem, formik: FormikContextType<any>): JSX.Element => {
	switch (item.type) {
		case 'number':
			return <NumericQuestion formik={formik} question={item} key={item.id} />;
		case 'select':
			return <SelectQuestion formik={formik} question={item} key={item.id} />;
		case 'radio':
			return <RadioQuestion formik={formik} question={item} key={item.id} />;
		case 'multiple':
			return <MultipleChoiceQuestion formik={formik} question={item} key={item.id} />;
		case 'divider':
			return <Divider title={item.title} description={item.description} />;
		default:
			break;
	}
};
