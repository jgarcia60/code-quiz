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




function startQuiz() {
    
    interval = setInterval(function(){
        if (time == 0) {
            clearInterval(interval);
            currentScore = 0;
            questionTitle.textContent = "All done!";
            secondRow.textContent = "Please enter your initials and save your score!";
            //code for form to request initials and save score
        }
        $("startButton").remove();
        time--;
        document.getElementById("time").textContent = "Time: " + time;
                
    }, 1000);  

    $("#buttons").empty();
        
    // only setting first question up in here with creating elements.
    // after this, each created button element will just be updated 
    if (quizIndex == 0) {
        secondRow.textContent = quiz[0].question;
        // console.log(quiz[0].question);
        var ol = document.createElement("ol");
        ol.setAttribute("id", "ol");
        //not sure if this for loop will work or if i can use quiz[i].question.answers
        for (var j = 0; j < quiz[quizIndex].answers.length; j++) {
            // create list elements and button elements 
            var li = document.createElement("li");
            var btn = document.createElement("button");

            // setting an id to act as the index 
            btn.setAttribute("id", j);

            // btn.setAttribute("data-index", j);
            btn.textContent = quiz[quizIndex].answers[j];

            li.appendChild(btn);
            ol.appendChild(li);
            
        }
        buttons.appendChild(ol);
    }

    ol.addEventListener("click", nextQuestion);
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
  
    if(event.target.matches("button")) {
    
        // Check the clicked-button's id and compare with the 
        // correct answer
        var selected = event.target.getAttribute("id");
        if (selected == quiz[quizIndex].correctAnswer) {
            var status = document.getElementById("rightOrWrong");
            status.textContent = "Correct!";
        } else {
            time -= 10;

            var status = document.getElementById("rightOrWrong");
            status.textContent = "Wrong!";
        };
        document.getElementById("status").style.display = "block";
        quizIndex++;
        if (quizIndex == 4) {
            clearInterval(interval);
            currentScore = 0;
            questionTitle.textContent = "All done!";
            secondRow.textContent = "Please enter your initials and save your score!";
            //code for form to request initials and save score
        } else {
            // go to next question when an answer is clicked
            secondRow.textContent = quiz[quizIndex].question;
            // var j = 0; 
            // while (j < 4) {
            for (var j = 0; j < 4; j++) {
                // grab each button by id to change the current multiple 
                // choice answer to the updated question
                var btn = document.getElementById(j);
                btn.textContent = quiz[quizIndex].answers[j];
                console.log(btn);
                
            }
            // var selected = event.target.getAttribute("id");
            // console.log(selected);
            
        }
        
        
    }
};


start.addEventListener("click", startQuiz);
highScores.addEventListener("click", viewScores);
// document.getElementById("ol").addEventListener("click", nextQuestion);
