// Function to create or refresh the table dynamically
function displayStudentDetails() {

    document.getElementById('coBtn').style.backgroundColor = '#ffc107';

    // Get the div element
    var studDetailsDiv = document.getElementById('studDetailsDiv');

    // Remove any existing tables inside the div
    studDetailsDiv.innerHTML = '';

    // Create the table element
    var table = document.createElement('table');

    // Create the table header
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    var headers = ['Roll No.', 'Enrollment No.', 'Student Name', 'Status', 'Reset Exam'];

    headers.forEach(function (headerText) {
        var th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create the table body with 25 rows (adjust as needed)
    var tbody = document.createElement('tbody');

    for (var i = 1; i <= 25; i++) {
        var tr = document.createElement('tr');

        // Sample data (you can replace this with your actual data)
        var data = ['CO6IA - ' +  ((i.toString().length == 1) ? '0' + i : i), 2100040153 + i, 'Student ' + (i), 'Allowed', ''];

        data.forEach(function (cellText, index) {
            var td = document.createElement('td');

            // For the "Status" column, create a select element with options
            if (index === 3) {
                var select = document.createElement('select');
                var options = ['Allowed', 'Blocked'];

                options.forEach(function (optionText) {
                    var option = document.createElement('option');
                    option.value = optionText.toLowerCase();
                    option.textContent = optionText;
                    select.appendChild(option);
                });

                td.appendChild(select);
            } else {
                td.textContent = cellText;
            }

            // For the "Reset Exam" column, create an input button
            if (index === 4) {
                var button = document.createElement('input');
                button.type = 'button';
                button.value = 'Reset Exam';
                button.id = 'resetBtn';
                td.appendChild(button);
            }

            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);

    // Append the table to the div
    studDetailsDiv.appendChild(table);
}

// Call the function to create the table
// createTable();

function displayBranches() {
    // document.getElementById('branch').style.display = 'flex';
    document.getElementById('branch').style.display = 'block';
    document.getElementById('noActTxt').style.display = 'none';
    document.getElementById('ty').style.backgroundColor = '#ffc107'
    // document.getElementById('branch').style.alignContent = 'center';
}

function openHomePage() {
    let logout = confirm("Confirm Logout");

    if (logout) {
        document.location.href = "../../index.html";
    }
}