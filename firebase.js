// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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


// let studName;
// Function to fetch student name based on enrollment number
async function fsn() {
    const loginBtn = document.getElementById("loginBtn");
    const testCode = document.getElementById("testCode");

    // Show loading message
    loginBtn.textContent = "Fetching data, please wait...";

    // Get the enrollment number from the input field
    const enrollmentNumber = document.getElementById("enroll").value;

    // Query the Firestore database
    const docRef = doc(collection(db, "StudentInfo/CO-A/Third Year"), enrollmentNumber);

    try {
        // Retrieve the document from Firestore
        const docSnap = await getDoc(docRef);

        // Check if the document exists
        if (docSnap.exists()) {
            // Display the student name
            const studName = docSnap.data().name;
            document.getElementById("studNameTxt").value = studName;
            localStorage.setItem("studName", studName);

            // Enable the testCode field
            testCode.disabled = false;

            // Update button text and add event listener
            loginBtn.textContent = "Sign in";
            loginBtn.addEventListener("click", login);
        } else {
            // Display an error message if the document doesn't exist
            document.getElementById("studNameTxt").value = studentNotFound;

            // Reset button text and remove event listener
            loginBtn.textContent = "Sign in";
            loginBtn.removeEventListener("click", login);
        }
    } catch (error) {
        console.error("Error fetching data:", error);

        // Handle error: Display an appropriate error message to the user
        document.getElementById("studNameTxt").value = "Error fetching data. Please try again later.";

        // Reset button text and remove event listener
        // loginBtn.textContent = "Sign in";
        loginBtn.textContent = "Fetch Student Name";
        loginBtn.removeEventListener("click", login);
    }
}


// Add an event listener to the button
document.getElementById("loginBtn").addEventListener("click", fsn);

async function login() {
    const testCodeValue = document.getElementById("testCode").value;
    const docRef = doc(db, "Test Code/Code value"); // Reference to the document

    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const code = data.code;
            if(code==testCodeValue) {
                document.location.href="student/view/dashboard.html";
            } else {
                alert("Incorrect test code !");
            }

        } else {
            // console.log("No such document!");
            alert("Student Record not Found.");
        }
    } catch (error) {
        console.error("Error getting document:", error);
    }
}