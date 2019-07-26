$(document).ready(readyNow);

function readyNow() {
    //event listeners
    $('#submitButton').on('click', submitButton);
}

function submitButton() {
    console.log('Clicked submit');
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let employeeID = $('#employeeID').val();
    let title = $('#title').val();
    let annualSalary = $('#annualSalary').val();
    $('#tableBody').append(`<tr>
                    <td>${firstName}</td>
                    <td>${lastName}</td>
                    <td>${employeeID}</td>
                    <td>${title}</td>
                    <td>$${annualSalary}</td>
                    <td><button>Delete</button></td>
                </tr>`);
    $('#firstName').val('');
    $('#lastName').val('');
    $('#employeeID').val('');
    $('#title').val('');
    $('#annualSalary').val('');
}

