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
    data: function() {
        return {
            sortDoneCopy: this.sortDone
        };
    },
    props: ['name', 'date', 'id', 'location', 'hostName', 'maxAmount', 'wishlist', 'sortDone'],
    methods: {
        updateSortDone: function() {
            this.$emit("update:sortDone", true);
        },
        updateUserYouGive: function(giftee) {
            this.$emit("update:sortDone", giftee);
        },
        showModalFunct: function() {
            // /api/event/wishlist?id={eventId}&user={username}
            request.getMyWishlist(this.id).then(
                (resMyWishlist) => {
                    // for(let wishId in resMyWishlist) {
                    //     resMyWishlist[wishId].id = wishId;
                    // }

                    request.getUsersFromEvent(this.id).then(
                        (resUsers) => {
                            let myGifteeUsername;
                            for(let i in resUsers) {
                                myGifteeUsername = resUsers[i].giftee;
                            }
                            let modalStarted;
                            if(this.sortDone== false) {
                                // this.eventStartedCopy = false;
                                this.$emit("update:sortDone", false);
                            }
                            else if(this.sortDone == true) {
                                // this.eventStartedCopy = true;
                                this.$emit("update:sortDone", true);
                            }

                            request.getWishlist(this.id, myGifteeUsername).then(
                                (resGifteeWishlist) => {
                                    let data = { 
                                        parentComponent: this,
                                        sortDone: this.sortDone,
                                        name: this.name, 
                                        date: this.date, 
                                        location: this.location, 
                                        hostName: this.hostName, 
                                        maxAmount: this.maxAmount, 
                                        eventId: this.id, 
                                        userYouGive: myGifteeUsername,
                                        gifteeList: resGifteeWishlist,
                                        participants: resUsers,
                                        wishlist: resMyWishlist
                                    }
                                    this.$parent.$parent.$parent.modalData(data);
                                    this.$parent.$parent.$parent.showModal = true;
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

