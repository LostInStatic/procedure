import { Button } from '@material-ui/core';
import React = require('react');

interface Props {
	nextViewCallback: () => void
}

const TextDisplay: React.FC<Props> = (props) => {

	return <>
		<div className="text">{props.children}</div>
		<Button
			variant='contained'
			color='primary'
			className="next-button"
			onClick={
				() => props.nextViewCallback()
			}
		>Dalej</Button>
	</>;
};

export default TextDisplay;