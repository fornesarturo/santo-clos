/*
var settingsStuff = `<form class="settings'">
                    <span class="mainTitle">
                        <b>Hello world</b>
                    </span>

                   	<div id="usernameField" class="loginAndRegister inputWrapper inputValidate" data-validate="Username is required">
                        <input class="inputLine" type="text" name="username" placeholder="Username">
                        <span class="inputFocus"></span>
                    </div>
                    	
                    </div>
                </form>
`;
*/

Vue.component('create-event', {
  template: "<div class=\"mainContainer\"> \
			<div class=\"mainWrapper\">\
				<form class=\"createEvent\">\
                    <span class=\"mainTitle\">\
                        <b>Create event</b>\
                    </span>\
                   	<div id=\"usernameField\" class=\"loginAndRegister inputWrapper inputValidate\" data-validate=\"Username is required\">\
                        <input class=\"inputLine\" type=\"text\" name=\"username\" placeholder=\"Username\">\
                        <span class=\"inputFocus\"></span>\
                    </div>\
                </form>\
            </div>\
        </div>"
});


Vue.component('settings', {
  template: "<div class=\"mainContainer\">\
			<div class=\"mainWrapper\">\
				<form class=\"settings\">\
                    <span class=\"mainTitle\">\
                        <b>Hello world</b>\
                    </span>\
                   	<div id=\"usernameField\" class=\"loginAndRegister inputWrapper inputValidate\" data-validate=\"Username is required\">\
                        <input class=\"inputLine\" type=\"text\" name=\"username\" placeholder=\"Username\">\
                        <span class=\"inputFocus\"></span>\
                    </div>\
                </form>\
            </div>\
        </div>"
});

var main = new Vue({
  el: '#main',
  data: {
  	active: 'createEvent',
    createEventActive: true,
    settingsActive: false
  },
  methods: {
    setCreateEventActive: function() {
    	this.createEventActive = true;
    	this.settingsActive = false;
    	this.active = "createEvent";
    },
    setSettingsActive: function() {
    	this.settingsActive = true;
    	this.createEventActive = false;
		this.active = "settings";
    },
    setServicesActive: function() {
    	this.settingsActive = false;
    	this.createEventActive = false;
		this.active = "services";
    },
    setContactActive: function() {
    	this.settingsActive = false;
    	this.createEventActive = false;
		this.active = "contact";
    }

  }
})

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