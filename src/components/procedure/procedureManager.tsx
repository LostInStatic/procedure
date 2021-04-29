import React = require('react');
import models from '../../data/models';
import generateProcedure from './procedure';
import Trial from '../task/trial';

interface IProps {

}




const ProcedureManager: React.FC<IProps> = (props) => {

	const [currentViewIndex, nextView] = React.useReducer(
		state => state + 1, 0
	);

	const procedure = React.useMemo(() => generateProcedure(nextView), []);

	const View = procedure[currentViewIndex];

	return <View/>;
};

export default ProcedureManager;




