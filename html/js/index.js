"use strict";

// LOGIN
$("#registerFields").click(function(){
    $('.insertName').slideDown(300);
    $('.insertEmail').slideDown(300);
    $('.loginButton').slideUp(300);
    $('.pleaseLogin').slideUp(300);
    $('.registerAccount').slideDown(300);
    $('.registerText').slideUp(300);
    $('.registerButton').slideDown(300);
    $('.goBackText').slideDown(300);
});

$("#loginFields").click(function(){
    $('.insertName').slideUp(300);
    $('.insertEmail').slideUp(300);
    $('.loginButton').slideDown(300);
    $('.pleaseSignIn').slideDown(300);
    $('.registerAccount').slideUp(300);
    $('.registerButton').slideUp(300);
    $('.goBackText').slideUp(300);
    $('.registerText').slideDown(300);
})

/*==================================================================
[ Focus ]*/
$('.input3').each(function(){
    $(this).on('blur', function(){
        if($(this).val().trim() != "") {
            $(this).addClass('has-val');
        }
        else {
            $(this).removeClass('has-val');
        }
    })    
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
