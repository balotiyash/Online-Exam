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

window.addEventListener('popstate', function (event) {
    // Your custom logic here
    alert('Back or forward button clicked!');
  });


// To open appropriate Login Form
function openLogin(role) {
    if (role === 'student') {
        document.getElementById("studDiv").hidden = false;
        document.getElementById("staffDiv").hidden = true;
    } else if (role === 'admin') {
        document.getElementById("studDiv").hidden = true;
        document.getElementById("staffDiv").hidden = false;
    }

    document.querySelector(".popup").classList.add("active");
    document.getElementById("mainSec").style.opacity = 0.3;

    document.querySelector(".popup .close-btn").addEventListener("click", function() {
        document.querySelector(".popup").classList.remove("active");
        document.getElementById("mainSec").style.opacity = 1;
        enrollment.value = "";
        studName.value = "";
        testCode.value = "";
        btnTxt.textContent = "Verify";
    });
}

document.getElementById("studBtn").addEventListener("click", function() {
    openLogin("student");
});

document.getElementById("adminBtn").addEventListener("click", function() {
    openLogin("admin");
});


let enrollment, btnTxt, studName, pracMode, testCode, testCodeLabel;
let verifyCnt;

// To Verify first and then login
// function openDashboard(attempt) {
//     if (attempt == 'student') {
//         enrollment = document.getElementById("enroll");
//         btnTxt = document.getElementById("loginBtn");
//         studName = document.getElementById("studNameTxt");
//         testCode = document.getElementById("testCode");
    
//         btnTxt.textContent = "Verify";
        
//         if (enrollment.value == 2200040221) {
//             studName.value = "YASH LAXMAN BALOTIYA";
//             testCode.disabled = false;
//             btnTxt.textContent = "Sign in";
//             // verifyCnt = attempt;
    
//             if (testCode.value == '0004') {
//                 document.location.href = "dashboard.html";
//             }
//         }
//     } else if (attempt == 'admin') {
//         let uname = document.getElementById('uname').value;
//         let pass = document.getElementById('passTxt').value;

//         if (uname == 'VESP' && pass == 'VESP-OEP') {
//             document.location.href = 'admin.html'
//         }
//     }
// }

function staffLogin() {
    let uname = document.getElementById('uname').value;
    let pass = document.getElementById('passTxt').value;

    if (uname == 'VESP' && pass == 'VESP0004') {
        document.location.href = 'admin/view/admin.html'
    }
}

document.getElementById("staffLoginBtn").addEventListener("click", staffLogin);

// To login as Practice mode
// function practiceMode() {
//     pracMode = document.getElementById("practice");
//     testCode = document.getElementById("testCode");
//     testCodeLabel = document.getElementById("testCodeLbl");

//     if (pracMode.checked == true) {
//         testCode.hidden = true;
//         testCodeLabel.hidden = true;
//     } else {
//         testCode.hidden = false;
//         testCodeLabel.hidden = false;
//     }
// }

// window.location.replace('home.html');

// window.onload = function() {
//     window.history.forward();
//     document.onkeydown = function(e) {
//         if (event.keyCode == 116) {
//             window.history.forward();
//         }
//     }
// }

window.onload = function() {
    localStorage.clear();
}