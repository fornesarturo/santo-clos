Vue.component('hosted-event', {
    props: ['name', 'date'],
    template: "<div>{{ name }} {{ date }}</div>",
});

var hubData = {admined: []};

const hub = {
    template: "<div class=\"mainContainer\">\
            <div class=\"hubWrapper\">\
            <span class=\"mainTitle\"><b>Events I Host</b></span>\
            <hosted-event v-for=\"event in admined\" v-bind:name=\"name\" v-bind:date=\"eventDate\"></hosted-event>\
            </div>\
            <div class=\"hubWrapper\">\
            <span class=\"mainTitle\"><b>Events I've Joined</b></span>\
            </div>\
        </div>",
    created: function() {
        let admined = getEventsAdminRequest();
        if (!admined.error) {
            hubData.admined = admined;
        }
    },
    data: function() {
        return hubData;
    }
};

const createEvent = {
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
};

const settings = {
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
};

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