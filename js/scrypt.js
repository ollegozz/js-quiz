const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

//Находим элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

// Переменные игры
let score = 0; //кол-во правильных ответов
let questionIndex = 0; //текущий вопрос

//объявление функций function Declaration
clearPage();  //очищаем разметку
showQuestions(); //показать вопрос
submitBtn.onclick = checkAnswer;

function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestions(){
//console.log('showQuestions');
	//вопрос
	const headerTemplate = `<h2 class="title">%title%</h2>`
	const title =  headerTemplate.replace('%title%', questions[questionIndex]['question']);
	
	headerContainer.innerHTML = title;

	//варианты ответов
let answerNumber = 1;
	for (answerText of questions[questionIndex]['answers']) {
		// console.log(answerNumber, answerText);
		let questionTemplate =  //%answer% метка под ответ
			`<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>   
				</label>
			</li>`;

		let answerHTML = questionTemplate.replace('%answer%', answerText);		
		// console.log(answerHTML);

		answerHTML = answerHTML.replace('%number%', answerNumber);

		listContainer.innerHTML += answerHTML;
		answerNumber++;

	}		
}

function checkAnswer(){
	// console.log('checkAnswer started');

	//находим выбранную радиокнопку
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')
	// console.log(checkedRadio);

	//если ответ не выбран выходим из функции
	if (!checkedRadio){
		submitBtn.blur();
		return 
	}	
	
	//узнаем номер ответа пользователя
	const userAnswer = parseInt(checkedRadio.value)

	//Елси ответ верный - увеличиваем счет
	// console.log(userAnswer, questions[questionIndex]['correct']);
	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
		// console.log('score', score);
	}

	if (questionIndex !== questions.length -1){
		// console.log('Это НЕ полседний вопрос');
		questionIndex++;
		clearPage();
		showQuestions();
	} else {
		// console.log('Это полседний вопрос');
		clearPage();
		showResults();
	}
}

function showResults (){
	// console.log('showResults START');
	// console.log(score);

	const resultTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
		`;

	let tittle, message;
	//варианты заголовков и текста
	if (score === questions.length){
		tittle = 'Поздравляем!!!';
		message = 'Вы ответили вено на все вопросы!!!';
	} else if (score * 100 / questions.length >= 50) {
		tittle = 'Неплохой результат!!!';
		message = 'Вы дали больше половины правильных ответов!!!';
	} else {
		tittle = 'Стоит постараться!!!';
		message = 'У вас меньше половины правильных ответов!!!';
	}
	

	//результат
	let result = `${score} из ${questions.length}`;

	//финал, подставляем данные в шаблон
	const finalMessage = resultTemplate
								.replace('%title%', tittle)
								.replace('%message%', message)
								.replace('%result%', result)

	headerContainer.innerHTML = finalMessage;

	//меняем кнопку на играть снова
	submitBtn.blur();
	submitBtn.innerText = 'Начать заново';
	submitBtn.onclick = () => { history.go() };  //history.go без аргументов равна обновлению страницы


}