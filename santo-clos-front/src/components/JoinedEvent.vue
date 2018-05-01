<template>
    <div v-on:click="showModalFunct" class="santoClosEvent">
        <div class="name">{{ name }}</div>
        <div class="date">{{ date }}</div>
        <div class="admin">Hosted by: &nbsp;&nbsp; {{ hostname }} </div>
    </div>
</template>

<script>
/* eslint-disable */
const request = require('./requests/requests_main');
import '@/assets/vendor/js-cookie/js-cookie.js';

export default {
    name: "JoinedEvent",
    data: function(){
        return{
            sortDoneCopy: this.sortDone
        };
    },
    props: ['name', 'date', 'id', 'location', 'hostname', 'maxamount', 'wishlist', 'sortDone'],
    methods: {
        updateSortDone: function(){
            this.$emit("update:sortDone", true);
        },
        showModalFunct: function() {
            this.$parent.$parent.$parent.showModal = true;
            
            request.getMyWishlist(this.id).then(
                (resMyWishList) => {
                    request.getUsersFromEvent(this.id).then(
                        (resUsers) => {
                            let resUsersExcl = [];
                            let myGifteeUsername;
                            for(let i in resUsers){
                                if(resUsers[i].username != Cookies.get("current_user")){
                                    resUsersExcl.push(resUsers[i]);
                                }else{
                                    myGifteeUsername = resUsers[i].giftee || "lafercho";
                                }
                            }
                            let modalStarted;
                            if(this.sortDone == false){
                                this.$emit("update:sortDone", false);
                            }else if(this.sortDone){
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
                                        participants: resUsersExcl,
                                        wishlist: resMyWishlist
                                    }
                                    this.$parent.$parent.$parent.modalData(data);
                                }
                            );
                        }
                    );
                }
            );
        }
    }
}
</script>

