const question = document.getElementById('question');
// firslty we got info in form of html collection so we converted it into array using Array.from
const choices = Array.from(document.getElementsByClassName('choice-text'));
// console.log(choices);
// const questionCounterText = document.getElementById('questionCounter');
const progressText = document.getElementById('progressText')
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull'); // to show the progress bar
const loader = document.getElementById('loader');
const game = document.getElementById('game');



let currentQuestion = {};
let acceptingAnswers = false; //assigning false so that user cant answer before
let score = 1;
let questionCounter = 0;
let availableQuestions = [];

// using api to fetch question
let questions = [];

// fetch("question.json").then(res => {
//     return res.json();
// })
// .then(loadedQuestions => {
//     console.log(loadedQuestions);
//     questions = loadedQuestions; //get question which just loaded
//     // wait untill we get question and then start the game
//     startGame();
// })
// .catch( err => {
//     // when there is error then show this error message
//     console.error(err);
// })

fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
)
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });
// constants
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    // spread operator , take questions array spread all its item and put it into new array.
    // when there is chnage made during solving question we dont want to make changes in original array so used this
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    getNewQuestion();
    // to remove the loader when question is ready to display
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
    // when question gets finshed
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS)
    {
        // store the score of quiz, key=mostRecentScore 
        localStorage.setItem('mostRecentScore',score);

        // go to the end page
        return window.location.assign('end.html');
    }
    questionCounter++;

    // to display the question dynamically when question changes
    // questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; //converting to % so that effect can be applied on width
    // (questionCounter / MAX_QUESTIONS) * 100 this tells the amount of bar should be covered, 1/3 = 0.33,  33% of bar should be covered when 1st ques is seen

    // logic for showing questions
    // used availableQuestions.length bcz there might be changes in no of question from where we load questions
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    // By assigning currentQuestion.question to question.innerText, you're dynamically updating the content of the question HTML element to display the text stored in the question property of the currentQuestion object.
    question.innerHTML = currentQuestion.question;

    // loading choices same way
    choices.forEach(choice => {
        const number = choice.dataset['number']; //giving reference to the choices , we get access to custom attribute, so that every choice have a option
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex,1);//splice hleps to remove that question which is previously used,questionIndex tells where to splice out and 1 tell that one question need to be removed

    acceptingAnswers = true; //allow user to answer
};

//we are now making logic for checking user clicked the right answer
choices.forEach(choice => {
    choice.addEventListener('click',e=>{
        if(!acceptingAnswers) return;

        acceptingAnswers=false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        // console.log(typeof(selectedAnswer)); returns the string
        // console.log(typeof(currentQuestion.answer)); returns the number
        // console.log(selectedAnswer == currentQuestion.answer); //since one is string and other is number so we not use (===)

        // to apply effect on right and wrong answer and to give a pause after answer is given
        // it can be done with ternary operator as well
        // const classToApply = 'incorrect';
        // if(selectedAnswer == currentQuestion.answer)
        // {
        //     classToApply = 'correct';
        // }
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        // if ans is correct then increase the score by calling incrementScore
        if(classToApply == 'correct')
        {
            incrementScore(CORRECT_BONUS);
        }

        // adding class when ans is correct
        selectedChoice.parentElement.classList.add(classToApply);
        // to give a pause of 1 sec after giving answer
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion(); //to get new question when answer is given of previous
        },1000);       

    });
});
 //dynamically increasing the score when ans is correct
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
// startGame();


// const question = document.getElementById('question');
// const choices = Array.from(document.getElementsByClassName('choice-text'));
// const progressText = document.getElementById('progressText');
// const scoreText = document.getElementById('score');
// const progressBarFull = document.getElementById('progressBarFull');
// let currentQuestion = {};
// let acceptingAnswers = false;
// let score = 0;
// let questionCounter = 0;
// let availableQuesions = [];

// let questions = [];

// fetch(
//     'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
// )
//     .then((res) => {
//         return res.json();
//     })
//     .then((loadedQuestions) => {
//         questions = loadedQuestions.results.map((loadedQuestion) => {
//             const formattedQuestion = {
//                 question: loadedQuestion.question,
//             };

//             const answerChoices = [...loadedQuestion.incorrect_answers];
//             formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
//             answerChoices.splice(
//                 formattedQuestion.answer - 1,
//                 0,
//                 loadedQuestion.correct_answer
//             );

//             answerChoices.forEach((choice, index) => {
//                 formattedQuestion['choice' + (index + 1)] = choice;
//             });

//             return formattedQuestion;
//         });
//         startGame();
//     })
//     .catch((err) => {
//         console.error(err);
//     });

// //CONSTANTS
// const CORRECT_BONUS = 10;
// const MAX_QUESTIONS = 3;

// startGame = () => {
//     questionCounter = 0;
//     score = 0;
//     availableQuesions = [...questions];
//     getNewQuestion();
// };

// getNewQuestion = () => {
//     if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
//         localStorage.setItem('mostRecentScore', score);
//         //go to the end page
//         return window.location.assign('/end.html');
//     }
//     questionCounter++;
//     progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
//     //Update the progress bar
//     progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

//     const questionIndex = Math.floor(Math.random() * availableQuesions.length);
//     currentQuestion = availableQuesions[questionIndex];
//     question.innerText = currentQuestion.question;

//     choices.forEach((choice) => {
//         const number = choice.dataset['number'];
//         choice.innerText = currentQuestion['choice' + number];
//     });

//     availableQuesions.splice(questionIndex, 1);
//     acceptingAnswers = true;
// };

// choices.forEach((choice) => {
//     choice.addEventListener('click', (e) => {
//         if (!acceptingAnswers) return;

//         acceptingAnswers = false;
//         const selectedChoice = e.target;
//         const selectedAnswer = selectedChoice.dataset['number'];

//         const classToApply =
//             selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

//         if (classToApply === 'correct') {
//             incrementScore(CORRECT_BONUS);
//         }

//         selectedChoice.parentElement.classList.add(classToApply);

//         setTimeout(() => {
//             selectedChoice.parentElement.classList.remove(classToApply);
//             getNewQuestion();
//         }, 1000);
//     });
// });

// incrementScore = (num) => {
//     score += num;
//     scoreText.innerText = score;
// };
