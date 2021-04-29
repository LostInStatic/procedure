const instructions = {
	beforeSession: `
		W tym badaniu twoje zadanie będzie polegać na dopasowywaniu wartości modelu (za pomocą suwaków) do przedstawionego koloru. Będziesz operować na dwóch modelach - RGB, w którym kolor jest opisywany na skalach czerwoności, zieloności i niebieskości oraz HSL, gdzie kolor jest opisywany przez odcień, nasycenie i jasność. Podczas sesji treningowej zadania będą prezentowane z rosnącym poziomem trudności, po kolei dla każdego modelu. Po każdej odpowiedzi pojawi się plansza z informacją zwrotną. Podczas sesji eksperymentalnej kolejność będzie losowa, a informacja zwrotna nie będzie wyświetlana. Kliknij "dalej" aby kontynuować.
	`,
	beforeTraining: `
	Po kliknięciu "dalej" rozpocznie się sesja treningowa. Twoje odpowiedzi nie będą brane pod uwagę w późniejszej analizie, więc skup się przede wszystkim na zapoznaniu się z zadaniem i modelami.
	`,
	beforeStudy: `
	Po kliknięciu "dalej" rozpocznie się sesja eksperymentalna. Informacja zwrotna po odpowiedziach nie będzie wyświetlana.
	`
};

export default instructions;