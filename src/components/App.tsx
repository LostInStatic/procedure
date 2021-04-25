//@ts-nocheck
import { Button } from '@material-ui/core';
import React = require('react');
import RGBInput from './task/input/rgb';
import Stimulus from './task/stimulus';

interface IProps {

}



const App: React.FC<IProps> = (props) => {

	const [view, selectView] = React.useState('trialRGBFB' as TSelection);
	const [targetValues, setTargetValues] = React.useState({ R: 0, B: 0, G: 0 });
	const [values, setValues] = React.useState({ R: 0, B: 0, G: 0 });

	React.useEffect(
		() => {
			const state = { R: 0, G: 0, B: 0 };
			Object.keys(state).map(key => state[key] = randomInteger(0, 255));
			setTargetValues(state);
		},
		[view]

	);

	const getView = () => {
		switch (view) {
			case 'trialRGBNoFB':
				return <>
					<div className="stimuli-container">
						<Stimulus color={targetValues} />
					</div>
					<RGBInput reportChange={values => setValues(values)} />
					<Button variant='contained' color='primary' className="submit">Zakończ</Button>
				</>;
			case 'trialRGBFB':
				return <>
					<div className="stimuli-container">
						<Stimulus color={targetValues} />
						<Stimulus color={values} />
					</div>
					<RGBInput displayValues reportChange={values => setValues(values)} />
					<Button variant='contained' color='primary' className="submit">Zakończ</Button>
				</>;
			case 'trialRGBPartialFB':
				return <>
					<div className="stimuli-container">
						<Stimulus color={targetValues} />
					</div>
					<RGBInput displayValues reportChange={setValues} />
					<Button variant='contained' color='primary' className="submit">Zakończ</Button>
				</>;
			case 'trainingFB':
				return <>
					<div className="stimuli-container">
						<Stimulus color={{R:48, G:60, B:150}} />
						<Stimulus color={{R:60, G:90, B:110}} />
					</div>
					<p>CEL R: 48 G:60 B:150 <br/>
					Twoja odpowiedź: R: 60 G:90 B:110</p>
					<Button variant='contained' color='primary' className="submit">Dalej</Button>
				</>;
			default:
				break;
		}
	};

	return <>
		<select
			name="slide-choice"
			id="slide-choice"
			className="slide-choice"
			value={view}
			onChange={e => selectView(e.target.value as any)}
		>
			<option value="trialRGBNoFB">Task - no feedback</option>
			<option value="trialRGBFB">Task - full feedback</option>
			<option value="trialRGBPartialFB">Task - num. values</option>
			<option value="trainingFB">training feedback</option>

		</select>
		<div className="window">
			{getView()}
		</div>

	</>;
};

export default App;

type TSelection = 'trialRGBNoFB' | 'trialRGBFB' | 'trialRGBPartialFB' | 'trainingFB';



function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}