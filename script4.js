$(document).ready(function () {

    $('#searchBar').on('submit', function (event) {
        console.log("click");
        event.preventDefault();

        let user = $('#firstName').val();

        localStorage.setItem('user', user);




    });


})