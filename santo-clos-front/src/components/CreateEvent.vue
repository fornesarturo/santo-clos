<template>
  <div class='eventContainer'>
    <div class='eventWrapper'>
      <form class='createEvent'>
        <span class='mainTitle'><b>Create event</b></span>
          <div class='modal-body'>
            <div class='container col-md-12'>
              <div class='row'>
                <div class='col-md-6'>
                  <div id='eventNameField' class='inputWrapper inputValidate inner-addon left-addon' data-validate='Name cannot be empty'>
                    <img class='glyphicon' src='octicons/file-text.svg' width='100%' height='100%'>
                    <input class='inputRight left-addon' type='text' name='eventName' placeholder='Event name'>
                    <span class='inputFocus'></span>
                  </div>
                 </div>
                <div class='col-md-6'>
                  <div id='dateField' class='inputWrapper inputValidate inner-addon left-addon' data-validate='Please select a date'>
                    <img class='glyphicon ' src='octicons/calendar.svg' width='100%' height='100%'>
                    <input class='inputRight left-addon' type='date' name='date' placeholder='DD/MM/YY'>
                    <span class='inputFocus'></span>
                  </div>
                </div>
              </div>
              <div class='row'>
                <div class='col-md-6'>
                  <div id='addressField' class='inputWrapper inputValidate inner-addon left-addon' data-validate='You need a place for your event!'>
                    <img class='glyphicon' src='octicons/location.svg' width='100%' height='100%'>
                    <input class='inputRight left-addon' type='text' name='address' placeholder='Event location'>
                    <span class='inputFocus'></span>
                  </div>
                 </div>
                <div class='col-md-6'>
                  <div id='maxAmountField' class='inputWrapper inputValidate inner-addon left-addon' data-validate='Please select an amount'>
                     <img class='glyphicon' src='octicons/ruby.svg' width='100%' height='100%'>
                    <input class='inputRight left-addon' type='text' name='maxAmount' placeholder='Maximum amount to spend'>
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
                      <input class='inputRight left-addon' type='text' name='participantEmail' placeholder='Participant email'>
                      <span class='inputFocus'></span>
                    </div>
                  </div>
                </div>
                <div class='row'>
                  <div class='col-md-12'>
                    <div id='particicpantEmailField' class='inputWrapper inputValidate inner-addon left-addon' data-validate='Participant email required'>
                      <input class='inputRight left-addon' type='text' name='participantEmail' placeholder='Participant email'>
                      <span class='inputFocus'></span>
                    </div>
                  </div>
                </div>
                <div>
                  <NewParticipant v-for='i in items' v-bind:key='i.id' v-bind:id='i.id' v-model='i.value' v-on:remove-item='remove($event)'></NewParticipant>
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
        createEventRequest: function () { },
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