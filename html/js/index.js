//==================================================================
// INPUT FIELDS

// Function to change input fields to show according to mode
login = 0;
register = 1;

let currentMode = login
let buttonMode = $("#changeMode");
buttonMode.click(() => {
    if(currentMode == login) {
        buttonMode.val("I already have and account");
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

// When login is clicked
$("#loginButton").click(() => {
    let username = $(".inputValidate input[name='username']");
    let password = $(".inputValidate input[name='password']");

    let checkPassed = true;
    if($(username).val().trim() == ""){
        showValidate(username);
        checkPassed=false;
    }
    if($(password).val().trim() == ""){
        showValidate(password);
        checkPassed=false;
    }

    if(checkPassed) {
        console.log("DO REQUEST HERE");
    }
    else {
        console.log("No can do baby doll");
    }
});
// When register is clicked
$("#registerButton").click(() => {
    let name = $(".inputValidate input[name='name']");
    let username = $(".inputValidate input[name='username']");
    let password = $(".inputValidate input[name='password']");
    let email = $(".inputValidate input[name='email']");

    let checkPassed = true;
    if($(username).val().trim() == ""){
        console.log("USER MISS");
        showValidate(username);
        checkPassed=false;
    }
    if($(password).val().trim() == ""){
        console.log("PASS MISS");
        showValidate(password);
        checkPassed=false;
    }
    if($(email).val().trim() == ""){
        console.log("EMAIL MISS");
        showValidate(email);
        checkPassed=false;
    }
    if($(name).val().trim() == ""){
        console.log("NAME MISS");
        showValidate(name);
        checkPassed=false;
    }

    if(checkPassed) {
        console.log("DO REQUEST HERE");
    }
    else {
        console.log("No can do baby doll");
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
