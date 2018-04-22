/* eslint-disable */
<template>
  <div class="pageBG" id="main">
    <div v-if='loggedIn'>
    <nav class="navbar sticky-top navbar-expand-sm navbar-dark bg-dark" v-bind:id="activeView" v-on:click.prevent>
      <a class="navbar-brand" v-on:click="setHubActive()">
      <router-link to="/hub">
        <img src="static/images/santo_clos.png" width="200" height="50" alt="Santo Clos">
      </router-link>
      </a>
      <button class="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerSantoClos" aria-controls="navbarTogglerSantoClos" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerSantoClos">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a href="#" id="hub" v-on:click="setHubActive()">
              <router-link to="/hub">Home</router-link>
            </a>
          </li>
          <li class="nav-item active">
            <a href="#" id="create-event" v-on:click="setCreateEventActive()">
              <router-link to="/create-event">Create Event</router-link>
            </a>
          </li>
          <li class="nav-item active">
            <a href="#" id="settings" v-on:click="setSettingsActive()">
              <router-link to="/settings">Settings</router-link>
            </a>
          </li>
            <button type="button" id="logoutButton" class="nav-item" v-on:click="logoutFunction()">
              <a href="#"> Log Out </a>
            </button>
        </ul>
      </div>
    </nav>
    <Modal v-if="showModal" @close="showModal = false" v-bind:gifteelist="eventModal.gifteelist" v-bind:name="eventModal.name" v-bind:date="eventModal.date" v-bind:location="eventModal.location" v-bind:hostname="eventModal.hostName" v-bind:useryougive="eventModal.userYouGive" v-bind:maxamount="eventModal.maxAmount" v-bind:eventid="eventModal.eventId" v-bind:wishlist="eventModal.wishlist">
    </Modal>
    </div>
    <router-view @login-setActive ="setLoginActive()" @login-event="setLogin()" @change-to-event="setCreateEventActive()" @change-to-hub="setHubActive()"></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import Modal from '@/components/Modal'
import '@/assets/vendor/js-cookie/js-cookie.js'
const request = require('./components/requests/requests_main')

export default {
  name: "App",
  components: {
    Modal
  },
  data: () => {
    return {
      loggedIn: false,
      activeView: 'hub',
      adminedEvents: {},
      n: 0,
      items: [],
      showModal: false,
      eventModal: {}
    }
  },
  methods: {
    setLogin: function() {
      this.loggedIn = true
    },
    setLoginActive: function() {
      this.activeView = "login";
    },
    setHubActive: function() {
      this.activeView = "hub"
    },
    setCreateEventActive: function() {
      this.activeView = "create-event"
    },
    setSettingsActive: function() {
      this.activeView = "settings"
    },
    setServicesActive: function() {
      this.activeView = "services"
    },
    setEventInformationActive: function() {
      this.activeView = "eventInformation"
      location.href = "main#/eventInformation"
    },
    modalData: function(data) {
      this.eventModal = data
      console.log(this.eventModal.maxAmount)
    },
    logoutFunction: function() {
      Cookies.remove("current_user");
      Cookies.remove("token");
      this.loggedIn = false;
      console.log("logging out");
      location.href = "/logout";
      this.activeView = "login";
    }
  },
  mounted() {

    if(this.activeView != "login") {
      console.log("hello");
      request.checkIfLoggedIn().then(
        (logged) => {
          console.log(logged);
          if(logged) this.loggedIn = true;
          else {
            this.logoutFunction()
          }
        }
      );
    }
  }
};
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';
@import './assets/vendor/animate/animate.css';
@import './assets/vendor/css-hamburgers/hamburgers.css';
@import './assets/css/main.css';
@import './assets/css/index.css';
@import './assets/css/modal.css';
@import './assets/css/setup.css';

</style>
