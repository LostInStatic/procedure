import { Model } from './types';

const models: Model[] = [
	{
		name: 'RGB',
		axes: [
			{ label:'R', max: 255 },
			{ label:'G', max: 255 },
			{ label:'B', max: 255 }
		],
		setColor: (values: number[]) => {
			return { backgroundColor: `rgb(${values[0]}, ${values[1]}, ${values[2]})` };
		}
	},
	{
		name: 'HSL',
		axes: [
			{ label:'H', max: 360 },
			{ label:'S', max: 100 },
			{ label:'L', max: 100 }
		],
		setColor: (values: number[]) => {
			return { backgroundColor: `hsl(${values[0]}, ${values[1]}%, ${values[2]}%)` };
		}
	}
];

export default models;