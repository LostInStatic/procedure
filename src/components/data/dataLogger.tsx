import React = require('react');
import { TrialData } from '../../data/types';

type Trials = TrialData[]

interface ContextValue {
	session: any
	trials: Trials,
	pushTrial: (state: Trials) => void
	recordSessionData: (state: any) => void
}

interface IProps {
	
}

const Context = React.createContext<ContextValue>(null);

export const useDataLogger = (): ContextValue => {
	const contextState = React.useContext(Context);
	if (contextState === null) {
		throw new Error('useData must be used within a DataLogger component');
	}
	return contextState;
};

export const DataLogger: React.FC = (props) => {
	const [trials, updateTrials] = React.useReducer(
		mergeTrials,
		[]);
	const [session, updateSessionData] = React.useState(null);

	return (
		<Context.Provider value={{ session: session, trials: trials, pushTrial: updateTrials, recordSessionData: updateSessionData}}>
			{props.children}
		</Context.Provider>
	);
};

export default DataLogger;

const mergeTrials = (state: Trials, value: Trials) => [...state, ...value];