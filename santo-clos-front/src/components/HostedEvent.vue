<template>
    <!--
    <div v-on:click="showModalFunct" class="santoClosEvent">
        <div class="name">{{ name }}</div>
        <div class="date">{{ date }}</div>
    </div> !-->
    <div v-on:click="showModalFunct" class="santoClosEvent">
        <div class="name"> {{ name }} </div>
        <div class="date"> {{ date }}</div>
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
            //this.$parent.$parent.$parent.setEventInformationActive();
            this.$parent.$parent.$parent.modalData(
                { 
                    name: this.name, 
                    date: this.date, 
                    location: this.location, 
                    hostName: this.hostName, 
                    maxAmount: this.maxAmount, 
                    eventId: this.eventId, 
                    userYouGive: "Mr. Trump",
                    gifteeList: 
                        [{id: 0, value: 'asfas'},
                        {id: 1, value: 'ggggggg'},
                        {id: 2, value: 'uvavvvvvs'}],
                    participants: 
                        [{id: "abcd", name:"juan", wishlist:"pan"},
                        {id: "funcionaporfis", name:"pepito", wishlist:"pito"}], 
                    wishlist: 
                        [{id: 0, value: 'gansito'},
                        {id: 1, value: 'manjar'},
                        {id: 2, value: 'uvas'}]
                }
            );
            console.log(this.hostName);
        }
    }
}
</script>

