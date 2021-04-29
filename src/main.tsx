import './style.scss';

import ReactDOM = require('react-dom');
import React = require('react');
import ProcedureManager from './components/procedureManager';
import DataLogger from './components/dataLogger';

ReactDOM.render(
	<DataLogger>
		<ProcedureManager />
	</DataLogger>
	,
	document.getElementById('root')
);