
(function ($) {
    "use strict";


    /*==================================================================
    [ Chose Options ]*/

   // LOGIN


    $("#registerFields").click(function(){
        $('.insertName').slideDown(300);
        $('.insertEmail').slideDown(300);
        $('.signInButton').slideUp(300);
        $('.pleaseSignIn').slideUp(300);
        $('.registerAccount').slideDown(300);
        $('.registerText').slideUp(300);
        $('.registerButton').slideDown(300);
    });
        
    $("#addParticipant").click(function () {
        console.log("Hey");
        $("#participantContainer").append('<th scope="row">1</th><td><div class="wrap-input3 validate-input insertName" data-validate="Name is required"><input class="input3" type="text" name="name" placeholder="Name"><span class="focus-input3"></span></div></td><td><div class="wrap-input3 validate-input insertEmail" data-validate = "Valid email is required: ex@abc.xyz"><input class="input3" type="text" name="email" placeholder="Email"><span class="focus-input3"></span></div></td><td><button type="button" class="btn btn-danger">Remove</button></td>');
    });

    /*==================================================================
    [ Validate ]*/
    var name = $('.validate-input input[name="name"]');
    var username = $('.validate-input input[name="username"]');
    var password = $('.validate-input input[name="password"]');
    var email = $('.validate-input input[name="email"]');


    $('.validate-form').on('submit',function(){
        var check = true;

        if($(name).val().trim() == '' || $(username).val().trim() == '' || $(password).val().trim() == '' || $(email).val().trim() == ''){
            showValidate(name);
            check=false;
        }
    });


    $('.validate-form .input3').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
})(jQuery);