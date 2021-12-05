import './style.scss';

import ReactDOM = require('react-dom');
import React = require('react');
import { StylesProvider } from '@material-ui/styles';
import Preview from './components/preview/preview';


ReactDOM.render(
	<StylesProvider injectFirst>
		<Preview />
	</StylesProvider>
	,
	document.getElementById('root')
);