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
              <input class='inputLine' v-model='name' type='text' name='name' placeholder='Name'>
              <span class='inputFocus'></span>
            </div>
            <div id='emailField' class='registerOnly inputWrapper inputValidate' style='display:none' data-validate = 'Valid email is required: ex@abc.xyz'>
              <input class='inputLine' v-model='email' type='text' name='email' placeholder='Email'>
              <span class='inputFocus'></span>
            </div>
            <div id='usernameField' class='loginAndRegister inputWrapper inputValidate' data-validate='Username is required'>
              <input class='inputLine' v-model='username' type='text' name='username' placeholder='Username'>
              <span class='inputFocus'></span>
            </div>
            <div id='passwordField' class='loginAndRegister inputWrapper inputValidate' data-validate='Minimum of 8 characters, at least one uppercase, one lowercase, one digit and one special'>
              <input class='inputLine' v-model='password' type='password' name='password' placeholder='Password'>
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
      password: ""
    };
  },
  created: () => {
    this.mode = login;
	this.modeText = "I don't have an account";
	this.buttonText= "Log In";
  },
  methods: {
		modeChange: () => {
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
		request: () => {
			if (this.mode === login) {
				console.log("Login: ", this.username, ", ", this.password);
				let tempUsername = "Osoazul1_1";
				let tempPassword = "Wl151@&w3xK3"
				console.log("Testing Login with: ", tempUsername, ", ", tempPassword);
				request.loginUser(tempUsername, tempPassword).then((next) => {
					if(next) {
						console.log("LOAD MAIN");
					}
				})
				
			} 
			else if (this.mode === register) {
				console.log("Register: ", this.username, ", ", this.password);
				let tempUsername = "Osoazul1_1-Test";
				let tempName = "Miguel";
				let tempEmail = "temp@temp.com";
				let tempPassword = "Wl151@&w3xK3"
				console.log("Testing Register with: ", tempUsername, ", ", tempPassword);
				request.registerUser(tempName, tempEmail, tempUsername, tempPassword).then((next) => {
					if(next) {
						console.log("LOAD MAIN");
					}
				})
			}
		}
	}
};
</script>

<style scoped>
.copyright {
	font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
</style>
