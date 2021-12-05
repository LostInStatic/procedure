import { Button } from '@material-ui/core';
import React = require('react');
import { TrialData } from '../../data/types';
import Feedback from '../task/feedback';


const TrialPreview: React.FC<{trialData: TrialData[]}> = ({trialData}) => {
	const [currentIndex, setCurrentIndex] = React.useState(0);
	return <>
		<Feedback finishedCallback={() => {setCurrentIndex(currentIndex + 1);}} trial={trialData[currentIndex]} />
	</>;
};

export default TrialPreview;