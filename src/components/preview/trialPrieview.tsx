import { Button } from '@material-ui/core';
import React = require('react');
import { TrialData } from '../../data/types';
import Feedback from '../task/feedback';

const feedbackLevelMessages = {
	full: 'pełna informacja zwrotna (najniższy, dwa koła)',
	gradients: 'gradienty na skalach',
	values: 'tylko wartości liczbowe (najtrudniejszy)'
};


const TrialPreview: React.FC<{trialData: TrialData[]}> = ({trialData}) => {
	const [currentIndex, setCurrentIndex] = React.useState(0);
	return <>
		<p>Poziom trudności: {feedbackLevelMessages[trialData[currentIndex].feedbackLevel]}</p>
		<Feedback finishedCallback={() => {setCurrentIndex(currentIndex + 1);}} trial={trialData[currentIndex]} />
	</>;
};

export default TrialPreview;