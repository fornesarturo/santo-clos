<template>
  <div class='eventContainer'>
    <div class='eventWrapper'>
      <form class='createEvent'>
        <span class='mainTitle'><b>Create event</b></span>
          <div class='modal-body'>
            <div class='container col-md-12'>
              <div class='row'>
                <div class='col-md-1'>
                    <img class='glyphicon' src='./../assets/octicons/file-text.svg' width='100%' height='100%'>
                </div>
                <div class='col-md-5'>
                  <div id='eventNameField' class='inputWrapper inputValidate inner-addon left-addon' data-validate='Name cannot be empty'>
                    <input class='inputLine inputRight left-addon' type='text' name='eventName' placeholder='Name'>
                    <span class='inputFocus'></span>
                  </div>
                </div>
                <div class='col-md-1'>
                    <img class='glyphicon' src='./../assets/octicons/calendar.svg' width='100%' height='100%'>
                </div>
                <div class='col-md-5'>
                  <div id='dateField' class='inputWrapper inputValidate inner-addon left-addon' data-validate='Please select a date'>
                    <input class='inputLine inputRight left-addon' type='date' name='date' placeholder='DD/MM/YY'>
                    <span class='inputFocus'></span>
                  </div>
                </div>
              </div>
              <div class='row'>
                <div class='col-md-1'>
                    <img class='glyphicon' src='./../assets/octicons/location.svg' width='100%' height='100%'>
                </div>
                <div class='col-md-5'>
                  <div id='addressField' class='inputWrapper inputValidate inner-addon left-addon' data-validate='You need a place for your event!'>
                    <input class='inputLine inputRight left-addon' type='text' name='address' placeholder='Location'>
                    <span class='inputFocus'></span>
                  </div>
                 </div>
                <div class='col-md-1'>
                    <img class='glyphicon' src='./../assets/octicons/ruby.svg' width='100%' height='100%'>
                </div>
                <div class='col-md-5'>
                  <div id='maxAmountField' class='inputWrapper inputValidate inner-addon left-addon' data-validate='Please select an amount'>
                    <input class='inputLine inputRight left-addon' type='text' name='maxAmount' placeholder='Spending Target'>
                    <span class='inputFocus'></span>
                  </div>
                </div>
              </div>
                <span class='mainSubtitle'>
                  <b>Participants</b>
                </span>
              <form id='eventData'>
                <div class='row'>
                  <div class='col-md-12'>
                    <div id='particicpantEmailField' class='inputWrapper inputValidate inner-addon left-addon' data-validate='Participant email required'>
                      <input class='inputLine inputRight left-addon' type='text' name='participantEmail' placeholder='Participant email'>
                      <span class='inputFocus'></span>
                    </div>
                  </div>
                </div>
                <div class='row'>
                  <div class='col-md-12'>
                    <div id='particicpantEmailField' class='inputWrapper inputValidate inner-addon left-addon' data-validate='Participant email required'>
                      <input class='inputLine inputRight left-addon' type='text' name='participantEmail' placeholder='Participant email'>
                      <span class='inputFocus'></span>
                    </div>
                  </div>
                </div>
                <div>
                  <NewParticipant class='inputLine' v-for='i in items' v-bind:key='i.id' v-bind:id='i.id' v-model='i.value' v-on:remove-item='remove($event)'></NewParticipant>
                </div>
              </form>
            </div>
          </div>
      </form>
      <div class='row'>
        <div class='col-md-6'>
        </div>
        <div class='col-md-6'>
          <input type='button' id='addParticipantButton' v-on:click='add()' value='Add Participant' class='loginOnly btn btn-lg btn-primary btn-block'>
        </div>
      </div>
      <br><br><br>
      <input type='button' id='createEventButton' value='Create Event' class='loginOnly btn btn-lg btn-primary btn-block' onclick='createEventRequestMain()'>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import NewParticipant from '@/components/NewParticipant';
import './../assets/vendor/sha256/sha256.js'
const request = require('./requests/requests_main')
const $ = require('jquery')

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

export default {
    name: 'CreateEvent',
    components: {
        NewParticipant
    },
    data: function() {
        return {
            n: 0,
            items: []
            }
    },
    methods: {
        createEventRequest: function () {
          var participantsRaw = $("#eventData").serializeArray()
          let participantsArray = []
          for(let i = 0; i < participantsRaw.length; i++) {
            if(participantsRaw[i].value == "")
              continue
            else
              participantsArray.push({email: participantsRaw[i].value})
          }
          let name = $("#eventNameField input[name='eventName']").val()
          let address = $("#addressField input[name='address'").val()
          let amount = $("#maxAmountField input[name='maxAmount']").val()
          let date = $("#dateField input[name='date']").val()
          request.createEventRequest(name, date, address, amount)
          .then(next => {
            if (next) {
              request.postEventParticipants(participantsArray, next.eventId)
              .then(res => {
                console.log(res)
              })
              this.$router.push('/hub')
            }

          })
        },
        add: function() {
            console.log(this.n);
            this.items.push({id: this.n++, value: ''});
        },
        remove: function(id) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].id == id) {
                    this.items.splice(i, 1);
                }
            }
        },
    }
}
</script>