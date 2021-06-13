import Color from 'colorjs.io';
import { Model } from './types';

const generateGradient = (model: string, start: number[], end: number[]) => {
	const colorStart = new Color(model, start);
	const colorEnd = new Color(model, end);
	const range = colorStart.range(colorEnd, { space: model, hue: 'raw' });
	return `linear-gradient(to right, ${Color.steps(range, { maxDeltaE: 10 }).join(', ')
	})`;
};

const models: Model[] = [
	{
		name: 'RGB',
		axes: [
			{ label: 'R', max: 255, gradientCSS: generateGradient('srgb', [0, 0, 0], [1, 0, 0]) },
			{ label: 'G', max: 255, gradientCSS: generateGradient('srgb', [0, 0, 0], [0, 1, 0]) },
			{ label: 'B', max: 255, gradientCSS: generateGradient('srgb', [0, 0, 0], [0, 0, 1]) }
		],
		setColor: (values: number[]) => {
			return { backgroundColor: `rgb(${values[0]}, ${values[1]}, ${values[2]})` };
		}
	},
	{
		name: 'HSL',
		axes: [
			{ label: 'H', max: 360, gradientCSS: generateGradient('hsl', [0, 50, 50], [360, 50, 50]) },
			{ label: 'S', max: 100, gradientCSS: generateGradient('hsl', [180, 0, 50], [180, 100, 50]) },
			{ label: 'L', max: 100, gradientCSS: generateGradient('hsl', [180, 50, 0], [180, 50, 100]) }
		],
		setColor: (values: number[]) => {
			return { backgroundColor: `hsl(${values[0]}, ${values[1]}%, ${values[2]}%)` };
		}
	}
];

console.log(models[0].axes[0].gradientCSS);

export default models;

