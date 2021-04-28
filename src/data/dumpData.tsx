import { Link } from '@material-ui/core';
import React = require('react');
import { useDataLogger } from './dataLogger';

interface Props {

}

const DumpData: React.FC<Props> = (props) => {

	const data = useDataLogger();

	return <Link
		variant='button'
		color='primary'
		href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data.state))}`}
		download='data.json'
	> Ściągnij dane</Link >;
};

export default DumpData;