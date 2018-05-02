$("#logoutButton").click(() => {
    Cookies.remove("current_user");
    Cookies.remove("token");
    location.href = "/logout";
});