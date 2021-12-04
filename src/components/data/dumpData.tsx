import { Button } from '@material-ui/core';
import React = require('react');
import { useDataLogger } from './dataLogger';
import { submit } from './netlifySubmit';

interface Props {

}

const DumpData: React.FC<Props> = (props) => {

	const dataJSON = JSON.stringify(useDataLogger());
	const filename = React.useMemo(() => `${useDataLogger().session.id}.json`, []);

	React.useEffect(() => {
		submit(dataJSON);
	}, []);

	return <>
		<p>
			Możesz teraz ściągnąć i zapisać plik z danymi - będzie Ci potrzebny do obejrzenia odpowiedzi (link otrzymasz na samym końcu). Następnie przełącz się na kartę RealEye (nie zamykaj tej!), kliknij w dowolnym miejscu i wykonaj następne polecenia.
		</p>

		<p>Przycisk escape (esc) pozwoli ci wyjść z trybu pełnoekranowego.</p>
		
		<Button
			className='next-button'
			component='a'
			variant='contained'
			color='primary'
			href={`data:text/json;charset=utf-8,${encodeURIComponent(dataJSON)}`}
			download={filename}
		> Ściągnij dane</Button >
	</>;
};

export default DumpData;