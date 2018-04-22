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
const request = require('./requests/requests_main');
import '@/assets/vendor/js-cookie/js-cookie.js';

export default {
    name: 'HostedEvent',
    props: ['name', 'date', 'id', 'location', 'hostName', 'maxAmount', 'wishlist'],
    methods: {
        clickedEvent: function() {
            console.log(this.id);
        },
        showModalFunct: function() {
            this.$parent.$parent.$parent.showModal = true;
            // /api/event/wishlist?id={eventId}&user={username}
            request.getMyWishlist(this.id).then(
                (resMyWishlist) => {
                    console.log(resMyWishlist);
                    request.getUsersFromEvent(this.id).then(
                        (resUsers) => {
                            let resUsersExcl = [];
                            let myGifteeUsername;
                            for(let i in resUsers) {
                                if(resUsers[i].username != Cookies.get("current_user")) {
                                    resUsersExcl.push(resUsers[i]);
                                }
                                else {
                                    myGifteeUsername = resUsers[i].giftee || "Mr. Trump";
                                }
                            }
                            console.log(resUsersExcl);

                            this.$parent.$parent.$parent.modalData(
                                { 
                                    name: this.name, 
                                    date: this.date, 
                                    location: this.location, 
                                    hostName: this.hostName, 
                                    maxAmount: this.maxAmount, 
                                    eventId: this.id, 
                                    userYouGive: myGifteeUsername,
                                    gifteeList: 
                                        [{id: 0, value: 'asfas'},
                                        {id: 1, value: 'ggggggg'},
                                        {id: 2, value: 'uvavvvvvs'}],
                                    participants: resUsersExcl,
                                    wishlist: resMyWishlist
                                }
                            );
                        }
                    );
                }
            );
            //this.$parent.$parent.$parent.setEventInformationActive();
            
        }
    }
}
</script>

