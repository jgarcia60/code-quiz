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
var quizIndex = 0;
var currentScore;
var quiz = [
    {
        question: "Which of the following are valid JavaScript data types?",
        answers: [
            "Boolean",
            "String",
            "Number",
            "All of the above",
        ], 
        correctAnswer: 3
    },

    {
        question: "What is the correct syntax for including a JavaScript file named content.js with a script tag in the head of an HTML file, where both files are in the same local directory?",
        answers: [
            "<script src=\"content.js\" type=\"text/javascript\" />",
            "<link href=\"content.js\" rel=\"script/javascript\" type=\"javascript\" />",
            "<script src=\"content.js\" type=\"text/javascript\"></script>",
            "<script src=\"content.js\" type=\"javascript\"></script>",
        ],
        correctAnswer: 2
    },
    {
        question: "Given the array arr = [4, 7, 3, 9], what would arr[arr.length] output?",
        answers: [
            "9",
            "undefined",
            "-1",
            "3"
        ],
        correctAnswer: 1
    },
    {
        question: "The condition in an if/else statement is enclosed by ______.",
        answers: [
            "{}",
            "()",
            "[]",
            "<>"
        ],
        correctAnswer: 1
    },

];
console.log(quiz[0].question);
console.log(quiz[1].answers[2]);

var sc
//function for timer (start quiz)
//if timer runs out, quiz is over
//if all questions are submitted, quiz is over
//save score

function startQuiz() {
    if (time == 0) {
        clearInterval(interval);
        currentScore = 0;
        questionTitle.textContent = "All done!";
        //code for form to request initials and save score
    }
    interval = setInterval(function(){
        $("startButton").remove();
        time--;
        document.getElementById("time").textContent = "Time: " + time;
        //probably want this if/else outside of the interval. needs to go on the event listener for each question
        if (questionWrong) {
            if (time <= 15) {
                //game over
            } else {
                time -= 15;
            }
        }


        
    }, 1000);  

    $("#buttons").empty();
        // $("startButton").remove();
        // start.setAttribute("display", none);
        secondRow.textContent = quiz[0].question;
        var ol = document.createElement("ol");
            //not sure if this for loop will work or if i can use quiz[i].question.answers
        for (var j = 0; j < quiz[0].answers.length; j++) {
            // changing start button to the first answer 
            // if (j == 0) {
            //     var li = document.createElement("li");
            //     start.textContent = quiz[quizIndex].answers[j];
            //     li.append(start);
            //     start.setAttribute("index", j);
            //     ol.appendChild(li);
            //     continue;
            // }
            var li = document.createElement("li");
            var btn = document.createElement("button");

            btn.setAttribute("index", j);
            btn.textContent = quiz[0].answers[j];

            li.appendChild(btn);
            ol.appendChild(li);
        }
        buttons.appendChild(ol);
        quizIndex++;
        btnEls.addEventListener("click", nextQuestion);
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

function nextQuestion(event) {
    // $("#buttons").empty();
    if(event.target.matches("button")) {
        $("#buttons").empty();
        //check the data-index attribute of the button and compare
        //with the index of the answer
        // start.setAttribute("display", "none");
        
        secondRow.textContent = quiz[quizIndex].question;
        var ol = document.createElement("ol");
            //not sure if this for loop will work or if i can use quiz[i].question.answers
        for (var j = 0; j < quiz[quizIndex].answers.length; j++) {
            // changing start button to the first answer 
            // if (j == 0) {
            //     var li = document.createElement("li");
            //     start.textContent = quiz[quizIndex].answers[j];
            //     li.append(start);
            //     start.setAttribute("index", j);
            //     ol.appendChild(li);
            //     continue;
            // }
            var li = document.createElement("li");
            var btn = document.createElement("button");

            btn.setAttribute("index", j);
            btn.textContent = quiz[quizIndex].answers[j];

            li.appendChild(btn);
            ol.appendChild(li);
        }
        buttons.appendChild(ol);

        quizIndex++;
        btnEls.addEventListener("click", nextQuestion(quizIndex));
    }
};


start.addEventListener("click", startQuiz);
highScores.addEventListener("click", viewScores);
