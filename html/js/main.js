
(function ($) {
    "use strict";


    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input3').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
            

    /*==================================================================
    [ Chose Radio ]*/

    // POST /user
    $("#radio1").on('change', function(){
        if ($(this).is(":checked")) {
            $('.insertName').slideDown(300);
            $('.insertUsername').slideDown(300);
            $('.insertPassword').slideDown(300);
            $('.insertEmail').slideDown(300);
            $('.insertEventId').slideUp(300);
        }
    });
    // GET /user
    $("#radio2").on('change', function(){
        if ($(this).is(":checked")) {
            $('.insertName').slideUp(300);
            $('.insertUsername').slideDown(300);
            $('.insertPassword').slideUp(300);
            $('.insertEmail').slideUp(300);
            $('.insertEventId').slideUp(300);
        }
    });
    // GET /event/users
    $("#radio3").on('change', function(){
        if ($(this).is(":checked")) {
            $('.insertName').slideUp(300);
            $('.insertUsername').slideUp(300);
            $('.insertPassword').slideUp(300);
            $('.insertEmail').slideUp(300);
            $('.insertEventId').slideDown(300);
        }
    });
    // GET /event/wishlist
    $("#radio4").on('change', function(){
        if ($(this).is(":checked")) {
            $('.insertName').slideUp(300);
            $('.insertUsername').slideDown(300);
            $('.insertPassword').slideUp(300);
            $('.insertEmail').slideUp(300);
            $('.insertEventId').slideDown(300);
        }
    });
    // GET /event/giftee
    $("#radio5").on('change', function(){
        if ($(this).is(":checked")) {
            $('.insertName').slideUp(300);
            $('.insertUsername').slideDown(300);
            $('.insertPassword').slideUp(300);
            $('.insertEmail').slideUp(300);
            $('.insertEventId').slideDown(300);
        }
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