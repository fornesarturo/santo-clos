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
                            <b> {{ date }} </b> <br>
                            <b> {{ location }}</b> <br>
                            <b> {{ maxamount }}</b> <br>
                            <button> My Wishlist </button> <br>
                            <b> You're buying a gift for {{ useryougive }} ! </b> <br>
                            <b> Check {{ useryougive }}'s checklist </b>
                            <span class="mainSubtitle">
                                <b> Your wishlist </b>
                            </span>
                            <b> {{ wishlist }}</b> <br><br>
                            <div class="col-md-12">
                                <NewParticipant v-for="i in items" v-bind:key="i.id" v-bind:id="i.id" v-model="i.value" v-on:remove-item='remove($event)'></NewParticipant>
                            </div>
                            <div class="col-md-12">
                                <input type="button" id="addParticipantButton" v-on:click='add()' value="Add Participant" class="loginOnly btn btn-lg btn-primary btn-block">
                            </div>
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
export default {
  name: "Modal",
  components: {
      NewParticipant, ParticipantWishlist
  },
  props: [
    "name",
    "date",
    "location",
    "hostname",
    "useryougive",
    "maxamount",
    "eventid",
    "wishlist"
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
    }
  }
};
</script>