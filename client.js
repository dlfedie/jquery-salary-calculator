//stretch stuff: error on empty inputs - done
//TOASTS - haha, not this week.
//sortable table? barf. tried looking at bootstrap-table, and i just don't know what to import.
//bottom table row to only show if there are actual rows? maybe do a check children of table and see if tbody exists? - MAYBE DESIGNER SAYS NO BECAUSE IT LOOKS BETTER ANYWAYS/PRODUCT NEEDS TO SHIP

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
        $('#helpfulTextToDOM').addClass('text-danger'); //notification text to red. Specifically the red of the bootstrap button style
        $('#helpfulTextToDOM').text('One or more fields are empty. Please enter valid inputs for each field.'); //notify user of empty fields.. possibly rename for user clarity
        return false; //end function
    } else if ($('#annualSalary').val() < 0) {
        //check if salary is positive
        $('#helpfulTextToDOM').addClass('text-danger'); //notification text to red
        $('#helpfulTextToDOM').text('Annual Salary cannot be less than zero. Please enter a valid Annual Salary.'); //notify user of empty fields.. possibly rename for user clarity
        return false; //end function
    } else if ($('#employeeID').val() < 0) {
        //check if employee ID is positive
        $('#helpfulTextToDOM').addClass('text-danger'); //notification text to red
        $('#helpfulTextToDOM').text('Employee ID cannot be less than zero. Please enter a valid Empolyee ID.'); //notify user of empty fields.. possibly rename for user clarity
        return false; //end function
    }
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let employeeID = $('#employeeID').val();
    let title = $('#title').val();
    let annualSalaryVal = $('#annualSalary').val(); //grab the full number
    // let annualSalaryDec = parseFloat(annualSalaryVal).toFixed(2); // make it look like money
    // console.log(annualSalaryDec);
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
    let annualSalaryDOM = parseFloat(annualSalaryVal).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }); //add some commas, NO DECIMALS, FINANCE DEPT. PAY THEM THEIR EXTRA .99 IF YOU NEED.
    // console.log(annualSalaryDOM);
    
    $('#tableBody').append(`<tr class="employeeRow">
                                <td>${firstName}</td>
                                <td>${lastName}</td>
                                <td>${employeeID}</td>
                                <td>${title}</td>
                                <td>$${annualSalaryDOM}</td>
                                <td><button class="deleteButton btn btn-outline-secondary">Delete</button></td>
                            </tr>`);
    // $('#firstName').val('');
    // $('#lastName').val('');
    // $('#employeeID').val('');
    // $('#title').val('');
    // $('#annualSalary').val('');
    $('.inputs').val(''); //well shoot, that saves us some lines of code now, don't it??
    totalSalary += parseFloat(annualSalaryVal); //add this salary to total, use the non-comma version
    // console.log(totalSalary);
    $('#helpfulTextToDOM').empty(); //empty any previous message
    $('#helpfulTextToDOM').removeClass('text-danger');
    $('#helpfulTextToDOM').addClass('text-success'); //switch to happy text color
    $('#helpfulTextToDOM').text(`Successfully added ${firstName} ${lastName}!`); //helpful message

    //feedback from Kris. I did think of this, but forgot to look into it. Nice UX enhancement.
    $('#firstName').focus();

    calculateMonthly();
}

function deleteButton() {
    // console.log('DELETE');
    //go up to parents on the tr, find in the tds the nth child, in this case 5 because that's the $$ column, get the text
    //https://stackoverflow.com/questions/14460421/get-the-contents-of-a-table-row-with-a-button-click
    let sniffedAnnualSalaryWithCommas = $(this).parents('tr').find('td:nth-child(5)').text();
    let sniffedAnnualSalary = sniffedAnnualSalaryWithCommas.replace(/,/g, '').slice(1); //get rid of commas. /, is to grab commas, /g is global, so it'll grab all (not just first) this only vaguely makes sense, why it's not (','/g, '')
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace 
    //https://stackoverflow.com/questions/5788741/remove-commas-from-the-string-using-javascript
    // console.log(sniffedAnnualSalary);
    // let toNumber = sniffedAnnualSalary.slice(1); //moved this up to the end of the remove commas part. Success!
    // console.log(toNumber);
    let sniffedFirstName = $(this).parents('tr').find('td:nth-child(1)').text(); //grab first name for message
    let sniffedLastName = $(this).parents('tr').find('td:nth-child(2)').text(); //grab last name for message

    $('#helpfulTextToDOM').empty(); //empty any previous message
    $('#helpfulTextToDOM').removeClass('text-danger text-success'); //switch to blasé, business-like text color
    // $('#helpfulTextToDOM').removeClass('text-success'); //switch to blasé, business-like text color
    $('#helpfulTextToDOM').text(`Successfully removed ${sniffedFirstName} ${sniffedLastName}.`); //helpful message
    totalSalary -= parseFloat(sniffedAnnualSalary);
    calculateMonthly();
    
    //need to go up 2 parents to remove the row. button, td, tr
    $(this).parent().parent().remove();
}

function calculateMonthly() {
    //take totalSalary and dived by 12 to get monthly
    let monthly = totalSalary / 12;
    // let monthlyToDecimal = monthly.toFixed(2); //give only to 2 decimals //used this to conceptualize all that needed to be done. 
    // console.log(monthlyToDecimal); //ok, i misread the toLocaleString, and was fighting changing decimals to strings to numbers.. turns out it's much easier than I originally thought.
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
    let monthlyToDOM = monthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }); //AHA FINALLY VICTORY.
    // console.log(monthlyToDOM);
    
    if (monthly > 20000) {
        $('#totalMonthly').addClass('bg-danger text-light'); //set background to red, bootstrap style
        // $('#totalMonthly').addClass('text-light'); //set text to white, bootstrap style
    } else if (monthly <= 20000) {
        $('#totalMonthly').removeClass('bg-danger text-light'); //return background to initial
        // $('#totalMonthly').removeClass('text-light'); //return text color to initial
    }
    // console.log(monthly);
    $('#monthly').text(monthlyToDOM);
}

// $('.toast').toast(data-delay); //whelp, not going to worry about toasts, methinks. I'll do more css