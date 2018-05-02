<template>
    <div class="hubWrapper">
        <span class="mainTitle">
            <b>Events I've Joined</b>
        </span>
        <JoinedEvent v-for="event in joined" v-bind:key="event.eventId" v-bind:maxAmount="event.amount" v-bind:hostname="event.admin" v-bind:location="event.address" v-bind:name="event.name" v-bind:date="event.eventDate" v-bind:id="event.eventId"></JoinedEvent>
    </div>
</template>

<script>
/* eslint-disable */
import JoinedEvent from "@/components/JoinedEvent";
const request = require('./requests/requests_main');

export default {
    name: 'JoinedHub',
    data: function() {
        return { joined: [] };
    },
    created: function() {
        request.getJoinedEventsRequest().then(
            (res) => {
                this.joined = res;
            }
        )
    },
    components: {
        JoinedEvent
    }
}
</script>

