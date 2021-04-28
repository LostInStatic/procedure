export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export type ModelName = 'RGB' | 'HSL'

export type TrialType = 'training' | 'study'

export type FeedbackLevel = 'full' | 'values' | 'minimal'

export interface Model {
	name: ModelName,
	scales: { label: string, max: number }[],
	setColor: (values: number[]) => {backgroundColor: string}
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

export interface SessionData {
	id: number
}