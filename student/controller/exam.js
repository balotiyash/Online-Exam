// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: firebaseAPI.apiKey,
    authDomain: firebaseAPI.authDomain,
    projectId: firebaseAPI.projectId,
    storageBucket: firebaseAPI.storageBucket,
    messagingSenderId: firebaseAPI.messagingSenderId,
    appId: firebaseAPI.appId,
    measurementId: firebaseAPI.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Arrays containing questions and related data
let questionNumbers = [];
let questions = [];
let correctanswer = [];
let options1 = [];
let options2 = [];
let options3 = [];
let options4 = [];
let selectedanswer = [];
const questionSetRef = collection(db, 'Questions', 'EST', 'Question Set');


async function fetchRandomQuestions() {
    try {
        const querySnapshot = await getDocs(questionSetRef);
        const totalDocuments = querySnapshot.size;
        console.log(`Total number of documents in Question Set: ${totalDocuments}`);
        
        // Get document data and push it into arrays
        querySnapshot.forEach(doc => {
            const data = doc.data();
            questionNumbers.push(doc.id);
            questions.push(data.question);
            correctanswer.push(data.correctanswer);
            options1.push(data.option1);
            options2.push(data.option2);
            options3.push(data.option3);
            options4.push(data.option4);
        });

        // Shuffle arrays to get random questions
        shuffleArrays();

        // Select first 20 questions
        questionNumbers = questionNumbers.slice(0, 20);
        questions = questions.slice(0, 20);
        correctanswer = correctanswer.slice(0, 20);
        options1 = options1.slice(0, 20);
        options2 = options2.slice(0, 20);
        options3 = options3.slice(0, 20);
        options4 = options4.slice(0, 20);

        console.log("Randomly selected questions:", questions);
        console.log("Question numbers:", questionNumbers);
        console.log("Correct answers:", correctanswer);
        console.log("Options 1:", options1);
        console.log("Options 2:", options2);
        console.log("Options 3:", options3);
        console.log("Options 4:", options4);
    } catch (error) {
        console.error('Error getting documents: ', error);
    }
}

// Function to shuffle arrays
function shuffleArrays() {
    for (let i = questionNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questionNumbers[i], questionNumbers[j]] = [questionNumbers[j], questionNumbers[i]];
        [questions[i], questions[j]] = [questions[j], questions[i]];
        [correctanswer[i], correctanswer[j]] = [correctanswer[j], correctanswer[i]];
        [options1[i], options1[j]] = [options1[j], options1[i]];
        [options2[i], options2[j]] = [options2[j], options2[i]];
        [options3[i], options3[j]] = [options3[j], options3[i]];
        [options4[i], options4[j]] = [options4[j], options4[i]];
    }
}

// Fetch random questions


// Function to randomly select questions
async function fetchRandomQuestions2() {
    try {
        // Assume arrays are populated here

        // Loop through the arrays to transfer data to Firestore
        for (let i = 0; i < questionNumbers.length; i++) {
            const questionNo = questionNumbers[i];
            const questionData = {
                question: questions[i],
                correctanswer: correctanswer[i],
                option1: options1[i],
                option2: options2[i],
                option3: options3[i],
                option4: options4[i]
            };

            // Reference to the document in Firestore
            const documentRef = doc(db, 'Student Questions/2200040211/EST', questionNo);

            // Set data in Firestore document
            await setDoc(documentRef, questionData);
            console.log(`Data for question ${questionNo} transferred successfully.`);
        }
        console.log("All data transferred to Firestore.");
    } catch (error) {
        console.error('Error transferring data to Firestore: ', error);
    }
}

fetchRandomQuestions().then(() => {
    fetchRandomQuestions2();
});

window.addEventListener("load", myInit, true); function myInit(){ fetchRandomQuestions(); startTimer(); };


let timerInterval;
// Timer Function 30min
function startTimer() {
    let min;
    let sec;

    // Check if there are stored values in local storage
    if (localStorage.getItem('examTimer')) {
        const storedTime = JSON.parse(localStorage.getItem('examTimer'));
        min = storedTime.min;
        sec = storedTime.sec;
    } else {
        min = 30;
        sec = 0;
        localStorage.setItem('examTimer', JSON.stringify({ min, sec }));
    }

    timerInterval = setInterval(function () {
        if (min == 0 && sec == 0) {
            clearInterval(timerInterval);
            alert("Exam Ended!!");
            localStorage.removeItem('examTimer'); // Clear the stored timer values
            document.location.href = "dashboard.html";
        } else {
            if (sec == 0) {
                sec = 59;
                min--;
            } else {
                sec--;
            }

            // Update the display
            document.getElementById("time").textContent = (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;

            // Store the current timer values in local storage
            localStorage.setItem('examTimer', JSON.stringify({ min, sec }));
        }
    }, 1000);
}

// Call the startTimer function when the window loads
window.onload = startTimer;

document.getElementById("question").style.display = "none";
document.getElementById("ans").style.display = "none";

setTimeout(function() {
    document.getElementById("question").style.display = "block";
    document.getElementById("ans").style.display = "block";
    document.getElementById("saval").innerHTML = questions[0];
    document.getElementById("rad1").innerHTML = "A. " + options1[0];
    document.getElementById("rad2").innerHTML = "B. " + options2[0];
    document.getElementById("rad3").innerHTML = "C. " + options3[0];
    document.getElementById("rad4").innerHTML = "D. " + options4[0];
}, 1000);

function fetchQuestions(qno) {
    document.getElementById("saval").innerHTML = questions[qno - 1];
}

for (let i = 1; i <= 20; i++) {
    document.getElementById(`btn${i}`).addEventListener("click", function() {
        fetchQuestions(i);
        fetchOptionA(i);
        fetchOptionB(i);
        fetchOptionC(i);
        fetchOptionD(i);

        document.getElementById("a").checked = false;
        document.getElementById("b").checked = false;
        document.getElementById("c").checked = false;
        document.getElementById("d").checked = false;
    });
}

function fetchOptionA(num) {
    document.getElementById("rad1").innerHTML = "A. " + options1[num - 1];
}
function fetchOptionB(num) {
    document.getElementById("rad2").innerHTML = "B. " + options2[num - 1];
}
function fetchOptionC(num) {
    document.getElementById("rad3").innerHTML = "C. " + options3[num - 1];
}
function fetchOptionD(num) {
    document.getElementById("rad4").innerHTML = "D. " + options4[num - 1];
}

// To verify that the student do not attempt to open a new tab or window
// let pageChangeAttempt = 0;
// document.addEventListener("visibilitychange", function() {
//     // document.title = document.visibilityState;
//     // console.log(document.visibilityState);
//     if (document.visibilityState == "hidden") {
//         pageChangeAttempt++;
//         alert("1st and last warning");
//     }

//     if (pageChangeAttempt >= 2) {
//         alert("Exam Terminated");
//         document.location.href = "home.html";
//     }
// });

// To disable right click and f12
// Disable right-click
// document.addEventListener('contextmenu', function (e) {
//     e.preventDefault();
// });

// Disable F12 key
document.addEventListener('keydown', function (e) {
    if (e.key === 'F12') {
        e.preventDefault();
    }
});

/* Notworking
// function forceLandscapeOrientation() {
//     if (screen.orientation && screen.orientation.lock) {
//         // Attempt to lock the screen orientation to landscape
//         screen.orientation.lock('landscape').then(function() {
//             console.log('Screen orientation set to landscape');
//         }).catch(function(error) {
//             console.error('Unable to set screen orientation:', error);
//         });
//     } else {
//         console.warn('Screen orientation API not supported');
//     }
// }

// Call the function when the @media query matches (e.g., when the screen width is below a certain value)
// if (window.matchMedia("(max-width: 500px)").matches) {
//     forceLandscapeOrientation();
// }

// window.addEventListener('orientationchange', function () {
//     if (window.orientation === 0) {
//         // Portrait orientation
//         document.getElementById('orientationMessage').style.display = 'block';
//     } else {
//         // Landscape orientation
//         document.getElementById('orientationMessage').style.display = 'none';
//     }
// });

// document.addEventListener('DOMContentLoaded', function () {
//     checkDisplayWidth();

//     // Attach an event listener to handle changes in orientation
//     window.addEventListener('orientationchange', checkDisplayWidth);
// });

// function checkDisplayWidth() {
//     // Get the current width of the display
//     const displayWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

//     // You can set a threshold width and show a message if the width is below it
//     const thresholdWidth = 600; // Set your desired threshold

//     const orientationMessage = document.getElementById('orientationMessage');

//     if (displayWidth < thresholdWidth) {
//         orientationMessage.style.display = 'block';
//         document.getElementById("mainContainer").style.display = 'none';
//     } else {
//         orientationMessage.style.display = 'none';
//     }
// }
*/

// To verify that this page should not open in any mobile devices
document.addEventListener('DOMContentLoaded', function () {
    checkDisplayWidth();

    // Attach an event listener to handle changes in orientation or resize
    window.addEventListener('resize', checkDisplayWidth);
});

function checkDisplayWidth() {
    // Get the current width of the display
    const displayWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    // You can set a threshold width and show a message if the width is below it
    const thresholdWidth = 600; // Set your desired threshold

    const orientationMessage = document.getElementById('orientationMessage');

    if (displayWidth < thresholdWidth) {
        orientationMessage.style.display = 'block';
        document.getElementById("mainContainer").style.display = 'none';
    } else {
        orientationMessage.style.display = 'none';
        document.getElementById("mainContainer").style.display = 'flex';
    }
}

document.getElementById("studentName").innerHTML = localStorage.getItem("studName");










document.getElementById("endBtn").addEventListener("click", function() {
    let cfm = confirm("End Exam?");
    if (cfm) {
        clearInterval(timerInterval);
        alert("Exam Ended!!");
        localStorage.removeItem('examTimer'); // Clear the stored timer values
        document.location.href = "dashboard.html";
    }
});

// MCQ exam page
let flag2 = parseInt(localStorage.getItem("flag2")) || 0;

window.onload = function() {
    localStorage.setItem("flag2", flag2 + 1);

    // if (flag2 > 0) {
    //     // Redirect to home page
    //     document.location.href = "../../index.html";
    // }

    if (!localStorage.getItem("studName")) {
        document.location.href = "../../index.html";
    }
};