import { Button } from '@material-ui/core';
import React = require('react');
import { FeedbackLevel, ModelName, TrialData } from '../../data/types';
import TrialPreview from './trialPrieview';

export default function Preview () {
	const [trials, setTrials] = React.useState([] as TrialData[]);
	return <> 
		{
			trials.length === 0 ? 
				<><input
					accept="*"
					style={{ display: 'none' }}
					id="raised-button-file"
					type="file"
					onChange={async (e) => {setTrials(getTrialsFromJson(await e.target.files[0].text()));}}
				/>
				<p>Kliknij przycisk poniżej i wybierz plik, który został ściągnięty na końcu badania. Przykładowa nazwa: 1638899328605.json (twój numer będzie się różnić)</p>
				<label htmlFor="raised-button-file">
					<Button variant="contained" component="span">
						Upload
					</Button>
				</label> 
				</>
				:
				<TrialPreview trialData={trials} />
		}
	</>;
}

function getTrialsFromJson (jsonString: string) {
	const trials =  JSON.parse(jsonString).trials as TrialData[];
	return trials.filter(trial => trial.trialType === 'study');
}