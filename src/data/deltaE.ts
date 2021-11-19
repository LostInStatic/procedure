export default function colorDifference(color1, color2) {
	const deltaE = color1.deltaE(color2, '2000');
	return {deltaE, description: differenceDescription(deltaE)};
}

function differenceDescription (difference:number) {
	if (difference < 2) return 'Idealnie!';
	if (difference < 5) return 'Prawie idealnie!';
	if (difference < 12) return 'Niewielka różnica';
	if (difference < 30) return 'Znacząca różnica';
	return 'Duża różnica';
}