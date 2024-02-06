// // Timer Function 30min
// function startTimer() {
//     let min = 30;
//     let sec = 0;

//     // alert("Starting Exam");

//     const timerInterval = setInterval(function () {
//         if (min == 0 && sec == 0) {
//             clearInterval(timerInterval); // Stop the timer when time reaches 0
//             alert("Exam Ended!!");
//             document.location.href = "dashboard.html";
//         } else {
//             if (sec == 0) {
//                 sec = 59;
//                 min--;
//             } else {
//                 sec--;
//             }

//             document.getElementById("time").textContent = (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
//         }
//     }, 1000);
// }

