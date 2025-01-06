// const username = document.getElementById('username');
// const saveScoreBtn = document.getElementById('saveScoreBtn');
// const finalScore = document.getElementById('finalScore');
// const mostRecentScore = localStorage.getItem('mostRecentScore'); // to store the score in local storage
// // creating highscore variable to store the scores , it store the high score and if there is no score it store empty array
// // local storage have value in form of key and value
// const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
// // json parse convert a json string into a object
// const  MAX_HIGH_SCORES = 5; //we only want 5 scores

// // using finalScore id showing the score
// finalScore.innerText = mostRecentScore;

// username.addEventListener('keyup',() => {
//     saveScoreBtn.disabled = !username.value;  //when there is no value in input field then disable save btn and vice versa
// });

// saveHighScore = e =>{
//     console.log('Save Button Clicked')
//     e.preventDefault(); //prevent default submission of form
//     // creating score object 
//     const score= {
//         // score:Math.floor(Math.random()*100),
//         score: mostRecentScore,
//         name: username.value
//     };
//     // passing the score in highscore
//     highScores.push(score);

// // Sort and keep only top 5 scores
//     highScores.sort((a,b) => b.score - a.score);
//     highScores.splice(5); //to remove after 5 socres
//     // Save back to local storage
//     localStorage.setItem("highScores",JSON.stringify(highScores));
//     console.log(highScores);
//     // Navigate to home
//     // setTimeout(() => {
//         window.location.assign('index.html');//going back to home after saving score
//     // }, 1000);
// };


const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('index.html');
};
