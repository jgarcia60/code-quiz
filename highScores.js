var secondRow = document.getElementById("secondRow");

var scores = localStorage.getItem("scores");
console.log(typeof scores);
console.log(scores.length);

// scores.forEach(logValues);

// function logValues(value) {
//     console.log(value);
// };

// for (var i = scores.length - 1; i >= 0; i--) {
//     var olEl = document.createElement("ol");
//     var liEl = document.createElement("li");
//     liEl.textContent = scores[i];
//     olEl.appendChild(liEl);
//     secondRow.appendChild(olEl);
// }
// secondRow.appendChild(olEl);

//go back to code quiz function
document.getElementById("goBack").addEventListener("click", function() {
    // save scores 
    window.location.href = "index.html";
})

function clearScores() {
    // remove scores 
}