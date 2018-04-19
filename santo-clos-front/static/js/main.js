// CREATE EVENTS
function createEventRequestMain(){
    var participantsRaw = $("#eventData").serializeArray();
    let participantsArray = [];
    for(let i = 0; i < participantsRaw.length; i++) {
        if(participantsRaw[i].value == "") {
            continue;
        } 
        else {
            participantsArray.push({email: participantsRaw[i].value});
        }
    }
    let name = $("#eventNameField input[name='eventName']").val();
    let address = $("#addressField input[name='address'").val();
    let amount = $("#maxAmountField input[name='maxAmount']").val();
    let date = $("#dateField input[name='date']").val();

    let data = {
        name: name,
        date: date,
        address: address,
        amount: amount
    };
    let options = {
        hostname: 'localhost',
        port: 8080,
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    };
    let fullURL = "/api/event";

    fetch(fullURL, options)
    .then(res => res.json())
    .then(resJSON => {
        if(resJSON.data.eventId) {
            postEventParticipants(participantsArray, resJSON.data.eventId);
        }
        else console.log(resJSON);
    });
};

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
const passwordStrengthRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\\-_!@#$%^&*/])(?=.{8,})");

// Remove validation error on clicked input
$(".settings .inputLine").each((index, element) => {
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

// When Confirm Changes Name is Clicked
$("#confirmButtonName").click(() => {
    let newName = $(".inputValidate input[name='newName']");
    let newNameVal = $(newName).val().trim();

    let checkPassed = true;
    if(newNameVal == "") {
        showValidate(newName);
        checkPassed = false;
    }

    if(checkPassed) {
        let data = {
            name: newNameVal
        };
        updateDataRequest(data).then((res) => {
            console.log(res);
        });
    }
});

// When Confirm Changes Email is Clicked
$("#confirmButtonEmail").click(() => {
    let newEmail = $(".inputValidate input[name='newEmail']");
    let newEmailVal = $(newEmail).val().trim();

    let checkPassed = true;
    if(newEmailVal == "" || !emailRegex.test(newEmailVal)) {
        showValidate(newName);
        checkPassed = false;
    }

    if(checkPassed) {
        let data = {
            email: newEmailVal
        };
        updateDataRequest(data).then((res) => {
            console.log(res);
        });
    }
});

// VALIDATE PASSWORDS
// When Confirm Changes Password is Clicked
$("#confirmButtonPassword").click(() => {
    let oldPassword = $(".passwordValidate input[name='oldPassword']");
    let oldPasswordVal = $(oldPassword).val().trim();
    let newPassword = $(".passwordValidate input[name='newPassword']");
    let newPasswordVal = $(newPassword).val().trim();
    let newConfirmPassword = $(".passwordValidate input[name='newConfirmPassword']");
    let newConfirmPasswordVal = $(newConfirmPassword).val().trim();

    let checkPassed = true;
    if(oldPasswordVal == "") {
        showValidate(oldPassword);
        checkPassed = false;
    }
    if(newPasswordVal == "" || !passwordStrengthRegex.test($(newPassword).val().trim())) {
        showValidate(newPassword);
        checkPassed = false;
    }
    if(newConfirmPasswordVal == "" || !passwordStrengthRegex.test($(newConfirmPassword).val().trim())) {
        showValidate(newConfirmPassword);
        checkPassed = false;
    }
    if(newConfirmPasswordVal != newConfirmPasswordVal) {
        showValidate(newConfirmPassword);
        showValidate(newPassword);
        checkPassed = false;
    }

    if(checkPassed) {
        passwordValidationRequest(Cookies.get("current_user"), oldPasswordVal).then((passwordSuccess) => {
            if(passwordSuccess == 1) {
                let data = {
                    password: sha256(newPasswordVal)
                };
                updateDataRequest(data).then((res) => {
                    console.log(res);
                });
            }
            else {
                showValidate(oldPassword);
            }
        });
    }
});

// <img class=\"glyphicon\" src=\"octicons/mail.svg\" width=\"100%\" height=\"100%\">\

