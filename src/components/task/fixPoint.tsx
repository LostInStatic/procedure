import React = require('react');

interface Props {
	nextViewCallback: () => void
}

const FixationPoint: React.FC<Props> = (props) => {

	React.useEffect(
		() => {
			const interval = setInterval(
				props.nextViewCallback,
				200
			);
			return () => clearInterval(interval);
		},
		[]
	);

	return <div className="fixation-point">
		+
	</div>;
};

export default FixationPoint;