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
                                            <input type="button" v-else v-on:click='finishEvent()' value="PUBLISH" class="loginOnly btn btn-lg btn-success btn-block">
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
                                <span class="mainTitle">
                                        <b>Participants</b>
                                </span>
                                <ul>
                                    <li v-for="p in participants" v-bind:key="p.email" v-bind:email="p.email" v-bind:username="p.username">
                                        <b class="mainB"> {{ p.name }} A.K.A: {{ p.username }} </b><br>
                                    </li>
                                </ul>
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
                                    <div class="row">
                                        <div class="buttonColumn">
                                            <input type="button" id="addParticipantButton" v-on:click='add()' value="Add Participant" class="loginOnly btn btn-lg btn-primary btn-block">
                                        </div>
                                        <div class="buttonColumn">
                                            <input type="button" v-on:click='finishParticipants()' value="Invite Participants" class="loginOnly btn btn-lg btn-success btn-block">
                                        </div>
                                    </div>
                                    <br>
                                    <ul>
                                        <li v-for="p in participants" v-bind:key="p.email" v-bind:email="p.email" v-bind:username="p.username">
                                            <b class="mainB"> {{ p.name }} A.K.A: {{ p.username }} </b><br>
                                        </li>
                                    </ul>
                                    <NewParticipant v-for="i in items" v-bind:key="i.id" v-bind:id="i.id" v-model="i.value" v-on:remove-item='remove($event)'></NewParticipant>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if='sortDone'></div>
                    <div v-else>
                        <div class="container col-md-12">
                            <span class="mainTitle">
                                <b> Veto </b>
                            </span>
                            <span class="mainSubtitle">
                                <b> Select the people that dislike each other</b>
                            </span>
                        </div>
                        <div class="container col-md-12">
                            <BulmaAccordion
                                :dropdown="true"
                                :icon="'custom'"
                            >
                                <BulmaAccordionItem class="accordionContainer" v-for="p in participants" v-bind:key="p.email" v-bind:email="p.email" v-bind:username="p.username">
                                    <b class="accordionItem" slot="title">{{p.username}}</b>
                                    <div slot="content" v-if="showVetos">
                                        <Veto v-on:changecheck='changeChecked($event, p.username)' v-bind:hostname="p.username" v-bind:participants="participants" v-bind:checked="vetoDictionary[p.username]"></Veto>
                                    </div>
                                </BulmaAccordionItem>
                            </BulmaAccordion>
                        </div><br>
                        <div class="container col-md-12">
                            <input type="button" id="doVetoButton" v-on:click='tryVeto()' value="Do Veto" class="loginOnly btn btn-lg btn-success btn-block">
                        </div><br><br>
                    </div>
                    <div class="row">
                        <div class="container col-md-12">
                            <input type="button" v-on:click='deleteEvent()' value="WARNING: DELETE EVENT" class="btn btn-warning btn-block">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
/* eslint-disable */
/**<Veto v-bind:hostName="p.username" v-bind:participants="participants"> </Veto> */
    import { BulmaAccordion, BulmaAccordionItem } from 'vue-bulma-accordion';
    import NewParticipant from "@/components/NewParticipant";
    import ParticipantWishlist from "@/components/ParticipantWishlist";
    import NewWish from "@/components/NewWish";
    import '@/assets/vendor/js-cookie/js-cookie.js';
    import Veto from "@/components/Veto";
    const request = require('./requests/requests_main');
    
    export default {
        name: "Modal",
        components: {
            NewParticipant,
            ParticipantWishlist,
            NewWish,
            Veto,
            BulmaAccordion,
            BulmaAccordionItem
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
                items: [],
                vetoDictionary: {},
                showVetos: false
            };
        },
        //   updated: function() {
        //       this.sortDoneCopy = this.sortDone;
        //       console.log(this.sortDoneCopy, this.sortDone);
        //   },
        created: function() {
            request.canDraw(this.eventId, false).then((data) => {
                if(data.vetos) {
                    this.vetoDictionary = data.vetos;
                }
                else {
                    let usernames = []
                    for (let participant of this.participants) {
                        usernames.push(participant.username)
                    }
                    for (let participant of usernames) {
                        this.vetoDictionary[participant] = []
                    }
                }
            })
            .then(() => {
                this.showVetos = true;
            });
        },
        methods: {
            createEventRequest: function() {},
            add: function() {
                this.items.push({
                    id: this.n++,
                    value: ""
                });
            },
            remove: function(id) {
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].id == id) {
                        this.items.splice(i, 1);
                    }
                }
            },
            addWish: function() {
                if (this.wishlist.length - 1 >= 0)
                    this.wishlist.push({
                        wishId: parseInt(this.wishlist[this.wishlist.length - 1].wishId) + 1,
                        wish: ""
                    });
                else
                    this.wishlist.push({
                        wishId: 1,
                        wish: ""
                    });
            },
            removeWish: function(id) {
                console.log(id);
                this.wishlist.splice(id, 1);
                console.log(JSON.stringify(this.wishlist));
            },
            finishEvent: function() {
                let myThis = this;
                request.startEvent(this.eventId).then(
                    function(success) {
                        if (success) {
                            myThis.$emit("update:sortDone", true);
                            myThis.parentComponent.updateSortDone();
                            myThis.$emit("update:userYouGive", success[Cookies.get("current_user")]);
                            myThis.parentComponent.updateUserYouGive(success[Cookies.get("current_user")]);
                        }
                    }
                )
            },
            finishParticipants: function() {
                let emails = [];
                this.items.forEach((element) => {
                    emails.push({
                        "email": element.value
                    });
                });
                request.postEventParticipants(this.eventId, emails);
            },
            modifyWishlist: function() {
                // Logic to change wishlist to database
                request.putAllWishes(this.eventId, this.wishlist);
            },
            changeChecked: function(who, owner) {
                if(document.getElementById('doVetoButton').disabled)
                    document.getElementById('doVetoButton').disabled = false;
                if (this.vetoDictionary[owner].indexOf(who) != -1) {
                    this.vetoDictionary[owner].splice(this.vetoDictionary[owner].indexOf(who), 1)
                } else {
                    this.vetoDictionary[owner].push(who)
                }
            },
            tryVeto: function() {
                document.getElementById('doVetoButton').disabled = true;
                request.canDraw(this.eventId, this.vetoDictionary).then((data) => {
                    if(!data) {
                        alert("Impossible veto settings.\nCheck vetos and try again.");
                    }
                    else {
                        alert("Vetos saved");
                    }
                });
            },
            deleteEvent: function() {
                this.$emit('close');
                this.$emit('delete');
                request.deleteEvent(this.eventId);
            }
        }
    };
</script>

<style>
    .accordionItem {
        background: none !important;
    }
    .accordionContainer {
        background-color: #2A8FBB;
    }
</style>
