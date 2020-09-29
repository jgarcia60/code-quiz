var secondRow = document.getElementById("secondRow");
var olEl = document.getElementById("olEl");
var clearBtn = document.getElementById("clearScores");

    var scoreArray = JSON.parse(localStorage.getItem("scoreArray"));
    console.log(typeof scoreArray);
    console.log(scoreArray.length);

    // scores.forEach(logValues);

    // function logValues(value) {
    //     console.log(value);
    // };
    var sorted = scoreArray.sort(function(currVal,nextVal) {
        var currScore = currVal.split(' - ')[1]
        var nextScore = nextVal.split(' - ')[1]
        return currScore - nextScore;
    })
    console.log('SORTED ARRAY---> ', sorted);
    for (var i = sorted.length - 1; i >= 0; i--) {
        var liEl = document.createElement("li");
        // var splitArray = sorted[i].split(' - ')
        // var score = splitArray[1];
        // var initials = splitArray[0];
        liEl.textContent = sorted[i];
        olEl.appendChild(liEl);
    }
    
// }
function clearScores() {
    localStorage.removeItem("scoreArray");
    olEl.remove();
}


//go back to code quiz function
document.getElementById("goBack").addEventListener("click", function() {
    // save scores 
    window.location.href = "index.html";
})

clearBtn.addEventListener("click", clearScores);
