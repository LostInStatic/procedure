const instructions = {
	beforeForm: `
		Dziękuję za chęć wzięcia udziału w badaniu. Po wciśnięciu przycisku "dalej" wyświetli się krótki formularz. Po wypełnieniu go przejdziesz do części eksperymentalnej. Jeśli widzisz na ekranie informację o udostępnianiu ekranu, kliknij "ukryj" zanim przejdziesz dalej.
	`,
	beforeBlindnessTest: `
	Za chwilę przejdziesz przez test mający sprawdzić twoją zdolność do rozróżniania kolorów. Twoje zadanie polega na kliknięciu na mniejsze koło odpowiadające kolorem dużemu kołu.
`,
	beforeTask: `
		W tym badaniu twoje zadanie będzie polegać na dopasowywaniu wartości modelu (za pomocą suwaków) do przedstawionego koloru. Będziesz operować na dwóch modelach - RGB oraz HSL. Dla każdego modelu czekają cię kolejno dwie serie zadań - treningowa i badawcza. Podczas serii treningowej zadania będą prezentowane z rosnącym poziomem trudności. Po każdej odpowiedzi pojawi się plansza z informacją zwrotną. Podczas sesji eksperymentalnej kolejność będzie losowa, a informacja zwrotna nie będzie wyświetlana. Będziesz manipulował wartościami modelu za pomocą trzech suwaków - każdy odpowiada pojedyńczej skali modelu. Dla uproszczenia suwaki przeskakują wartości co dziesięć.  Kliknij "dalej" aby kontynuować.
	`,
	beforeTraining: `
	Po kliknięciu "dalej" rozpocznie się sesja treningowa. Twoje odpowiedzi nie będą brane pod uwagę w późniejszej analizie, więc skup się przede wszystkim na zapoznaniu się z zadaniem i modelem. Poziom trudności będzie wzrastał - pierwsze zadania będą wymagały od ciebie dopasowania do siebie koloru dwóch pól, w późniejszych nie będzie wyświetlane pole odpowiadające aktualnie wybranemu kolorowi.
	`,
	beforeStudy: `
	Po kliknięciu "dalej" rozpocznie się sesja eksperymentalna. Informacja zwrotna po odpowiedziach nie będzie wyświetlana. Poziom trudności będzie losowy.
	`,
	beforeTLX: `
	Po kliknięciu "dalej" pojawi się formularz. Odnosi się do serii zadań, którą właśnie zakończyłeś.
	`,
	beforeRGB: `
	W modelu RGB kolor jest określany na skali czerwoności (R), zieloności (G) i niebieskości (B). Każda skala przyjmuje wartości od 0 do 255.
	`,
	beforeHSL: `
	W modelu HSL kolor jest określany na skali odcienia (H, od 0 do 360), nasycenia (S, 0 - 100) oraz jasności (L, 0 - 100).
	`

};

export default instructions;