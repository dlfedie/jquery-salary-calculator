//stretch stuff: error on empty inputs
//sortable table?

$(document).ready(readyNow);

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
        $('#helpfulTextToDOM').css('color', 'red'); //notification text to red
        $('#helpfulTextToDOM').text('One or more fields are empty. Please enter valid inputs for each field.'); //notify user of empty fields.. possibly rename for user clarity
        return false; //end function
    } else if ($('#annualSalary').val() < 0) {
        //check if salary is positive
        $('#helpfulTextToDOM').css('color', 'red'); //notification text to red
        $('#helpfulTextToDOM').text('Annual Salary cannot be less than zero. Please enter a valid Annual Salary.'); //notify user of empty fields.. possibly rename for user clarity
        return false; //end function
    } else if ($('#employeeID').val() < 0) {
        //check if employee ID is positive
        $('#helpfulTextToDOM').css('color', 'red'); //notification text to red
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
                                <td><button class="deleteButton">Delete</button></td>
                            </tr>`);
    $('#firstName').val('');
    $('#lastName').val('');
    $('#employeeID').val('');
    $('#title').val('');
    $('#annualSalary').val('');
    totalSalary += parseFloat(annualSalaryVal); //add this salary to total, use the non-comma version
    // console.log(totalSalary);
    $('#helpfulTextToDOM').empty(); //empty any previous message
    $('#helpfulTextToDOM').css('color', 'green'); //switch to happy text color
    $('#helpfulTextToDOM').text(`Successfully added ${firstName} ${lastName}!`); //helpful message

    calculateMonthly();
}

function deleteButton() {
    // console.log('DELETE');
    //go up to parents on the tr, find in the tds the nth child, in this case 5 because that's the $$ column, get the text
    let sniffedAnnualSalaryWithCommas = $(this).parents('tr').find('td:nth-child(5)').text();
    let sniffedAnnualSalary = sniffedAnnualSalaryWithCommas.replace(',', ''); //get rid of commas
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
        $('#totalMonthly').css('background-color', 'red'); //set background to red
    } else if (monthly <= 20000) {
        $('#totalMonthly').css('background-color', 'initial'); //return background to initial
    }
    // console.log(monthly);
    $('#monthly').text(monthlyToDOM);
}
