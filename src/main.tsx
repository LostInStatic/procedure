import './style.scss';

import ReactDOM = require('react-dom');
import React = require('react');
import ProcedureManager from './components/procedure/procedureManager';
import DataLogger from './components/data/dataLogger';
import { StylesProvider } from '@material-ui/styles';

ReactDOM.render(
	<DataLogger>
		<StylesProvider injectFirst>
			<ProcedureManager />
		</StylesProvider>
	</DataLogger>
	,
	document.getElementById('root')
);