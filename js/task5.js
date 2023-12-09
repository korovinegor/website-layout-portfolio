// Настройки стиля
var primaryColor = "sandybrown";
var secondaryColor = "blanchedalmond";
var selectionColor = "yellow";
var borderColor = "orange";
var correctAnswerColor = "lightgreen";
var wrongAnswerColor = "pink";
var hideOptionsDelay= 0.5;
var hideOptionsDuration = 1;
var hideTranslationAmount = "100%";
var correctAnswerStayDuration = 5;
var wrongAnswerStayDuration = 2;

// Данные для теста
test = [
    {
        question: "А голос у него был не такой, как у почтальона Печкина, дохленький. У Гаврюши голосище был, как у электрички. Он _____ _____ на ноги поднимал.",
        options: [
            "Пол деревни, за раз",
            "Полдеревни, зараз",
            "Пол-деревни, за раз"
        ],
        answer: 1,
        note: "Правильно! Раздельно существительное будет писаться в случае наличия дополнительного слова между существительным и частицей. Правильный ответ: полдеревни пишется слитно. Зараз (ударение на второй слог) — это обстоятельственное наречие, пишется слитно. Означает быстро, одним махом."
    },

    {
        question: "А эти слова как пишутся?",
        options: [
            "Капуччино и эспрессо",
            "Каппуччино и экспресо",
            "Капучино и эспрессо"
        ],
        answer: 2,
        note: "Конечно! По орфографическим нормам русского языка единственно верным написанием будут «капучино» и «эспрессо»."
    },

    {
        question: "Как нужно писать?",
        options: [
            "Черезчур",
            "Черес-чур",
            "Чересчур"
        ],
        answer: 2,
        note: "Да! Это слово появилось от соединения предлога «через» и древнего слова «чур», которое означает «граница», «край». Но слово претерпело изменения, так что правильное написание учим наизусть — «чересчур»."
    },

    {
        question: "Где допущена ошибка?",
        options: [
            "Аккордеон",
            "Белиберда",
            "Эпелепсия"
        ],
        answer: 2,
        note: "Верно! Это слово пишется так: «эпИлепсия»"
    }
]

// Вывод цифр от 1 до n в случаном порядке
function getRandomOrder(n) {

    let order = new Array(n);
    for (var i = 0; i < n; i++) {
        order[i] = i;
    }

    let currentIndex = n-1;
    let randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        [order[currentIndex], order[randomIndex]] =
            [order[randomIndex], order[currentIndex]];
        currentIndex--;
    }

    return order;
}


questionsOrder = getRandomOrder(test.length);
orderIndex = 0;
results = new Array(test.length);

// Вывод вопроса с вариантами ответов
function showQuestion() {

    // Выбор элемента для вставки
    let containerElement = document.getElementById('test');

    // Выбор вопроса
    let questionIndex = questionsOrder[orderIndex];

    // Создание элемента с вопросом
    let questionElement = document.createElement('p');
    questionElement.className = "question";
    questionElement.textContent = `[${orderIndex + 1}/${test.length}] ` + test[questionIndex]['question'];
    questionElement.style.backgroundColor = primaryColor;

    // Добавление элемента с вопросом
    containerElement.appendChild(questionElement);

    // Добавление вариантов ответа
    let options = test[questionIndex]['options'];
    let optionsOrder = getRandomOrder(options.length);
    for (var i = 0; i < options.length; i++) {

        // Выбор варианта ответа
        let optionIndex = optionsOrder[i];
        let optionElement = document.createElement('p');

        // Создание элемента с вариантом ответа
        optionElement.className = "option";
        optionElement.textContent = options[optionIndex];
        optionElement.style.backgroundColor = secondaryColor;
        optionElement.style.cursor = "pointer";
        optionElement.onclick = showAnswer;
        optionElement.onmouseover = function () {
            optionElement.style.backgroundColor = selectionColor;
        }
        optionElement.onmouseout = function () {
            optionElement.style.backgroundColor = secondaryColor;
        }
        optionElement.optionIndex = optionIndex;

        // Добавление элемента с вариантом ответа
        containerElement.appendChild(optionElement);
    }

}

// Вывод ответа и скрытие вопроса
function showAnswer() {

    // Удаление функций по событиям для блоков ответов
    let optionElements = document.getElementsByClassName('option');
    for (var i = 0; i < optionElements.length; i++) {
        optionElements[i].onclick = null;
        optionElements[i].onmouseover = null;
        optionElements[i].onmouseout = null;
    }

    // Добавление рамки к блоку ответа
    this.style.border = `3px solid ${borderColor}`;

    // Выбор вопроса
    let questionIndex = questionsOrder[orderIndex];

    // Выделение выбранного варианта и скрытие вопроса
    if (this.optionIndex == test[questionIndex]['answer']) {

        // Запись результата
        results[orderIndex] = true;

        // Добавление пояснения к ответу
        this.textContent += ". " + test[questionIndex]['note'];

        // Изменение цвета блока вопроса
        questionElement = document.getElementsByClassName('question')[0];
        questionElement.style.backgroundColor = correctAnswerColor;

        for (var i = optionElements.length - 1; i >= 0; i--) {

            // Длительность и задержка анимации скрытия элемента
            let duration = hideOptionsDuration / optionElements.length;
            let delay = hideOptionsDelay + (hideOptionsDuration - duration) * (1 - i / (optionElements.length - 1));
            if (this == optionElements[i]) {
                delay = correctAnswerStayDuration - duration * 2;
            }

            // Анимация скрытия элемента
            optionElements[i].style.transform = `translateY(${hideTranslationAmount})`;
            optionElements[i].style.opacity = 0;
            optionElements[i].style.transition = `transform ${duration}s ${delay}s ease, opacity ${duration}s ${delay}s ease`;
        }
    }
    else {

        // Запись результата
        results[orderIndex] = false;

        // Добавление пояснения к ответу
        this.textContent += ". Неверный ответ."

        // Изменение цвета блока вопроса
        questionElement = document.getElementsByClassName('question')[0];
        questionElement.style.backgroundColor = "pink";

        for (var i = optionElements.length - 1; i >= 0; i--) {

            // Длительность и задержка анимации скрытия элемента
            let duration = hideOptionsDuration / optionElements.length;
            let delay = hideOptionsDelay + (hideOptionsDuration - duration) * (1 - i / (optionElements.length - 1));

            // Анимация скрытия элемента
            optionElements[i].style.transform = `translateY(${hideTranslationAmount})`;
            optionElements[i].style.opacity = 0;
            optionElements[i].style.transition = `transform ${duration}s ${delay}s ease, opacity ${duration}s ${delay}s ease`;
        }

    }

    // Вывод следующего вопроса или итогов
    setTimeout(function () {
        document.getElementById('test').innerHTML = "";
        if (orderIndex < questionsOrder.length - 1) {
            orderIndex++;
            showQuestion();
        }
        else {
            showResults();
        }
    }, results[orderIndex] ? correctAnswerStayDuration * 1000 : wrongAnswerStayDuration * 1000);
}

// Вывод резултатов теста
function showResults() {

    // Изменение заголовка
    let headingElement = document.getElementById("test-heading");
    headingElement.textContent = "Вопросы закончились";

    // Выбор элемента для вставки
    let containerElement = document.getElementById('test');

    containerElement.style.display = "flex";
    containerElement.style.flexWrap = "wrap";

    for (var i = 0; i < questionsOrder.length; i++) {

        // Выбор вопроса
        let questionIndex = questionsOrder[i];

        // Создание элемента с вопросом
        let questionElement = document.createElement('p');
        questionElement.className = "question";
        questionElement.style.display = "flex";
        questionElement.style.flexDirection = "column";
        questionElement.style.alignItems = "center";
        questionElement.style.cursor = "pointer";
        questionElement.textContent = `${i + 1}. ` + test[questionIndex]['question'];
        if (results[i]) {
            questionElement.style.backgroundColor = correctAnswerColor;
        }
        else {
            questionElement.style.backgroundColor = "pink";
        }
        questionElement.onclick = function () {

            let answerElements = document.getElementsByClassName("answer");
            if (answerElements[0] != undefined) {
                answerElements[0].remove();
            }
            
            // Создание блока ответа
            let answerIndex = test[questionIndex]['answer'];
            let answer = test[questionIndex]['options'][answerIndex];
            let note = test[questionIndex]['note'];
            let answerElement = document.createElement('p');
            answerElement.textContent = `Ответ: ${answer}. ${note}`;
            answerElement.className = "answer";
            answerElement.style.width = "90%";
            answerElement.style.backgroundColor = secondaryColor;

            // Добавление блока ответа
            questionElement.appendChild(answerElement);
        }

        // Добавление элемента с вопросом
        containerElement.appendChild(questionElement);
    }
}

showQuestion();