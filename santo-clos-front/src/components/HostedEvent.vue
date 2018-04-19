<template>
    <div v-on:click="showModalFunct" class="santoClosEvent">
        <div class="name">{{ name }}</div>
        <div class="date">{{ date }}</div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'HostedEvent',
    props: ['name', 'date', 'id', 'location', 'hostName', 'maxAmount', 'wishlist'],
    methods: {
        clickedEvent: function() {
            console.log(this.id);
        },
        showModalFunct: function() {
            this.$parent.$parent.$parent.showModal = true;
            this.$parent.$parent.$parent.setEventInformationActive();
            this.$parent.$parent.$parent.modalData({ name: this.name, date: this.date, location: "El caribe", hostName: "John Cena", maxAmount: "100", eventId: this.eventId, userYouGive: "Mr. Trump", wishlist: "Condones, google.com/imagen=penesenormes"});
        }
    }
}
</script>

