//==================================================================
// INPUT FIELDS

// Function to change input fields to show according to mode
login = 0;
register = 1;

let currentMode = login
let buttonMode = $("#changeMode");
buttonMode.click(() => {
    if(currentMode == login) {
        buttonMode.val("I already have an account");
        $(".registerOnly").slideDown(300);
        $(".loginOnly").slideUp(300);
        currentMode = register;
    }
    else if (currentMode == register) {
        buttonMode.val("I don't have an account");
        $(".loginOnly").slideDown(300);
        $(".registerOnly").slideUp(300);
        currentMode = login;
    }
});
//==================================================================
// FOCUS WHEN INPUT HAS CONTENT
$(".inputLine").each((index, element) => {
    $(element).on("blur", () => {
        if($(element).val().trim() != "") {
            $(element).addClass("has-val");
        }
        else {
            $(element).removeClass("has-val");
        }
    })    
});    


//==================================================================
// INPUT VALIDATION

const emailRegex = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}');
const usernameRegex = new RegExp('^[a-zA-Z0-9_-]{3,16}');
const passwordStrengthRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\-_!@#\$%\^&\*])(?=.{8,})");

// When login is clicked
$("#loginButton").click(() => {
    let username = $(".inputValidate input[name='username']");
    let password = $(".inputValidate input[name='password']");

    let checkPassed = true;
    if($(username).val().trim() == "" || !usernameRegex.test($(username).val())) {
        showValidate(username);
        checkPassed=false;
    }
    if($(password).val().trim() == "") {
        showValidate(password);
        checkPassed=false;
    }
    if(checkPassed) {
        let usernameVal = $(username).val().trim();
        let passwordVal = $(password).val().trim();
        loginUser(usernameVal, passwordVal);
    }
});
// When register is clicked
$("#registerButton").click(() => {
    let name = $(".inputValidate input[name='name']");
    let username = $(".inputValidate input[name='username']");
    let password = $(".inputValidate input[name='password']");
    let email = $(".inputValidate input[name='email']");
    
    let checkPassed = true;
    if($(username).val().trim() == "" || !usernameRegex.test($(username).val().trim())) {
        showValidate(username);
        checkPassed=false;
    }
    if($(password).val().trim() == "" || !passwordStrengthRegex.test($(password).val().trim())) {
    //if($(password).val().trim() == "" ) {
        showValidate(password);
        checkPassed=false;
    }
    if($(email).val().trim() == "" || !emailRegex.test($(email).val().trim())) {
        showValidate(email);
        checkPassed=false;
    }
    if($(name).val().trim() == ""){
        showValidate(name);
        checkPassed=false;
    }

    if(checkPassed) {
        let nameVal = $(name).val().trim();
        let emailVal = $(email).val().trim();
        let usernameVal = $(username).val().trim();
        let passwordVal = $(password).val().trim();
        createUser(nameVal, emailVal, usernameVal, passwordVal);
    }
});
// Remove validation error on clicked input
$(".mainForm .inputLine").each((index, element) => {
    $(element).focus(() => {
        hideValidate(element);
    });
});
// Show validation error
function showValidate(input) {
    let thisAlert = $(input).parent();
    $(thisAlert).addClass("alertValidation");
}
// Remove validation error
function hideValidate(input) {
    let thisAlert = $(input).parent();
    $(thisAlert).removeClass("alertValidation");
}
