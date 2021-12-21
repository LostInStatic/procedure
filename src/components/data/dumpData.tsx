import { Button } from '@material-ui/core';
import React = require('react');
import { useDataLogger } from './dataLogger';
import { submit } from './netlifySubmit';

interface Props {

}

const DumpData: React.FC<Props> = (props) => {
	const data = useDataLogger();

	React.useEffect(
		() => {
			const _navigator = {};
			for (const i in window.navigator) _navigator[i] = navigator[i];
			data.recordAuxData({
				ended: Date.now(),
				env: _navigator,
				resolution: [screen.width, screen.height]
			});
		}, []
	);

	const dataJSON = JSON.stringify(data);
	const filename = React.useMemo(() => `${data.session.id}.json`, []);

	React.useEffect(() => {
		submit(dataJSON);
	}, []);

	return <div className="text">
		<p>
			Kilknięcie przycisku rozpocznie ściąganie pliku z twoimi odpowiedziami, oraz otworzy osobne okno - jeśli coś pójdzie nie tak podczas przesyłania danych eyetrackingowych (biały ekran), przejdź do niego.
		</p>

		<p>Po kliknięciu przycisku ta karta zostanie zamknięta.</p>
		
		<Button
			className='next-button'
			component='a'
			variant='contained'
			color='primary'
			href={`data:text/json;charset=utf-8,${encodeURIComponent(dataJSON)}`}
			onClick={() => {
				window.open('/thankyou?fallback', '_blank', 'popup');
				window.close();
			}}
			download={filename}
		> Ściągnij dane</Button >
	</div>;
};

export default DumpData;