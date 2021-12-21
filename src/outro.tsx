import './style.scss';

import ReactDOM = require('react-dom');
import React = require('react');
import { StylesProvider } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Cookies = require('js-cookie');

const sonaCallbackURL = 'https://swps.sona-systems.com/webstudy_credit.aspx?experiment_id=1542&credit_token=4283b72c4a3b4214bfe64dba338f6423&survey_code=';

const urlParams = new URLSearchParams(window.location.search);

const sonaParamName = 'sona';
const sonaID = urlParams.get(sonaParamName) || Cookies.get('sona_id');
const isFallbackRoutine = urlParams.has('fallback');

const sonaText = (
	<>
		<p>Kliknij w link poniżej, aby potwierdzić ukończenie badania w systemie SONA {isFallbackRoutine ? '(jeśli nie zrobiłeś tego już wcześniej)' : ''}</p>
		<Button variant='contained' component='a' href={`${sonaCallbackURL}${sonaID}`} target='_blank'>Zakończ badanie</Button>
	</>
);

const defaultText = (
	<>

		<p>Jeśli chciałbyś obejrzeć swoje odpowiedzi, kliknij w przycisk poniżej.</p>
		<Button variant='contained' component='a' href={'/preview'}>Przeglądarka odpowiedzi</Button>
		<p>Dziękuję za udział w badaniu!</p>

	</>
);

ReactDOM.render(
	<StylesProvider injectFirst>
		<div className="text">
			{isFallbackRoutine ? <p>Jeśli napotkałeś błąd uniemożliwiający zakończenie procedury (biały ekran), użyj tego okna. Jeśli udało ci się przejść dalej bez problemu (i zobaczyłeś już podobne okno), możesz zamknąć to.</p> : ''}
			{sonaID ? sonaText : ''}
			{defaultText}
		</div>
	</StylesProvider>
	,
	document.getElementById('root')
);