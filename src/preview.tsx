import './style.scss';

import ReactDOM = require('react-dom');
import React = require('react');
import { StylesProvider } from '@material-ui/styles';


document.documentElement.addEventListener('click', () => {
	if (!document.fullscreenElement) document.documentElement.requestFullscreen();
});




ReactDOM.render(
	<StylesProvider injectFirst>
			Hello preview!
	</StylesProvider>
	,
	document.getElementById('root')
);