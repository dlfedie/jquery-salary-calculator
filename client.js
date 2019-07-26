//stretch stuff: error on empty inputs

$(document).ready(readyNow);

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
}

function deleteButton() {
    console.log('DELETE');
    $(this).parent().parent().remove();
}