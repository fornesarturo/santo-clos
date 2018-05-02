<template>
  <div class='pageBG'>
    <div class='mainContainer'>
      <div class='mainWrapper'>
        <form class='mainForm'>
          <div class='text-center'>
            <img class='mb-4' src='./../assets/images/santo_clos.png' alt='' width='400' height='100'>
          </div>
          <span class='mainSubtitle'><b>Please Log In or Register</b></span>
          <div class='fields'>
            <div id='nameField' class='registerOnly inputWrapper inputValidate' style='display:none' data-validate='Name is required'>
              <input @focus="hideValidate($event.target)" class='inputLine' v-model='name' type='text' name='name' placeholder='Name'>
              <span class='inputFocus'></span>
            </div>
            <div id='emailField' class='registerOnly inputWrapper inputValidate' style='display:none' data-validate = 'Valid email is required: ex@abc.xyz'>
              <input @focus="hideValidate($event.target)" class='inputLine' v-model='email' type='text' name='email' placeholder='Email'>
              <span class='inputFocus'></span>
            </div>
            <div id='usernameField' class='loginAndRegister inputWrapper inputValidate' data-validate='Username is required'>
              <input @focus="hideValidate($event.target)" class='inputLine' v-model='username' type='text' name='username' placeholder='Username'>
              <span class='inputFocus'></span>
            </div>
            <div id='passwordField' class='loginAndRegister inputWrapper inputValidate' data-validate='Minimum of 8 characters, at least one uppercase, one lowercase, one digit and one special'>
              <input @focus="hideValidate($event.target)" class='inputLine' v-model='password' type='password' name='password' placeholder='Password'>
              <span class='inputFocus'></span>
            </div>
          </div>
        </form>
        <div>
          <div>
            <input type='button' id='loginRegisterButton' class='loginOnly btn btn-lg btn-primary btn-block' v-on:click='request' :value='buttonText'>
          </div>
          <br>
          <div>
            <input type='button' id='changeMode' class='btn btn-lg btn-secondary btn-block' v-on:click='modeChange' :value='modeText'>
          </div>
        </div>
        <div class='text-center'>
          <p class='mt-5 mb-3 text-muted'><span class="copyright">&copy;</span> Santo Clos 2018</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './../assets/vendor/sha256/sha256.js'
const request = require('./requests/requests_index')
const $ = require('jquery')
/* eslint-disable */

let login = 0;
let register = 1;

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

// Remove validation error on clicked input
$(".mainForm .inputLine").each((index, element) => {
    $(element).focus(() => {
        hideValidate(element);
    });
});

// Validation Regexes.
const emailRegex = new RegExp('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}');
const usernameRegex = new RegExp('^[a-zA-Z0-9_-]{3,16}');
const passwordStrengthRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\\-_!@#$%^&*/])(?=.{8,})");

// Show validation error
function showValidate(input) {
    let thisAlert = $(input).parent();
    $(thisAlert).addClass("alertValidation");
}

export default {
  name: "LoginIndex",
  data: () => {
    return {
      mode: login,
	    modeText: "I don't have an account",
	    buttonText: "Log In",
      name: "",
      email: "",
      username: "",
      password: "",
      eventToken: ""
    };
  },
  created: function() {
    if (this.$route.query.tokenEvent)
      this.eventToken = "?tokenEvent=" + this.$route.query.tokenEvent
    this.mode = login;
    this.modeText = "I don't have an account";
    this.buttonText= "Log In";
    this.loginSetActive();
  },
  methods: {
    loginSetActive: function() {
      this.$emit('login-setActive');
    },
    focusTest: function(){
      console.log("Hi, welcome to Chilli's");
    },
    hideValidate: function(input){
      let thisAlert = $(input).parent();
      $(thisAlert).removeClass("alertValidation");
    },
		modeChange: function () {
			let button = $("#changeMode");
			let loginRegisterButton = $("#loginRegisterButton");
			let name = $("#nameField");
			let email = $("#emailField");
			if (this.mode === login) {
				this.modeText = "I already have an account";
				this.buttonText= "Register"
				this.mode = register;
				name.slideToggle("slow");
				email.slideToggle("slow");
			} 
			else {
				this.modeText = "I don't have an account";
				this.buttonText = "Login"
				this.mode = login;
				name.slideToggle("slow");
				email.slideToggle("slow");
			}
			button.val(this.modeText);
			loginRegisterButton.val(this.buttonText);
		},
		request: function () {
			if (this.mode === login) {
        let username = $(".inputValidate input[name='username']");
        let password = $(".inputValidate input[name='password']");
        let usernameVal = $(username).val().trim();
        let passwordVal = $(password).val().trim();

        let checkPassed = true;
        if(usernameVal == "" || !usernameRegex.test(usernameVal)) {
          showValidate(username);
          checkPassed=false;
        }
        if(passwordVal == "") {
          showValidate(password);
          checkPassed=false;
        }
        if(checkPassed) {
          request.loginUser(usernameVal, passwordVal, this.eventToken).then((next) => {
					  if(next) {
              this.$emit('login-event');
              this.$emit('change-to-hub');
              this.$router.push('/hub');
            }
            else {
              showValidate(username);
              showValidate(password);
              alert("Wrong username or password");
            }
				  })
        }
			} 
			else if (this.mode === register) {
        let name = $(".inputValidate input[name='name']");
        let username = $(".inputValidate input[name='username']");
        let password = $(".inputValidate input[name='password']");
        let email = $(".inputValidate input[name='email']");
        let nameVal = $(name).val().trim()
        let emailVal = $(email).val().trim()
        let usernameVal = $(username).val().trim()
        let passwordVal = $(password).val().trim()
        
        let checkPassed = true;
        if(usernameVal == '' || !usernameRegex.test(usernameVal)) {
          showValidate(username)
          checkPassed=false
        }
        if(passwordVal == '' || !passwordStrengthRegex.test(passwordVal)) {
          showValidate(password)
          checkPassed=false
        }
        if(emailVal == '' || !emailRegex.test(emailVal)) {
          showValidate(email)
          checkPassed=false
        }
        if(nameVal == ''){
          showValidate(name)
          checkPassed=false
        }

        if(checkPassed) {
          request.createUser(nameVal, emailVal, usernameVal, passwordVal, this.eventToken)
          .then(res => {
            if (res) {
              request.loginUser(usernameVal, passwordVal, this.eventToken).then((next) => {
					      if(next) {
                  this.$emit('login-event');
                  this.$emit('change-to-hub');
                  this.$router.push('/hub');
					      }
				      })
            } else {
              console.log('Failed register!')
            }
          })
        }
			}
		}
	}
};
</script>

<style scoped>
@import './../assets/fonts/font-awesome-4.7.0/css/font-awesome.css';
@import './../assets/css/index.css';

.copyright {
	font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
</style>
