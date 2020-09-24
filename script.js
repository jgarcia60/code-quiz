//define all variables
//including user inputs
var highScores = document.getElementById("highScores");
var start = document.getElementById("startButton");
var interval;
var time = 100;
var questionWrong = false;


//function for timer (start quiz)
//if timer runs out, quiz is over
//if all questions are submitted, quiz is over
//save score

function startTimer() {
    if (time == 0) {
        //game over
    }
    interval = setInterval(function(){
        time--;
        document.getElementById("time").textContent = "Time: " + time;
        if (questionWrong) {
            if (time >= 10) {
                //game over
            } else {
                time -= 10;
            }
        }
    }, 1000);
}

function viewScores() {
    console.log("You clicked the scores");
}

//function for event delegation (matches button)
//   that decrements the time if question is incorrect
//   update score to local storage

start.addEventListener("click", startTimer);
highScores.addEventListener("click", viewScores);