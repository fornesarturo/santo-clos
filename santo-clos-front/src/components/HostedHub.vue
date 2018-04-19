<template>
    <div class="hubWrapper">
        <span class="mainTitle"><b>Events I Host</b></span>
        <HostedEvent v-for="event in admined" v-bind:key="event.eventId" v-bind:maxamount="event.amount" v-bind:hostname="event.admin" v-bind:location="event.address" v-bind:name="event.name" v-bind:date="event.eventDate" v-bind:id="event.eventId"></HostedEvent>
        <div class="createEventButton" v-on:click="createNewEvent">
            <i class="fas fa - plus"></i>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import HostedEvent from "@/components/HostedEvent";

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
    let fullURL = "/api/user/events";

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
    return {admined: []};
    }
}
</script>

