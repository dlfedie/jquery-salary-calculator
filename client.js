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
    console.log('Clicked submit');
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let employeeID = $('#employeeID').val();
    let title = $('#title').val();
    let annualSalary = $('#annualSalary').val();
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
    totalSalary += parseFloat(annualSalary); //add this salary to total
    console.log(totalSalary);
    
    calculateMonthly();
}

function deleteButton() {
    console.log('DELETE');
    //go up to parents on the tr, find in the tds the nth child, in this case 5 because that's the $$ column, get the text
    let sniffedRow = $(this).parents('tr').find('td:nth-child(5)').text();
    console.log(sniffedRow);
    let toNumber = sniffedRow.slice(1);
    console.log(toNumber);
    totalSalary -= parseFloat(toNumber);
    calculateMonthly();
    
    //need to go up 2 parents to remove the row. button, td, tr
    $(this).parent().parent().remove();
}

function calculateMonthly() {
    //take totalSalary and dived by 12 to get monthly
    let monthly = totalSalary / 12;
    if (monthly > 20000) {
        $('#totalMonthly').css('background-color', 'red'); //set background to red
    } else if (monthly <= 20000) {
        $('#totalMonthly').css('background-color', 'initial'); //return background to initial
    }
    console.log(monthly);
    $('#monthly').text(monthly);
}
