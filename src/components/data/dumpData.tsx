import { Button } from '@material-ui/core';
import React = require('react');
import { useDataLogger } from './dataLogger';

interface Props {

}

const DumpData: React.FC<Props> = (props) => {

	const encodedJSON = encodeURIComponent(JSON.stringify(useDataLogger()));
	const filename = React.useMemo(() => `${useDataLogger().session.id}.json`, []);

	return <>
		<p>
			Proszę o ściągnięcie i zapisanie pliku z danymi. Następnie przełącz się na kartę RealEye (nie zamykaj tej!), kliknij w dowolnym miejscu i wykonaj następne polecenia.
		</p>
		<Button
			className='next-button'
			component='a'
			variant='contained'
			color='primary'
			href={`data:text/json;charset=utf-8,${encodedJSON}`}
			download={filename}
		> Ściągnij dane</Button >
	</>;
};

export default DumpData;