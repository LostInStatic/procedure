export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export type ModelName = 'RGB' | 'HSL'

export type TrialType = 'training' | 'study'

export type FeedbackLevel = 'full' | 'gradients' | 'values' | 'minimal'

export interface Model {
	name: ModelName,
	axes: { label: string, max: number, gradientCSS?: string }[],
	setColor: (values: number[]) => { backgroundColor: string }
}

export interface TrialData {
	started: number,
	ended: number,
	target: number[],
	answer: number[],
	model: ModelName,
	trialType: TrialType,
	feedbackLevel: FeedbackLevel
}