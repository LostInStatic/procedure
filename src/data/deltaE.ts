export default function colorDifference(color1, color2) {
	const deltaE = color1.deltaE(color2, '2000');
	return {deltaE, description: differenceDescription(deltaE)};
}

function differenceDescription (difference:number) {
	if (difference < 2) return 'Idealnie!';
	if (difference < 6) return 'Prawie idealnie!';
	if (difference < 20) return 'Mała różnica';
	return '';
}