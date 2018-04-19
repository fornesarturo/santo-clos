/* eslint-disable */
const $ = require('jquery')
window.jQuery = $
window.Popper = require('popper.js')
require('bootstrap')

$("#logoutButton").click(() => {
    Cookies.remove("current_user");
    Cookies.remove("token");
    location.href = "/logout";
});