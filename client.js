//stretch stuff: error on empty inputs
//sortable table? barf. tried looking at bootstrap-table, and i just don't know what to import.
//bottom table row to only show if there are actual rows? maybe do a check children of table and see if tbody exists?

$(document).ready(readyNow);
$(document).keypress(function (event) {
    if (event.key === "Enter") {
        submitButton();
    }
}); //this works but I'm not sure if there are better ways to do this?

let totalSalary = 0;

function readyNow() {
    //event listeners
    $('#submitButton').on('click', submitButton);
    //delete listener
    $('#tableBody').on('click', '.deleteButton', deleteButton);
}

function submitButton() {
    // console.log('Clicked submit');
    if (!$('#firstName').val() || !$('#lastName').val() || !$('#employeeID').val() || !$('#title').val() || !$('#annualSalary').val()) {
        // console.log('Empty inputs!!'); //check if any input is empty
        $('#helpfulTextToDOM').css('color', '#DC3545'); //notification text to red. Specifically the red of the bootstrap button style
        $('#helpfulTextToDOM').text('One or more fields are empty. Please enter valid inputs for each field.'); //notify user of empty fields.. possibly rename for user clarity
        return false; //end function
    } else if ($('#annualSalary').val() < 0) {
        //check if salary is positive
        $('#helpfulTextToDOM').css('color', '#DC3545'); //notification text to red
        $('#helpfulTextToDOM').text('Annual Salary cannot be less than zero. Please enter a valid Annual Salary.'); //notify user of empty fields.. possibly rename for user clarity
        return false; //end function
    } else if ($('#employeeID').val() < 0) {
        //check if employee ID is positive
        $('#helpfulTextToDOM').css('color', '#DC3545'); //notification text to red
        $('#helpfulTextToDOM').text('Employee ID cannot be less than zero. Please enter a valid Empolyee ID.'); //notify user of empty fields.. possibly rename for user clarity
        return false; //end function
    }
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let employeeID = $('#employeeID').val();
    let title = $('#title').val();
    let annualSalaryVal = $('#annualSalary').val(); //grab the full number
    let annualSalary = parseFloat(annualSalaryVal).toLocaleString(); //add some commas
    $('#tableBody').append(`<tr class="employeeRow">
                                <td>${firstName}</td>
                                <td>${lastName}</td>
                                <td>${employeeID}</td>
                                <td>${title}</td>
                                <td>$${annualSalary}</td>
                                <td><button class="deleteButton btn btn-outline-secondary">Delete</button></td>
                            </tr>`);
    $('#firstName').val('');
    $('#lastName').val('');
    $('#employeeID').val('');
    $('#title').val('');
    $('#annualSalary').val('');
    totalSalary += parseFloat(annualSalaryVal); //add this salary to total, use the non-comma version
    // console.log(totalSalary);
    $('#helpfulTextToDOM').empty(); //empty any previous message
    $('#helpfulTextToDOM').css('color', '#28A745'); //switch to happy text color
    $('#helpfulTextToDOM').text(`Successfully added ${firstName} ${lastName}!`); //helpful message

    calculateMonthly();
}

function deleteButton() {
    // console.log('DELETE');
    //go up to parents on the tr, find in the tds the nth child, in this case 5 because that's the $$ column, get the text
    let sniffedAnnualSalaryWithCommas = $(this).parents('tr').find('td:nth-child(5)').text();
    let sniffedAnnualSalary = sniffedAnnualSalaryWithCommas.replace(/,/g, ''); //get rid of commas. /, is to grab commas, /g is global, so it'll grab all (not just first) this only vaguely makes sense, why it's not (','/g, '')
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace 
    //https://stackoverflow.com/questions/5788741/remove-commas-from-the-string-using-javascript
    // console.log(sniffedAnnualSalary);
    let toNumber = sniffedAnnualSalary.slice(1);
    // console.log(toNumber);
    let sniffedFirstName = $(this).parents('tr').find('td:nth-child(1)').text(); //grab first name for message
    let sniffedLastName = $(this).parents('tr').find('td:nth-child(2)').text(); //grab last name for message

    $('#helpfulTextToDOM').empty(); //empty any previous message
    $('#helpfulTextToDOM').css('color', 'initial'); //switch to blasé, business-like text color
    $('#helpfulTextToDOM').text(`Successfully removed ${sniffedFirstName} ${sniffedLastName}.`); //helpful message
    totalSalary -= parseFloat(toNumber);
    calculateMonthly();
    
    //need to go up 2 parents to remove the row. button, td, tr
    $(this).parent().parent().remove();
}

function calculateMonthly() {
    //take totalSalary and dived by 12 to get monthly
    let monthly = totalSalary / 12;
    let monthlyToDecimal = monthly.toFixed(2); //give only to 2 decimals
    let monthlyToDOM = parseFloat(monthlyToDecimal).toLocaleString();
    if (monthly > 20000) {
        $('#totalMonthly').css('background-color', '#DC3545'); //set background to red, bootstrap style
        $('#totalMonthly').css('color', 'white'); //set text to white, bootstrap style
    } else if (monthly <= 20000) {
        $('#totalMonthly').css('background-color', 'initial'); //return background to initial
        $('#totalMonthly').css('color', 'initial'); //return text color to initial
    }
    // console.log(monthly);
    $('#monthly').text(monthlyToDOM);
}
