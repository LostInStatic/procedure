import './style.scss';

import ReactDOM = require('react-dom');
import React = require('react');
import ProcedureManager from './components/procedure/procedureManager';
import DataLogger from './components/data/dataLogger';

ReactDOM.render(
	<DataLogger>
		<ProcedureManager />
	</DataLogger>
	,
	document.getElementById('root')
);