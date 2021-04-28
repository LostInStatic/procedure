import './style.scss';

import ReactDOM = require('react-dom');
import React = require('react');
import models from './data/models';
import Trial from './components/task/trial';
import ProcedureManager from './components/procedureManager';
import DataLogger from './data/dataLogger';

ReactDOM.render(
	<DataLogger>
		<ProcedureManager />
	</DataLogger>
	,
	document.getElementById('root')
);