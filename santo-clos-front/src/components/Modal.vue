<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <span class="mainTitle">
                            <b>{{ name }}</b>
                        </span>
                        <span class="mainSubtitle">
                            <b>Hosted by {{ hostname }}</b>
                        </span>
                    </div>
                    <div class="modal-body">
                        <div class="container col-md-10">
                            <span class="mainB">
                                <b> Date: {{ date }} </b> <br><br>
                                <b> Location: {{ location }}</b> <br><br>
                                <b> Maximum amount to spend: {{ maxamount }}</b> <br><br>
                                <!-- <button> My Wishlist </button> <br> -->
                                <b> You're buying a gift for {{ useryougive }} ! </b> <br><br>
                            </span>
                            <hr>
                            <span class="mainTitle">
                                <b> {{ useryougive }}'s wishlist </b><br>
                            </span>
                            <ul>
                                <li v-for="wish in gifteelist" v-bind:key="wish.value">
                                    <b class="mainB"> {{ wish.value}} </b>
                                </li>
                            </ul>
                            <hr>
                            <span class="mainTitle">
                                <b> Your wishlist </b>
                            </span>
                             <div class="row">
                            </div>
                            <div class="col-md-12">
                                <NewWish v-for="w in wishlist" v-bind:key="w.id" v-bind:id="w.id" v-bind:value="w.value" v-model="w.value" v-on:remove-wish='removeWish($event)'></NewWish>
                            </div>
                            <div class="col-md-12">
                                <input type="button" id="addWishButton" v-on:click='addWish()' value="New Wish" class="loginOnly btn btn-lg btn-primary btn-block">
                            </div>
                            <hr>
                             <span class="mainTitle">
                                <b> Participants </b>
                            </span>
                            <div class="col-md-12">
                                <NewParticipant v-for="i in items" v-bind:key="i.id" v-bind:id="i.id" v-model="i.value" v-on:remove-item='remove($event)'></NewParticipant>
                            </div>
                            <ul>
                                <li v-for="p in participants" v-bind:key="p.id" v-bind:wishlist="p.wishlist" v-bind:name="p.name">
                                    <b class="mainB"> {{ p.id}} </b>
                                </li>
                            </ul>
                        </div>
                        <br>
                        <div class="col-md-12">
                                <input type="button" id="addParticipantButton" v-on:click='add()' value="Add Participant" class="loginOnly btn btn-lg btn-primary btn-block">
                        </div>
                        <div class="container col-md-6">
                            <ParticipantWishlist></ParticipantWishlist>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <input type="button" @click="$emit('close')" value="Close" class="loginOnly btn btn-lg btn-primary btn-block">
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
export default {
  name: "Modal",
  components: {
      NewParticipant, ParticipantWishlist, NewWish
  },
  props: [
    "name",
    "date",
    "location",
    "hostname",
    "useryougive",
    "maxamount",
    "eventid",
    "wishlist",
    "participants",
    "gifteelist"
  ],
  data: function() {
    return {
      n: 0,
      items: []
    };
  },
  methods: {
    createEventRequest: function() {},
    add: function() {
      console.log(this.n);
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
        var abc = this.wishlist.length;
        console.log(abc);
        for(var w in this.wishlist){
            console.log(w);
        }
        this.wishlist.push({id: abc, value: ""});
    },
    removeWish: function(id){
        for (let i = 0; i < this.wishlist.length; i++){
            if (this.wishlist[i].id == id){
                this.wishlist.splice(i, 1);
            }
        }
    }
  }
};
</script>