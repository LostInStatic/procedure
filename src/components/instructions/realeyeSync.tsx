import { Button } from '@material-ui/core';
import React = require('react');
import { useDataLogger } from '../data/dataLogger';

interface Props {
	nextViewCallback: () => void
}

const Sync: React.FC<Props> = (props) => {
	const dataLogger = useDataLogger();
	const [clicked, click] = React.useReducer((state) => state + 1, 0);
	React.useEffect(() => {
		if (clicked === 4) props.nextViewCallback();
	});
	return <>
		<div className="text">
			<p>Kliknij przycisk poniżej cztery razy. To, oraz liczba wyświetlona poniżej pomoże zsynchronizować nagranie ruchu oczu z innymi danymi.</p>
		</div>
		<Button
			variant='contained'
			color='primary'
			className="next-button"
			onClick={
				() => {
					click();
					dataLogger.recordSyncClick([Date.now()]);
				}
			}
		>{4 - clicked}</Button>
		<div style={{opacity: '0.5'}}>{dataLogger.session.id}</div>
	</>;
};

export default Sync;