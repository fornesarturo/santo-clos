<template>
    <div class="mainContainer">
        <HostedHub v-on:new-event="newEvent"></HostedHub>
        <JoinedHub></JoinedHub>
    </div>
</template>

<script>
/* eslint-disable */
import HostedHub from "@/components/HostedHub";
import JoinedHub from "@/components/JoinedHub";

export default {
    name: "Hub",
    components: {
        HostedHub, JoinedHub
    },
    methods: {
        newEvent: function() {
            this.$emit('change-to-event');
            location.href = "main#/create-event";
        }
    }
}
</script>
