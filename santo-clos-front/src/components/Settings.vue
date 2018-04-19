<template>
  <div class="mainContainer">
    <div class="mainWrapper">
      <form class="settings">
        <span class="mainTitle"><b>Settings</b></span>
        <div class="fields">
          <fieldset>
            <div id="nameField" class="inputWrapper inputValidate" data-validate="Name cannot be empty">
              <input class="inputLine" type="text" name="newName" placeholder="New Name">
              <span class="inputFocus"></span>
            </div>
            <div>
              <input type="button" id="confirmButtonName" value="Save New Name" class="btn btn-lg btn-primary btn-block">
            </div>
            <br>
            <div id="oldPasswordField" class="inputWrapper passwordValidate" data-validate="Must type old password">
              <input class="inputLine" type="password" name="oldPassword" placeholder="Old Password">
              <span class="inputFocus"></span>
            </div>
            <div id="newPasswordField" class="inputWrapper passwordValidate" data-validate="Minimum of 8 characters, at least one uppercase, one lowercase, one digit and one special">
              <input class="inputLine" type="password" name="newPassword" placeholder="New Password">
              <span class="inputFocus"></span>
            </div>
            <div id="newPasswordConfirmationField" class="inputWrapper passwordValidate" data-validate="Passwords must match">
              <input class="inputLine" type="password" name="newConfirmPassword" placeholder="Confirm New Password">
              <span class="inputFocus"></span>
            </div>
            <div>
              <input type="button" id="confirmButtonPassword" value="Save New Password" class="btn btn-lg btn-primary btn-block">
            </div>
            <br>
            <div id="newEmailField" class="inputWrapper inputValidate" data-validate = "Valid email is required: ex@abc.xyz">
              <input class="inputLine" type="email" name="newEmail" placeholder="New email">
              <span class="inputFocus"></span>
            </div>
            <div>
              <input type="button" id="confirmButtonEmail" value="Save New Email" class="btn btn-lg btn-primary btn-block">
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'Settings'
}
</script>

