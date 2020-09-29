//define all variables
//including user inputs
var header = document.getElementById("questionTitle");
var highScores = document.getElementById("highScores");
var secondRow = document.getElementById("secondRow");
var start = document.getElementById("startButton");
var btnEls = document.getElementById("buttons");
// var scoreInput = document.getElementById("staticEmail");
var interval;
var time = 100;
// var scores = ["JG - 22"];
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
// var scores = [];
// console.log(typeof(scores));
// init();
// function init() {
//     var scoreArray = localStorage.getItem("scores");

//     // if (scores !== null) {
//     //     scores = storedScores;
//     // }
// }

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
    // console.log("You clicked the scores");
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
        var status = document.getElementById("status");
        var grade = document.getElementById("rightOrWrong");
        if (selected == quiz[quizIndex].correctAnswer) {
            
            grade.textContent = "Correct!";
            status.setAttribute("class", "col-md-6 visible");
            
        } else {
            time -= 20;
            document.getElementById("rightOrWrong").textContent = "Wrong!";
            status.setAttribute("class", "col-md-6 visible");
        };
        var timeFade = 1000;
        var vanishEffect = setInterval(function () {
           
            if (timeFade > 0) {
                timeFade -= 1000;
                
            } else {
                clearInterval(vanishEffect);
                status.setAttribute("class", "col-md-6 hidden");
            }
        }, 1000);
        document.getElementById("status").style.display = "block";
        quizIndex++;
        if (quizIndex == 4) {
            clearInterval(interval);
            currentScore = 0;
            questionTitle.textContent = "All done!";
            secondRow.textContent = "Your final score is " + time;
            //code for form to request initials and save score
            createForm();
            document.getElementById("form").addEventListener("submit", submitScore);

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
                // console.log(btn);
                
            }
            // var selected = event.target.getAttribute("id");
            // console.log(selected);
            
        }
    }
};

function createForm() {
    $("#buttons").empty();
    var formEl = document.createElement("form");
    formEl.setAttribute("class", "form-group row");
    formEl.setAttribute("id", "form");
    

    var labelEl = document.createElement("label");
    labelEl.setAttribute("for", "staticEmail");
    labelEl.setAttribute("class", "col-sm-2 col-form-label");
    labelEl.textContent = "Enter initials:";
    formEl.appendChild(labelEl);

    var divInput = document.createElement("div");
    divInput.setAttribute("class", "col-sm-5");
    formEl.appendChild(divInput);

    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("class", "form-control");
    inputEl.setAttribute("id", "inputText");
    divInput.appendChild(inputEl);
    formEl.appendChild(divInput);

    var btnDiv = document.createElement("button");
    btnDiv.setAttribute("type", "submit");
    btnDiv.setAttribute("class", "btn btn-primary mb-2");
    btnDiv.setAttribute("id", "submitButton");
    
    btnDiv.textContent = "Submit";

    formEl.appendChild(btnDiv);

    secondRow.appendChild(formEl);

    // btnDiv.addEventListener("submit", submitScore);
    
}

function submitScore(event){
    
    event.preventDefault();
    if (localStorage.getItem("scoreArray")) {
        var scoreArray = JSON.parse(localStorage.getItem("scoreArray"));
        var scoreText = document.getElementById("inputText").value + " - " + time;
        scoreArray.push(scoreText);
        localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
        window.location.assign("highScores.html");

    } else {
        var scoreArray = [];
        var scoreText = document.getElementById("inputText").value + " - " + time;
        scoreArray.push(scoreText);
        localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
        window.location.assign("highScores.html");
    }

    console.log(typeof scoreArray);
    
    console.log("Variable type of scoreText " + typeof scoreText);

};


start.addEventListener("click", startQuiz);
highScores.addEventListener("click", viewScores); //change to event delegation based on class="viewScores" with
//score submit button and the top left "view highscores" button
