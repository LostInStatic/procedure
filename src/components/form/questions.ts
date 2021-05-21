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

export type Question = OpenQuestion | ClosedQuestion

const answers = {
	boolean: [
		{id: 'true', label: 'Tak'},
		{id: 'false', label: 'Nie'}
	],
	frequency: [
		{id: '0', label: 'Nigdy'},
		{id: '1', label: 'Sporadycznie'},
		{id: '2', label: 'Czasami'},
		{id: '3', label: 'Regularnie'},
		{id: '4', label: 'Codziennie'}
	]
};



export const questionnaire: Question[] = [
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
		label: 'Czy jesteś daltonistą?',
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
			},
			{
				id:'NA',
				label: 'Wolę nie podawać'
			}
		]
	},
	{
		id: 'trade',
		type: 'multiple',
		label: 'Ze względu na wykształcenie/pełniony zawód określiłbyś się jako (zaznacz wszystkie pasujące odpowiedzi):',
		answers: [
			{
				id:'frontEnd',
				label: 'Programista UI'
			},
			{
				id:'otherDev',
				label: 'Inny programista'
			},
			{
				id: 'UIDesigner',
				label: 'Projektant UI'
			},
			{
				id: 'compGraphics',
				label: 'Grafik komputerowy'
			},
			{
				id: 'compGraphics',
				label: 'Grafik komputerowy'
			}

		]
	},
	{
		id: 'freqColorModels',
		type: 'radio',
		label: 'Jak często korzystasz z modeli kolorów?',
		answers: answers.frequency
	}
];
