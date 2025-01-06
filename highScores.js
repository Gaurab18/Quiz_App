const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [] ;

console.log(highScores);

// want to create li which have both score and name
if (highScores.length == 0) {
  highScoresList.innerHTML = "<li>No high scores available.</li>";
}
else{
    highScoresList.innerHTML = highScores.map(score => {
        return `<li class="high-score"> ${score.name} - ${score.score}</li>`;
    }).join("");
}
