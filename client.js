$(document).ready(readyNow);

function readyNow() {
    //event listeners
    $('#submitButton').on('click', submitButton);
}

function submitButton() {
    console.log('Clicked submit');
    $('#tableBody').append(`<tr>
                    <td>Dust</td>
                    <td>Fedie</td>
                    <td>1234</td>
                    <td>Dude</td>
                    <td>$1,000,000</td>
                    <td><button>Delete</button></td>
                </tr>`)
}
