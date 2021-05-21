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
			Proszę o ściągnięcie pliku z danymi i wysłanie go na adres <a href="mailto:akowal2@st.swps.edu.pl">akowal2@st.swps.edu.pl</a>.
			Dziękuję za udział w badaniu!
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