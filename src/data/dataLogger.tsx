import React = require('react');
import { SessionData, TrialData } from './types';

type State = TrialData[]

interface ContextValue {
	state: State,
	pushData: (state: State) => void
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
	const [state, updateState] = React.useReducer(
		updateData,
		[]);

	return (
		<Context.Provider value={{ state, pushData: updateState}}>
			{props.children}
		</Context.Provider>
	);
};

export default DataLogger;

const updateData = (state: State, value: State) => [...state, ...value];