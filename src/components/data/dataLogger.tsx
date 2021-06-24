import React = require('react');
import { TrialData } from '../../data/types';

type Trials = TrialData[]

interface ContextValue {
	session: any
	trials: Trials,
	TLXResults: any,
	pushTrial: (state: Trials) => void
	pushTLX: (state: any) => void
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
	const [trials, addTrial] = React.useReducer(
		addRecord,
		[]);
	const [TLXresults, addTLX] = React.useReducer(
		addRecord,
		[]);
	const [session, updateSessionData] = React.useState(null);

	return (
		<Context.Provider value={{
			session: session,
			trials: trials,
			TLXResults: TLXresults,
			pushTrial: addTrial,
			pushTLX: addTLX,
			recordSessionData: updateSessionData
		}}>
			{props.children}
		</Context.Provider>
	);
};

export default DataLogger;

const addRecord = (state, value) => [...state, ...value];