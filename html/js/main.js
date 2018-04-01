Vue.component('hosted-event', {
    props: ['name', 'date', 'id'],
    template: "<div v-on:click=\"clickedEvent\" class=\"santoClosEvent\">\
                    <div class=\"name\">{{ name }}</div>\
                    <div class=\"date\">{{ date }}</div>\
                </div>",
    methods: {
        clickedEvent: function() {
            console.log(this.id);
        }
    }
});

Vue.component('joined-event', {
    props: ['name', 'date', 'admin', 'id'],
    template: "<div v-on:click=\"clickedEvent\" class=\"santoClosEvent\">\
                    <div class=\"name\">{{ name }}</div>\
                    <div class=\"date\">{{ date }}</div>\
                    <div class=\"admin\">Hosted by:&nbsp&nbsp{{ admin }}</div>\
                </div>",
    methods: {
        clickedEvent: function () {
            console.log(this.id, this.admin);
        }
    }
    
});

//var joinedEventsData = {joined: []};

Vue.component('joined-hub', {
    template: "<div class=\"hubWrapper\">\
            <span class=\"mainTitle\"><b>Events I've Joined</b></span>\
            <joined-event v-for=\"event in joined\" v-bind:name=\"event.name\" v-bind:date=\"event.eventDate\" v-bind:id=\"event.eventId\" v-bind:admin=\"event.admin\"></joined-event>\
            </div>",
    data: function() {
        return { joined: [] };
    },
    created: function() {
        let options = {
            hostname: 'localhost',
            port: 8080,
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET',
        };
        let fullURL = "/api/user/joinedEvents";

        fetch(fullURL, options)
            .then(res => res.json())
            .then(resJSON => {
                if (resJSON.data) {
                    this.joined = resJSON.data;
                }
                else console.log(resJSON);
            });
    }
});

// var hostedEventsData = {admined: []};

Vue.component('hosted-hub', {
    template: "<div class=\"hubWrapper\">\
            <span class=\"mainTitle\"><b>Events I Host</b></span>\
            <hosted-event v-for=\"event in admined\" v-bind:name=\"event.name\" v-bind:date=\"event.eventDate\" v-bind:id=\"event.eventId\"></hosted-event>\
            <div class=\"createEventButton\" v-on:click=\"createNewEvent\"><i class=\"fas fa - plus\"></i></div>\
            </div>",
    methods: {
        createNewEvent: function () {
            this.$emit('new-event');
        }
    },
    created: function () {
        let options = {
            hostname: 'localhost',
            port: 8080,
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET',
        };
        let fullURL = "/api/user/events";

        fetch(fullURL, options)
            .then(res => res.json())
            .then(resJSON => {
                if (resJSON.data) {
                    this.admined = resJSON.data;
                }
                else console.log(resJSON);
            });
    },
    data: function () {
        return {admined: []};
    }
});

const hub = {
    template: "<div class=\"mainContainer\">\
                <hosted-hub v-on:new-event=\"newEvent\"></hosted-hub>\
                <joined-hub></joined-hub>\
            </div>",
    methods: {
        newEvent: function() {
            this.$emit('change-to-event');
            location.href = "main#/create-event";
        }
    }
};

const createEvent = {
  template: "<div class=\"eventContainer\"> \
			<div class=\"eventWrapper\">\
				<form class=\"createEvent\">\
                    <span class=\"mainTitle\">\
                        <b>Create event</b>\
                    </span>\
                    <div class=\"modal-body\">\
                        <div class=\"container col-md-12\">\
                            <div class=\"row\">\
                                <div class=\"col-md-6\">\
                                    <div id=\"eventNameField\" class=\"inputWrapper inputValidate inner-addon left-addon\" data-validate=\"Name cannot be empty\">\
                                        <img class=\"glyphicon\" src=\"octicons/file-text.svg\" width=\"100%\" height=\"100%\">\
                                        <input class=\"inputRight left-addon\" type=\"text\" name=\"eventName\" placeholder=\"Event's name\">\
                                        <span class=\"inputFocus\"></span>\
                                    </div>\
                                 </div>\
                                <div class=\"col-md-6\">\
                                    <div id=\"dateField\" class=\"inputWrapper inputValidate inner-addon left-addon\" data-validate=\"Please select a date\">\
                                        <img class=\"glyphicon \" src=\"octicons/calendar.svg\" width=\"100%\" height=\"100%\">\
                                        <input class=\"inputRight left-addon\" type=\"date\" name=\"date\" placeholder=\"DD/MM/YY\">\
                                        <span class=\"inputFocus\"></span>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class=\"row\">\
                                <div class=\"col-md-6\">\
                                    <div id=\"addressField\" class=\"inputWrapper inputValidate inner-addon left-addon\" data-validate=\"You need a place for your event!\">\
                                        <img class=\"glyphicon\" src=\"octicons/location.svg\" width=\"100%\" height=\"100%\">\
                                        <input class=\"inputRight left-addon\" type=\"text\" name=\"address\" placeholder=\"Event's location\">\
                                        <span class=\"inputFocus\"></span>\
                                    </div>\
                                 </div>\
                                <div class=\"col-md-6\">\
                                    <div id=\"maxAmountField\" class=\"inputWrapper inputValidate inner-addon left-addon\" data-validate=\"Please select an amount\">\
                                         <img class=\"glyphicon\" src=\"octicons/ruby.svg\" width=\"100%\" height=\"100%\">\
                                        <input class=\"inputRight left-addon\" type=\"text\" name=\"maxAmount\" placeholder=\"Maximum amount to spend\">\
                                        <span class=\"inputFocus\"></span>\
                                    </div>\
                                </div>\
                            </div>\
                                <span class=\"mainSubtitle\">\
                                    <b>Participants</b>\
                                </span>\
                            <form id=\"eventData\">\
                                <div class=\"row\">\
                                    <div class=\"col-md-6\">\
                                        <div id=\"participantNameField\" class=\"inputWrapper inputValidate inner-addon left-addon\" data-validate=\"You need participants!\">\
                                            <img class=\"glyphicon\" src=\"octicons/person.svg\" width=\"100%\" height=\"100%\">\
                                            <input class=\"inputRight left-addon\" type=\"text\" name=\"participantName\" placeholder=\"Participant's name\">\
                                            <span class=\"inputFocus\"></span>\
                                        </div>\
                                     </div>\
                                    <div class=\"col-md-6\">\
                                        <div id=\"particicpantEmailField\" class=\"inputWrapper inputValidate inner-addon left-addon\" data-validate=\"Participant's email required\">\
                                             <img class=\"glyphicon\" src=\"octicons/mail.svg\" width=\"100%\" height=\"100%\">\
                                            <input class=\"inputRight left-addon\" type=\"text\" name=\"participantEmail\" placeholder=\"Participant's email\">\
                                            <span class=\"inputFocus\"></span>\
                                        </div>\
                                    </div>\
                                </div>\
                                <div class=\"row\">\
                                    <div class=\"col-md-6\">\
                                        <div id=\"participantNameField\" class=\"inputWrapper inputValidate inner-addon left-addon\" data-validate=\"You need participants!\">\
                                            <img class=\"glyphicon\" src=\"octicons/person.svg\" width=\"100%\" height=\"100%\">\
                                            <input class=\"inputRight left-addon\" type=\"text\" name=\"participantName\" placeholder=\"Participant's name\">\
                                            <span class=\"inputFocus\"></span>\
                                        </div>\
                                     </div>\
                                    <div class=\"col-md-6\">\
                                        <div id=\"particicpantEmailField\" class=\"inputWrapper inputValidate inner-addon left-addon\" data-validate=\"Participant's email required\">\
                                             <img class=\"glyphicon\" src=\"octicons/mail.svg\" width=\"100%\" height=\"100%\">\
                                            <input class=\"inputRight left-addon\" type=\"text\" name=\"participantEmail\" placeholder=\"Participant's email\">\
                                            <span class=\"inputFocus\"></span>\
                                        </div>\
                                    </div>\
                                </div>\
                            </form>\
                        </div>\
                    </div>\
                </form>\
                    <div class=\"row\">\
                          <div class=\"col-md-6\">\
                        </div>\
                        <div class=\"col-md-6\">\
                                <input type=\"button\" id=\"addParticipantButton\" value=\"Add Participant\" class=\"loginOnly btn btn-lg btn-primary btn-block\">\
                                <input type=\"button\" id=\"deleteParticipantButton\" value=\"Remove Participant\" class=\"loginOnly btn btn-lg btn-danger btn-block\">\
                        </div>\
                    </div>\
                    <br><br><br>\
                    <input type=\"button\" id=\"createEventButton\" value=\"Create Event\" class=\"loginOnly btn btn-lg btn-primary btn-block\" onclick=\"createEventRequestMain()\">\
            </div>\
        </div>",
    methods: {
        createEventRequest: function () {
            
        }
    }
};

const settings = {
  template: "<div class=\"mainContainer\">\
			<div class=\"mainWrapper\">\
				<form class=\"settings\">\
                    <span class=\"mainTitle\">\
                        <b>Settings</b>\
                    </span>\
                    <div class=\"fields\">\
                        <fieldset>\
                            <div id=\"nameField\" class=\"inputWrapper inputValidate\" data-validate=\"Name cannot be empty\">\
                                <input class=\"inputLine\" type=\"text\" name=\"newName\" placeholder=\"New Name\">\
                                <span class=\"inputFocus\"></span>\
                            </div>\
                            <div>\
                              <input type=\"button\" id=\"confirmButtonName\" value=\"Save New Name\" class=\"btn btn-lg btn-primary btn-block\">\
                            </div>\
                            <br>\
                            <div id=\"oldPasswordField\" class=\"inputWrapper passwordValidate\" data-validate=\"Must type old password\">\
                                <input class=\"inputLine\" type=\"password\" name=\"oldPassword\" placeholder=\"Old Password\">\
                                <span class=\"inputFocus\"></span>\
                            </div>\
                           	<div id=\"newPasswordField\" class=\"inputWrapper passwordValidate\" data-validate=\"Minimum of 8 characters, at least one uppercase, one lowercase, one digit and one special\">\
                                <input class=\"inputLine\" type=\"password\" name=\"newPassword\" placeholder=\"New Password\">\
                                <span class=\"inputFocus\"></span>\
                            </div>\
                            <div id=\"newPasswordConfirmationField\" class=\"inputWrapper passwordValidate\" data-validate=\"Passwords must match\">\
                                <input class=\"inputLine\" type=\"password\" name=\"newConfirmPassword\" placeholder=\"Confirm New Password\">\
                                <span class=\"inputFocus\"></span>\
                            </div>\
                            <div>\
                              <input type=\"button\" id=\"confirmButtonPassword\" value=\"Save New Password\" class=\"btn btn-lg btn-primary btn-block\">\
                            </div>\
                            <br>\
                            <div id=\"newEmailField\" class=\"inputWrapper inputValidate\" data-validate = \"Valid email is required: ex@abc.xyz\">\
                                <input class=\"inputLine\" type=\"email\" name=\"newEmail\" placeholder=\"New email\">\
                                <span class=\"inputFocus\"></span>\
                            </div>\
                            <div>\
                              <input type=\"button\" id=\"confirmButtonEmail\" value=\"Save New Email\" class=\"btn btn-lg btn-primary btn-block\">\
                            </div>\
                        </fieldset>\
                    </div>\
                </form>\
            </div>\
        </div>"
};

const participants = {
    template: "<div class=\"row\">\
                    <div class=\"col-md-6\">\
                        <div id=\"participantNameField\" class=\"inputWrapper inputValidate inner-addon left-addon\" data-validate=\"You need participants!\">\
                            <img class=\"glyphicon\" src=\"octicons/person.svg\" width=\"100%\" height=\"100%\">\
                            <input class=\"inputRight left-addon\" type=\"text\" name=\"participantName\" placeholder=\"Participant's name\">\
                            <span class=\"inputFocus\"></span>\
                        </div>\
                    </div>\
                    <div class=\"col-md-6\">\
                        <div id=\"particicpantEmailField\" class=\"inputWrapper inputValidate inner-addon left-addon\" data-validate=\"Participant's email required\">\
                            <img class=\"glyphicon\" src=\"octicons/mail.svg\" width=\"100%\" height=\"100%\">\
                            <input class=\"inputRight left-addon\" type=\"text\" name=\"participantEmail\" placeholder=\"Participant's email\">\
                            <span class=\"inputFocus\"></span>\
                        </div>\
                    </div>\
                </div>"
};

const eventInformation = {
    props: ['eventName', 'location', 'hostName', 'userYouGive', 'maxAmount', 'participants'],
    template: "<div class=\"eventInformationContainer\">\
                    <div class=\"eventWrapper\">\
                        <span class=\"mainTitle\">\
                            <b>{{ eventName }}</b>\
                        </span>\
                        <span class=\"mainSubtitle\">\
                            <b>Hosted by {{ hostName }} </b>\ 
                        </span>\
                        <div class=\"row\">\
                            <div class=\"container col-md-6\">\
                                <b> {{ location }} </b>\
                                <b> {{ maxAmount }} </b>\
                                <button> My Wishlist </button>\
                                <b> You're buying a gift for {{ userYouGive }} ! </b>\
                                <b> Check {{ userYouGive }}\'s checkclist> </b>\
                            </div>\
                            <div class=\"container col-md-6\">\
                                <li v-for=\"participant in participants\">\
                                   <b> {{ participant }} </b> \
                                </li>\
                            </div>\
                        </div>\
                    </div>\
               </div>"
};

Vue.component('participants-wishlist', {
    props: ['participants'],
    template: " <li v-for=\"participant in participants\">\
                    <div class=\"row\"<\
                        <div class=\"col-md-8\">\
                            <b> {{ participant.name }} </b>\
                        </div>\
                        <div class=\"col-md-4\">\
                            <button> See Wishlist\
                        </div>\
                    </div>\
                </li>"
});

const routes = [
    { path: "/", component: hub },
    { path: "/settings", component: settings },
    { path: "/create-event", component: createEvent }
];

const router = new VueRouter({
    routes: routes
});

var main = new Vue({
    router: router,
    el: '#main',
    data: {
          activeView: 'hub',
          adminedEvents: {}
    },
    methods: {
        setHubActive: function() {
            this.activeView = "hub";
        },
        setCreateEventActive: function() {
            this.activeView = "create-event";
        },
        setSettingsActive: function() {
		    this.activeView = "settings";
        },
        setServicesActive: function() {
		    this.activeView = "services";
        }
    }
})

// CREATE EVENTS
function createEventRequestMain(){
    var participants = $("#eventData").serializeArray();
    $.each(participants, function(index, value){
        console.log(index +  ": " + value.participantName);
    });
    let name = $("#eventNameField input[name='eventName']").val();
    let address = $("#addressField input[name='address'").val();
    let amount = $("#maxAmountField input[name='maxAmount']").val();
    let date = $("#dateField input[name='date']").val();

    console.log(name, address, amount, date);

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
            console.log("Add participants");
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