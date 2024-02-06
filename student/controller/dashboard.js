import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
        import { getFirestore, doc, updateDoc, getDoc  } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        async function checkstate() {
            const docRef = doc(db, "SCHEDULE", "Advanced Java Programming"); // Reference to the document

            try {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const code = data.state; // Access the field by its name
                    // document.getElementById("output").innerHTML = code;
                    if (code == "START") {
                        let cnf = confirm("You are about to start test.");
                        if (cnf) {
                            document.location.href = "exam.html";
                        }
                    } else if (code == "END") {
                        alert("You can't start test!");
                    }
                }
            } catch (error) {
                console.error("Error fetching ", error);
            }
        }
        document.getElementById("startExam").addEventListener("click", checkstate);

// 1. Not working - before closing tab or clicking back button event
// document.addEventListener('DOMContentLoaded', function () {
//     // Attach the beforeunload event listener
//     window.addEventListener('beforeunload', function (e) {
//         // Standard-compliant browsers
//         const confirmationMessage = 'Are you sure you want to leave?';
//         e.returnValue = confirmationMessage; // For some older browsers

//         // For modern browsers
//         return confirmationMessage;
//     });
// });

// 2.
// window.addEventListener('beforeunload', function (e) {
//     const confirmationMessage = 'Are you sure you want to leave?';
//     e.returnValue = confirmationMessage; // Standard for some older browsers
//     return confirmationMessage; // For modern browsers
// });

// 3.
// window.onbeforeunload = function() {
//     return "Are you sure you want to leave?";
// };

// To disable right click and f12
// Disable right-click
// document.addEventListener('contextmenu', function (e) {
//     e.preventDefault();
// });

// Disable F12 key
// document.addEventListener('keydown', function (e) {
//     if (e.key === 'F12') {
//         e.preventDefault();
//     }
// });

window.addEventListener('popstate', function (event) {
    // Your custom logic here
    alert('Back or forward button clicked!');
  });

// Logout Button
function openHomePage() {
    let logout = confirm("Confirm Logout");

    if (logout) {
        window.history.pushState(null, '', window.location.href);
        document.location.href = "../../index.html";
    }
}

document.getElementById("logoutBtn").addEventListener("click", openHomePage);

// Not working back button clicked
// window.addEventListener('popstate', function(event) {
    // This function will be called when the user clicks the back button
    // console.log('Back button clicked');
    // You can add your own code here to handle the back button click
    // let ans = this.confirm("Are you sure, you want to leave?");

    // if (ans) {
        // document.location.href = "home.html"
    // }
// });

// Dynamically changing color of clicked button
function openSubjectDetails(subject) {
    document.getElementById("ajpBtn").style.backgroundColor = '#ffc107';
    document.getElementById("noExam").style.display = 'none';
    document.getElementById("examDetails").style.display = 'flex';
}

document.getElementById("ajpBtn").addEventListener("click", function() {
    openSubjectDetails("ajp");
});

window.onload = function() {
    document.getElementById("studentName") = studName;
}

// window.onbeforeunload = function() { return "Your work will be lost."; };

// window.onload = function() {
//     window.history.forward();
//     document.onkeydown = function(e) {
//         if (event.keyCode == 116) {
//             window.history.forward();
//         }
//     }
// }

document.getElementById("studentName").innerHTML = localStorage.getItem("studName");

window.onload = function() {
    localStorage.removeItem('examTimer'); // Clear the stored timer values
    // Check if "studName" exists in localStorage
    if (!localStorage.getItem("studName")) {
        // Redirect to a different page
        window.location.href = "../../index.html";
    }
}

let flag1 = parseInt(localStorage.getItem("flag1")) || 0;

window.onload = function() {
    localStorage.setItem("flag1", flag1 + 1);

    if (flag1 > 0) {
        // Redirect to home page
        document.location.href = "../../index.html";
    }
};