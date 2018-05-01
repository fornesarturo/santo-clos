<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <span class="mainTitle">
                            <b>{{ name }}</b>
                            <b class="mainSubtitle">Hosted by {{ hostName }}</b>
                            <div class="row">
                                <div class="buttonColumn">
                                    <input type="button" @click="$emit('close')" value="Close" class="loginOnly btn btn-lg btn-danger btn-block">
                                </div>
                                <div class="buttonColumn">
                                    <b v-if='sortDone'></b>
                                    <input type="button" v-else v-on:click='finishEvent()' value="Accept Event" class="loginOnly btn btn-lg btn-success btn-block">
                                </div>
                            </div>
                        </span>
                         <span class="mainB">
                                <b> Date: {{ date }} </b> <br><br>
                                <b> Location: {{ location }}</b> <br><br>
                                <b> Maximum amount to spend: {{ maxAmount }}</b> <br><br>
                                <!-- <button> My Wishlist </button> <br> -->
                                <b v-if='sortDone'> You're buying a gift for {{ userYouGive }} ! </b> <br><br>
                        </span>
                    </div>
                    <div class="modal-body">
                        <div class="container col-md-12">
                            <div v-if='sortDone'>
                                <span class="mainTitle">
                                    <b> {{ userYouGive }}'s wishlist </b><br>
                                </span>
                                <ul>
                                    <li v-for="wish in gifteeList" v-bind:key="wish.wish">
                                        <b class="mainB"> {{ wish.wish}} </b>
                                    </li>
                                </ul>
                            </div>
                            <br>
                            <div v-if='sortDone'>
                                <span class="mainTitle">
                                        <b> Your wishlist </b>
                                    </span>
                                    <div class="row">
                                        <div class="buttonColumn">
                                           <input type="button" id="addWishButton" v-on:click='addWish()' value="New Wish" class="loginOnly btn btn-lg btn-primary btn-block">
                                            <!-- <input type="button" id="addWishButton" v-on:click='addWish()' value="New Wish" class="loginOnly btn btn-lg btn-primary btn-block"> -->
                                        </div>
                                        <div class="buttonColumn">
                                            <input type="button" id="modifyWishlistButton" v-on:click='modifyWishlist()' value="Accept Changes" class="loginOnly btn btn-lg btn-success btn-block">
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                    </div>
                                    <div class="col-md-12">
                                        <NewWish v-for="(w, i) in wishlist" v-bind:key="w.wishId" v-bind:id="i" v-bind:value="w.wish" v-model="w.wish" v-on:remove-wish='removeWish($event)'></NewWish>
                                    </div>
                            </div>
                            <div class="row" v-else>
                                <div class="column">
                                    <span class="mainTitle">
                                        <b> Your wishlist </b>
                                    </span>
                                    <div class="row">
                                        <div class="buttonColumn">
                                            <input type="button" id="addWishButton" v-on:click='addWish()' value="New Wish" class="loginOnly btn btn-lg btn-primary btn-block">
                                        </div>
                                        <div class="buttonColumn">
                                            <input type="button" id="modifyWishlistButton" v-on:click='modifyWishlist()' value="Accept Changes" class="loginOnly btn btn-lg btn-success btn-block">
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                    </div>
                                    <div class="col-md-12">
                                        <NewWish v-for="(w, i) in wishlist" v-bind:key="w.wishId" v-bind:id="i" v-bind:value="w.wish" v-model="w.wish" v-on:remove-wish='removeWish($event)'></NewWish>
                                    </div>
                                </div>
                                <div class="column">
                                    <span class="mainTitle">
                                        <b> Participants </b>
                                    </span>
                                    <input type="button" id="addParticipantButton" v-on:click='add()' value="Add Participant" class="loginOnly btn btn-lg btn-primary btn-block">
                                    <br>
                                    <ul>
                                        <li v-for="p in participants" v-bind:key="p.email" v-bind:email="p.email" v-bind:username="p.username">
                                            <b class="mainB"> {{ p.name }} A.K.A: {{ p.username }} </b>
                                        </li>
                                    </ul>
                                    <NewParticipant v-for="i in items" v-bind:key="i.id" v-bind:id="i.id" v-model="i.value" v-on:remove-item='remove($event)'></NewParticipant>
                                </div>
                            </div>
                        </div>
                        <br><br>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
/* eslint-disable */
import NewParticipant from "@/components/NewParticipant";
import ParticipantWishlist from "@/components/ParticipantWishlist";
import NewWish from "@/components/NewWish";
const request = require('./requests/requests_main');

export default {
  name: "Modal",
  components: {
      NewParticipant, ParticipantWishlist, NewWish
  },
  props: [
    "name",
    "date",
    "location",
    "hostName",
    "userYouGive",
    "maxAmount",
    "eventId",
    "wishlist",
    "participants",
    "gifteeList",
    "sortDone",
    "parentComponent"
  ],
  data: function() {
    return {
      n: 0,
      items: []
    };
  },
//   updated: function() {
//       this.sortDoneCopy = this.sortDone;
//       console.log(this.sortDoneCopy, this.sortDone);
//   },
  methods: {
    createEventRequest: function() {},
    add: function() {
      this.items.push({ id: this.n++, value: "" });
    },
    remove: function(id) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].id == id) {
          this.items.splice(i, 1);
        }
      }
    },
    addWish: function(){
        if(this.wishlist.length-1 >= 0) 
            this.wishlist.push({wishId: parseInt(this.wishlist[this.wishlist.length-1].wishId)+1, wish: ""});
        else 
            this.wishlist.push({wishId: 1, wish: ""});
    },
    removeWish: function(id){
        console.log(id);
        this.wishlist.splice(id, 1);
        console.log(JSON.stringify(this.wishlist));
    },
    finishEvent: function(){
        request.startEvent(this.eventId).then(
            (success) => {
                if(success == true) {
                    this.$emit("update:sortDone", true);
                    this.parentComponent.updateSortDone();
                }
            }
        )
        // MOVE TO BUTTON v
        let emails = [];
        this.items.forEach((element) => {
            emails.push({"email": element.value});
        });
        request.postEventParticipants(this.eventId, emails);

    },
    modifyWishlist: function() {
        // Logic to change wishlist to database
        request.putAllWishes(this.eventId, this.wishlist);
    }
  }
};
</script>