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

var joinedEventsData = {joined: []};

Vue.component('joined-hub', {
    template: "<div class=\"hubWrapper\">\
            <span class=\"mainTitle\"><b>Events I've Joined</b></span>\
            <joined-event v-for=\"event in joined\" v-bind:name=\"event.name\" v-bind:date=\"event.eventDate\" v-bind:id=\"event.eventId\" v-bind:admin=\"event.admin\"></joined-event>\
            </div>",
    data: function() {
        return joinedEventsData;
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
        let fullURL = "/api/json/user/joinedEvents";

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

var hostedEventsData = {admined: []};

Vue.component('hosted-hub', {
    template: "<div class=\"hubWrapper\">\
            <span class=\"mainTitle\"><b>Events I Host</b></span>\
            <hosted-event v-for=\"event in admined\" v-bind:name=\"event.name\" v-bind:date=\"event.eventDate\" v-bind:id=\"event.eventId\"></hosted-event>\
            <div class=\"createEventButton\" v-on:click=\"createNewEvent\"><i class=\"fas fa - plus\"></i></div>\
            </div>",
    methods: {
        createNewEvent: function () {
            location.href = "main#/create-event";
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
        let fullURL = "/api/json/user/events";

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
        return hostedEventsData;
    }
});

const hub = {
    template: "<div class=\"mainContainer\">\
                <hosted-hub></hosted-hub>\
                <joined-hub></joined-hub>\
            </div>"
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