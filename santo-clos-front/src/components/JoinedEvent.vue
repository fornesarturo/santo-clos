<template>
    <div v-on:click="showModalFunct" class="santoClosEvent">
        <div class="name">{{ name }}</div>
        <div class="date">{{ date }}</div>
        <div class="admin">Hosted by: &nbsp;&nbsp; {{ hostname }} </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "JoinedEvent",
    props: ['name', 'date', 'id', 'location', 'hostname', 'maxamount'],
    methods: {
        clickedEvent: function () {
            console.log(this.id, this.admin);
        },
        showModalFunct: function() {
            this.$parent.$parent.$parent.showModal = true;
            this.$parent.$parent.$parent.setEventInformationActive();
            this.$parent.$parent.$parent.modalData({ name: this.name, date: this.date, location: this.location, hostName: this.hostname, maxAmount: this.maxamount, eventId: this.eventId, userYouGive: "Mr. Trump"});
        }
    }
}
</script>

