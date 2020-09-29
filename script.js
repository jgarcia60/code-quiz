//define all variables
//including user inputs
var header = document.getElementById("questionTitle");
var highScores = document.getElementById("highScores");
var secondRow = document.getElementById("secondRow");
var start = document.getElementById("startButton");
var btnEls = document.getElementById("buttons");
// var scoreInput = document.getElementById("staticEmail");
var interval;
// initialize time 
var time = 100;
var questionWrong = false;
var quizIndex = 0;
var currentScore;

// define the quiz array of objects 
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
            "{ }",
            "( )",
            "[ ]",
            "< >"
        ],
        correctAnswer: 1
    },

];
function startQuiz() {
    // sets up time interval for quiz 
    interval = setInterval(function(){
        if (time == 0) {
            clearInterval(interval);
            currentScore = 0;
            // changes text to reflect quiz is over 
            questionTitle.textContent = "All done!";
            secondRow.textContent = "Please enter your initials and save your score!";
        }
        //removes start button so i can place the multiple choice answers
        $("startButton").remove();
        time--;
        document.getElementById("time").textContent = "Time: " + time;
                
    }, 1000);  

    $("#buttons").empty();
        
    // only setting first question up in here with creating elements.
    // after this, each created button element will just be updated 
    if (quizIndex == 0) {
        questionTitle.textContent = "";
        secondRow.textContent = quiz[0].question; //was secondRow.
        secondRow.setAttribute("class", "col-md-6 question");
        var ol = document.createElement("ol");
        ol.setAttribute("id", "ol");
        //not sure if this for loop will work or if i can use quiz[i].question.answers
        for (var j = 0; j < quiz[quizIndex].answers.length; j++) {
            // create list elements and button elements 
            var li = document.createElement("li");
            var btn = document.createElement("button");

            // setting an id to act as the index 
            btn.setAttribute("id", j);
            btn.textContent = quiz[quizIndex].answers[j];

            li.appendChild(btn);
            ol.appendChild(li);
            
        }
        buttons.appendChild(ol);
    }
// add event listener for the ordered list elements, event delegation
    ol.addEventListener("click", nextQuestion);
}

//redirects to the high scores web page
function viewScores() {
    window.location.href = "highScores.html";
}

//function for event delegation (matches button)
//   that decrements the time if question is incorrect
//   update score to local storage

function nextQuestion(event) {
    // only do this code if it is a li element button 
    if(event.target.matches("button")) {
    
        
        var selected = event.target.getAttribute("id");
        var status = document.getElementById("status");
        var grade = document.getElementById("rightOrWrong");
        // Check the clicked-button's id and compare with the 
        // correct answer
        if (selected == quiz[quizIndex].correctAnswer) {
            grade.textContent = "Correct!";
            // this toggles the class for changing visibility 
            status.setAttribute("class", "col-md-6 visible");
        } else {
            //time penalty for wrong answer
            time -= 20;
            document.getElementById("rightOrWrong").textContent = "Wrong!";
            status.setAttribute("class", "col-md-6 visible");
        };
        // this interval is for the vanishing correct/wrong status 
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
        // updates the quiz index for the next question 
        // when it reaches the end of the quiz, it will end the interval 
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
            secondRow.textContent = quiz[quizIndex].question; //was secondRow.
            
            for (var j = 0; j < 4; j++) {
                // grab each button by id to change the current multiple 
                // choice answer to the updated question
                var btn = document.getElementById(j);
                btn.textContent = quiz[quizIndex].answers[j];            
            }   
        }
    }
};

// this creates the form for score submission 
function createForm() {
    // clear buttons for new list 
    $("#buttons").empty();
    var formEl = document.createElement("form");
    formEl.setAttribute("class", "form-group row");
    formEl.setAttribute("id", "form");
    
    // creates and appends label element 
    var labelEl = document.createElement("label");
    labelEl.setAttribute("for", "staticEmail");
    labelEl.setAttribute("class", "col-sm-4 col-form-label");
    labelEl.textContent = "Enter initials:";
    formEl.appendChild(labelEl);

    // creates a div for bootstrap container purposes 
    var divInput = document.createElement("div");
    divInput.setAttribute("class", "col-sm-5");
    formEl.appendChild(divInput);

    // creates and appends the input element for the form 
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("class", "form-control");
    inputEl.setAttribute("id", "inputText");
    divInput.appendChild(inputEl);
    formEl.appendChild(divInput);

    // creates and appends the submit button 
    var btnDiv = document.createElement("button");
    btnDiv.setAttribute("type", "submit");
    btnDiv.setAttribute("class", "btn btn-primary mb-2");
    btnDiv.setAttribute("id", "submitButton");
    
    btnDiv.textContent = "Submit";

    formEl.appendChild(btnDiv);

    secondRow.appendChild(formEl);
    
}

function submitScore(event){
    // avoid refreshing page 
    event.preventDefault();
    // check if score Array exists, then creates new array or retrieves current
    //based on condition
    if (localStorage.getItem("scoreArray")) {
        var scoreArray = JSON.parse(localStorage.getItem("scoreArray"));
        //save user input
        var scoreText = document.getElementById("inputText").value + " - " + time;
        // push new answer to current array 
        scoreArray.push(scoreText);
        // set new array to local storage 
        localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
        // go to high scores page 
        window.location.assign("highScores.html");

    } else { //same thing as if condition but creates new empty array
        var scoreArray = [];
        var scoreText = document.getElementById("inputText").value + " - " + time;
        scoreArray.push(scoreText);
        localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
        window.location.assign("highScores.html");
    }
    // console.log(typeof scoreArray);
    // console.log("Variable type of scoreText " + typeof scoreText);

};

//starts quiz
start.addEventListener("click", startQuiz);
highScores.addEventListener("click", viewScores); //change to event delegation based on class="viewScores" with
//score submit button and the top left "view highscores" button
