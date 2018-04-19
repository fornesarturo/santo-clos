/* eslint-disable */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

const $ = require('jquery');
window.jQuery = $;
window.Popper = require('popper.js')
require('bootstrap');

import './assets/vendor/animate/animate.css'
import './assets/vendor/css-hamburgers/hamburgers.css'
import './assets/vendor/sha256/sha256.js'
import './assets/vendor/js-cookie/js-cookie.js'
import './assets/vendor/bootstrap/css/bootstrap.css'
// import './assets/vendor/bootstrap/js/popper.js'
// import './assets/vendor/bootstrap/js/bootstrap.js'
// import './assets/vendor/bootstrap/js/tooltip.js'

import './assets/css/index.css'
import './assets/css/main.css'
import './assets/css/modal.css'
import './assets/css/setup.css'

// import './assets/js/index.js'
// import './assets/js/main.js'
// import './assets/js/logout.js'
// import './assets/js/requests_index.js'
// import './assets/js/requests_main.js'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
