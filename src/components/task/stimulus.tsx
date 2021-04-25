import React = require('react');

interface IProps {
	colorStyle: React.CSSProperties
}

const Stimulus: React.FC<IProps> = (props) => {

	return <div
		className='stimulus'
		style={props.colorStyle}
	>
	</div>;
};

export default Stimulus;