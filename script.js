//define all variables
//including user inputs
var header = document.getElementById("questionTitle");
var highScores = document.getElementById("highScores");
var secondRow = document.getElementById("secondRow");
var start = document.getElementById("startButton");
var btnEls = document.getElementById("buttons");
var interval;
var time = 100;
var scores = ["JG - 22"];
var questionWrong = false;
var quiz = [
    {
        question: "Which of the following are valid JavaScript data types?",
        answers: {
            a: "Boolean",
            b: "String",
            c: "Number",
            d: "All of the above",
        }, 
        correctAnswer: "d"
    },

    {
        question: "What is the correct syntax for including a JavaScript file named content.js with a script tag in the head of an HTML file, where both files are in the same local directory?",
        answers: {
            a: "<script src=\"content.js\" type=\"text/javascript\" />",
            b: "<link href=\"content.js\" rel=\"script/javascript\" type=\"javascript\" />",
            c: "<script src=\"content.js\" type=\"text/javascript\"></script>",
            d: "<script src=\"content.js\" type=\"javascript\"></script>",
        },
        correctAnswer: "c"
    },
    {
        question: "Given the array arr = [4, 7, 3, 9], what would arr[arr.length] output?",
        answers: {
            a: "9",
            b: "undefined",
            c: "-1",
            d: "3"
        },
        correctAnswer: "b"
    },
    {
        question: "The condition in an if/else statement is enclosed by ______.",
        answers: {
            a: "{}",
            b: "()",
            c: "[]",
            d: "<>"
        },
        correctAnswer: "b"
    },

];

var sc
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
            if (time <= 10) {
                //game over
            } else {
                time -= 10;
            }
        }
    }, 1000);
}

//go back to code quiz function
function goBack() {

}

//for a split second shows the correct words but quickly defaults back to original html content
function viewScores() {
    console.log("You clicked the scores");
    header.textContent = "High Scores";
    var listOfScores = document.createElement("ol");
    for (var i = 0; i < scores.length; i++) {
        var li = document.createElement("li");
        li.textContent = scores[i];
        listOfScores.appendChild(li);
    }
    
    secondRow.appendChild(listOfScores);

}

//function for event delegation (matches button)
//   that decrements the time if question is incorrect
//   update score to local storage

start.addEventListener("click", startTimer);
highScores.addEventListener("click", viewScores);