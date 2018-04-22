<template>
    <div class="hubWrapper">
        <span class="mainTitle"><b>Events I Host</b></span>
        <HostedEvent v-for="event in admined"
            v-bind:key="event.eventId"
            v-bind:maxAmount="event.amount"
            v-bind:hostName="event.admin"
            v-bind:location="event.address"
            v-bind:name="event.name"
            v-bind:date="event.eventDate"
            v-bind:id="event.eventId"
            v-bind:sortDone.sync="event.started">
        </HostedEvent>
        <div class="createEventButton" v-on:click="createNewEvent">
            <i class="fas fa - plus"></i>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import HostedEvent from "@/components/HostedEvent";
const request = require('./requests/requests_main');

export default {
    name: 'HostedHub',
    components: {
        HostedEvent
    },
    methods: {
        createNewEvent: function () {
            this.$emit('new-event');
        }
    },
    created: function () {
        request.getEventsAdminRequest().then(
            (res) => {
                this.admined = res;
            }
        )
    },
    data: function () {
        return {admined: []};
    }
}
</script>

