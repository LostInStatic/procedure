import React = require('react');

interface Props {
	title?: string
	description: string
}

const Divider: React.FC<Props> = (props) => {

	return <div className="form-section">
		<hr/>
		{props.title ? <h2>{props.title}</h2> : ''}
		<p>{props.description}</p>
	</div>;
};

export default Divider;