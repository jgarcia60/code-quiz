//grab the elements from the html
var secondRow = document.getElementById("secondRow");
var olEl = document.getElementById("olEl");
var clearBtn = document.getElementById("clearScores");

//retrieve the score array from local storage
var scoreArray = JSON.parse(localStorage.getItem("scoreArray"));
// console.log(typeof scoreArray);
// console.log(scoreArray.length);

// this function sorts the array based on the score portion of the string
// i split the string so that the comparator only looks at the score when sorting
var sorted = scoreArray.sort(function(currVal,nextVal) {
    var currScore = currVal.split(' - ')[1]
    var nextScore = nextVal.split(' - ')[1]
    return currScore - nextScore;
})

// this for loop will iterate backwards through the sorted array to 
// place the highest scores first in the list 
console.log('SORTED ARRAY---> ', sorted);
for (var i = sorted.length - 1; i >= 0; i--) {
    var liEl = document.createElement("li");
    
    liEl.textContent = sorted[i];
    
    olEl.appendChild(liEl);
}
    
// removes score array from local storage and removes ordered list elements
//in the highScores.html
function clearScores() {
    localStorage.removeItem("scoreArray");
    olEl.remove();
}


//go back to code quiz page
document.getElementById("goBack").addEventListener("click", function() {
    // save scores 
    window.location.href = "index.html";
})

//event listener for clear scores button
clearBtn.addEventListener("click", clearScores);
