export interface OpenQuestion {
	id: string,
	label: string,
	placeholderValue?: number
	type: 'number',	
}

export interface ClosedQuestion {
	id: string,
	label: string,
	placeholderValue?: string
	type: 'select'|'radio'|'multiple',
	answers: {
		id: string,
		label: string
	}[]
}

export interface Divider {
	type: 'divider',
	title?: string,
	description: string
}

export type FormItem = OpenQuestion | ClosedQuestion | Divider

const answers = {
	boolean: [
		{id: 'true', label: 'Tak'},
		{id: 'false', label: 'Nie'}
	],
	priorExperience: [
		{id: '0', label: 'Nigdy'},
		{id: '1', label: 'Kilka razy'},
		{id: '2', label: 'Wielokrotnie'},
		{id: '3', label: 'Regularnie'},
		{id: '4', label: 'Niemal codziennie'}
	]
};



export const questionnaire: FormItem[] = [
	{
		id: 'age',
		type: 'number',
		label: 'Wiek:'
	},
	{
		id:'gender',
		type: 'select',
		label: 'Płeć:',
		answers: [
			{
				id:'M',
				label:'Mężczyzna'
			},
			{
				id: 'F',
				label:'Kobieta'
			},
			{
				id:'NB',
				label: 'Inna'
			},
			{
				id:'NA',
				label: 'Wolę nie podawać'
			}
		]
	},
	{
		id: 'daltonism',
		type: 'radio',
		label: 'Czy masz stwierdzony daltonizm lub inne zaburzenie postrzegania kolorów?',
		answers: answers.boolean
	},
	{
		id: 'education',
		type: 'select',
		label: 'Wykształcenie:',
		answers: [
			{
				id:'tradeschool',
				label:'Zawodowe'
			},
			{
				id:'highschool',
				label:'Średnie'
			},
			{
				id: 'qualifications',
				label: 'Policealne'
			},
			{
				id: 'higher',
				label:'Wyższe'
			}
		]
	},
	{
		id: 'trade',
		type: 'multiple',
		label: 'Czy określił(a)byś się jako (zaznacz wszystkie pasujące odpowiedzi):',
		answers: [
			{
				id: 'UIDesigner',
				label: 'Projektant UI'
			},
			{
				id: 'compGraphics',
				label: 'Grafik komputerowy'
			},
			{
				id: 'graphics',
				label: 'Grafik/projektant'
			},
			{
				id: 'artist',
				label: 'Artysta'
			},
			{
				id:'frontEnd',
				label: 'Programista UI'
			},
			{
				id:'otherDev',
				label: 'Inny programista'
			},
		]
	},
	{
		type: 'divider',
		title: 'Jak dużo/często zdarzało ci się:',
		description: 'Jeśli terminy użyte w pytaniu nie są dla ciebie jasne, zaznacz odpowiedź "Nigdy"'
	},
	{
		id: 'freqColorMix',
		type: 'radio',
		label: 'Mieszać barwniki? (n.p. przy malowaniu farbami)',
		answers: answers.priorExperience
	},
	{
		id: 'freqColorModelsUse',
		type: 'radio',
		label: 'Wybierać kolor w interfejsie graficznym? (n.p. wybór koloru w Photoshopie)',
		answers: answers.priorExperience
	},
	{
		id: 'freqNumericValuesUse',
		type: 'radio',
		label: 'Przy pracy z kolorami bezpośrednio edytować wartości liczbowe modelu?',
		answers: answers.priorExperience
	},
	{
		id: 'freqRGBUse',
		type: 'radio',
		label: 'Korzystać z modelu RGB?',
		answers: answers.priorExperience
	},
	{
		id: 'freqHSLUse',
		type: 'radio',
		label: 'Korzystać z modelu HSL?',
		answers: answers.priorExperience
	}
];
