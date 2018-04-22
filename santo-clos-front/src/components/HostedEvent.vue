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
                    request.getUsersFromEvent(this.id).then(
                        (resUsers) => {
                            let resUsersExcl = [];
                            let myGifteeUsername;
                            for(let i in resUsers) {
                                if(resUsers[i].username != Cookies.get("current_user")) {
                                    resUsersExcl.push(resUsers[i]);
                                }
                                else {
                                    myGifteeUsername = resUsers[i].giftee || "lafercho";
                                }
                            }
                        
                            request.getWishlist(this.id, myGifteeUsername).then(
                                (resGifteeWishlist) => {
                                    this.$parent.$parent.$parent.modalData(
                                        { 
                                            name: this.name, 
                                            date: this.date, 
                                            location: this.location, 
                                            hostName: this.hostName, 
                                            maxAmount: this.maxAmount, 
                                            eventId: this.id, 
                                            userYouGive: myGifteeUsername,
                                            gifteeList: resGifteeWishlist,
                                            participants: resUsersExcl,
                                            wishlist: resMyWishlist
                                        }
                                    );
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

