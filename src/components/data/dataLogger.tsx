import React = require('react');
import { TrialData } from '../../data/types';

type Trials = TrialData[]

interface ContextValue {
	session: any,
	blindnessTestResults: any,
	trials: Trials,
	TLXResults: any,
	syncData: number[]
	pushBlindnessTrial: (state: any) => void,
	pushTrial: (state: Trials) => void,
	pushTLX: (state: any) => void,
	recordSessionData: (state: any) => void,
	recordSyncClick: (record:number[]) => void,
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
	const [blindnessTestResults, addBlindnessTrial] = React.useReducer(
		addRecord,
		[]);
	const [trials, addTrial] = React.useReducer(
		addRecord,
		[]);
	const [TLXresults, addTLX] = React.useReducer(
		addRecord,
		[]);
	const [session, updateSessionData] = React.useState(null);

	const [syncData, addSyncClick] = React.useReducer(addRecord, []);

	return (
		<Context.Provider value={{
			session: session,
			blindnessTestResults: blindnessTestResults,
			trials: trials,
			TLXResults: TLXresults,
			syncData: syncData,
			pushBlindnessTrial: addBlindnessTrial,
			pushTrial: addTrial,
			pushTLX: addTLX,
			recordSessionData: updateSessionData,
			recordSyncClick: addSyncClick
			
		}}>
			{props.children}
		</Context.Provider>
	);
};

export default DataLogger;

const addRecord = (state, value) => [...state, ...value];