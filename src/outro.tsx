import './style.scss';

import ReactDOM = require('react-dom');
import React = require('react');
import { StylesProvider } from '@material-ui/styles';
import { Button } from '@material-ui/core';

const sonaCallbackURL = 'xd';

const urlParams = new URLSearchParams(window.location.search);

const sonaParamName = 'sona';
const sonaID = urlParams.get(sonaParamName);

const sonaText = (
	<>
		<p>Dziękuję za udział w badaniu!</p>
		<p>Kliknij w link poniżej, aby potwierdzić ukończenie badania w systemie SONA</p>
		<Button variant='contained' component='a' href={`${sonaCallbackURL}?${sonaParamName}=${sonaID}`}>Zakończ badanie</Button>
	</>
);

const defaultText = (
	<>
		<p>Dziękuję za udział w badaniu!</p>

		<p>Możesz zamknąć tę kartę. Jeśli chciałbyś obejrzeć swoje odpowiedzi, kliknij w przycisk poniżej.</p>
		<Button variant='contained' component='a' href={'/preview}'}>Przeglądarka odpowiedzi</Button>

	</>
);

ReactDOM.render(
	<StylesProvider injectFirst>
		<div className="text">
			{sonaID ? sonaText : defaultText}
		</div>
	</StylesProvider>
	,
	document.getElementById('root')
);