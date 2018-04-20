<template>
  <div class="mainContainer">
    <div class="mainWrapper">
      <form class="settings">
        <span class="mainTitle"><b>Settings</b></span>
        <div class="fields">
          <fieldset>
            <div id="nameField" class="inputWrapper inputValidate" data-validate="Name cannot be empty">
              <input class="inputLine" type="text" name="newName" placeholder="New Name">
              <span class="inputFocus"></span>
            </div>
            <div>
              <input type="button" id="confirmButtonName" value="Save New Name" class="btn btn-lg btn-primary btn-block">
            </div>
            <br>
            <div id="oldPasswordField" class="inputWrapper passwordValidate" data-validate="Must type old password">
              <input class="inputLine" type="password" name="oldPassword" placeholder="Old Password">
              <span class="inputFocus"></span>
            </div>
            <div id="newPasswordField" class="inputWrapper passwordValidate" data-validate="Minimum of 8 characters, at least one uppercase, one lowercase, one digit and one special">
              <input class="inputLine" type="password" name="newPassword" placeholder="New Password">
              <span class="inputFocus"></span>
            </div>
            <div id="newPasswordConfirmationField" class="inputWrapper passwordValidate" data-validate="Passwords must match">
              <input class="inputLine" type="password" name="newConfirmPassword" placeholder="Confirm New Password">
              <span class="inputFocus"></span>
            </div>
            <div>
              <input type="button" id="confirmButtonPassword" value="Save New Password" class="btn btn-lg btn-primary btn-block" v-on:click="saveNewPassword()">
            </div>
            <br>
            <div id="newEmailField" class="inputWrapper inputValidate" data-validate = "Valid email is required: ex@abc.xyz">
              <input class="inputLine" type="email" name="newEmail" placeholder="New email">
              <span class="inputFocus"></span>
            </div>
            <div>
              <input type="button" id="confirmButtonEmail" value="Save New Email" class="btn btn-lg btn-primary btn-block">
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import './../assets/vendor/sha256/sha256.js'
const request = require('./requests/requests_main')
const $ = require('jquery')

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

function check(input) {
    if (input.value != document.getElementById('password').value)
        input.setCustomValidity('Password Must be Matching.');
    else
        input.setCustomValidity('');
}

export default {
    name: 'Settings',
    methods: {
      saveNewEmail: function () {
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
          request.updateDataRequest(data).then((res) => {
            console.log(res);
          });
        }
      },
      saveNewPassword: function () {
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
          request.passwordValidationRequest(Cookies.get("current_user"), oldPasswordVal).then((passwordSuccess) => {
            if(passwordSuccess == 1) {
                let data = {
                    password: sha256(newPasswordVal)
                };
                request.updateDataRequest(data).then((res) => {
                    console.log(res);
                });
            }
            else {
                showValidate(oldPassword);
            }
          });
        }
      },
      saveNewName: function () {
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
          request.updateDataRequest(data).then((res) => {
            console.log(res);
          });
        }
      }
    }
}
</script>

