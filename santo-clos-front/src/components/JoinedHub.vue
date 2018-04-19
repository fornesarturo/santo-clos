<template>
    <div class="hubWrapper">
        <span class="mainTitle">
            <b>Events I've Joined</b>
        </span>
        <JoinedEvent v-for="event in joined" v-bind:key="event.eventId" v-bind:maxamount="event.amount" v-bind:hostname="event.admin" v-bind:location="event.address" v-bind:name="event.name" v-bind:date="event.eventDate" v-bind:id="event.eventId"></JoinedEvent>
    </div>
</template>

<script>
/* eslint-disable */
import JoinedEvent from "@/components/JoinedEvent";

export default {
    name: 'JoinedHub',
    data: function() {
        return { joined: [] };
    },
    created: function() {
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
        let fullURL = "/api/user/joinedEvents";

        fetch(fullURL, options)
            .then(res => res.json())
            .then(resJSON => {
                if (resJSON.data) {
                    this.joined = resJSON.data;
                }
                else console.log(resJSON);
            });
    },
    components: {
        JoinedEvent
    }
}
</script>

