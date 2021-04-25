export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export type TrialData = {
	started: number,
	ended: number,
	target: number[],
	answer: number[],
	model: 'RGB' | 'HSL',
	trialType: 'training' | 'study',
	feedbackLevel: 'full' | 'values' | 'minimal'
}

export type SessionData = {
	id: number
}