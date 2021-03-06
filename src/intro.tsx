import './style.scss';

import ReactDOM = require('react-dom');
import React = require('react');
import { StylesProvider } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Cookies = require('js-cookie');

let realEyeURL = 'https://www.realeye.io/test/153247d4-2078-4555-9e29-87f61e036242/run';

const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('integration_test')) realEyeURL = '/thankyou';

const sessionID = Date.now().toString();
const sonaParamName = 'sona';
const sonaID = urlParams.get(sonaParamName);

Cookies.set('session_id', sessionID);
if (sonaID) Cookies.set('sona_id', sonaID);

const sonaText = (
	<>
		<p>W pierwszej kolejności zostanie skalibrowane oprogramowanie do eyetrackingu. Upewnij się, że znajdujesz się w wygodnej pozycji siedzącej, masz pod ręką myszkę, a twoja twarz jest dobrze oświetlona.</p>
		<p>Jeśli jesteś gotowy/a, aby wziąć udział w badaniu, kliknij w link poniżej:</p>
	</>
);

const defaultText = (
	<>
		<p>Dziękuję za chęć uczestnictwa w badaniu!</p>

		<p>Głównym celem badania jest zbadanie różnic między dwoma modelami kolorów (RGB i HSL) w szybkości i precyzji wybierania kolorów przy ich wykorzystaniu. </p>

		<p>Całe badanie odbędzie się online, potrwa około pół godziny. Do badania potrzebny jest komputer z myszką oraz kamerą umieszczoną blisko krawędzi ekranu, z zainstalowaną przeglądarką Google Chrome. </p>

		<p>Wszyskie zbierane dane są zanonimizowane. Podczas badanie będzie rejestrowany obraz z kamery oraz obraz wyświetlany na ekranie. Obraz z kamery służy jedynie zarejestrowaniu ruchu gałek ocznych i nie jest zapisywany - przetwarzany jest na urządzeniu osoby badanej. Zapisywane są jedynie dane liczbowe dotyczące przewidywanego miejsca skupienia wzroku.</p>

		<p>Przed właściwą częścią badania zostaniesz poproszony o wypełnienie formularza zbierającego informacje o twoim roku urodzenia, płci, ewentualnych problemach w rozróżnianiu kolorów i wcześniejszych doświadczeniach z modelami kolorów. Podczas badania będziesz wykonywać zadania wymagające skupiania wzroku w określonych punktach na ekranie, porównywania ze sobą kolorów i wybierania liczbowych wartości za pomocą sliderów. Będziesz także pytany o subiektywną trudność wykonywanych zadań za pomocą formularza. </p>

		<p>Twój udział w badaniu jest w pełni dobrowolny i możesz z niego zrezygnować w dowolnym momencie.</p>

		<p>W pierwszej kolejności zostanie skalibrowane oprogramowanie do eyetrackingu. Upewnij się, że znajdujesz się w wygodnej pozycji siedzącej, masz pod ręką myszkę, a twoja twarz jest dobrze oświetlona.</p>

		<p>Klikając w link poniżej wyrażasz zgodę na udział w badaniu. Jeśli jesteś gotowa/y, upewnij się że używasz właśnie przeglądarki Google Chrome i kliknij go.</p>
	</>
);

ReactDOM.render(
	<StylesProvider injectFirst>
		<div className="text">
			{sonaID ? sonaText : defaultText}
			<Button variant='contained' component='a' href={`${realEyeURL}?session_id=${sessionID}&${sonaID ? `${sonaParamName}=${sonaID}` : ''}`}>Dalej</Button>
		</div>
	</StylesProvider>
	,
	document.getElementById('root')
);