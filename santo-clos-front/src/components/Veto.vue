<template>
    <div class="row">
        <div class="col-md-10">
            <ul>
                <li v-for="p in participants" v-bind:key="p.email" v-bind:email="p.email" v-bind:username="p.username">
                    <b v-if="validateParticipant(p.username)" class="mainB"> {{ p.name }} A.K.A: {{ p.username }} </b>
                </li>
            </ul>
        </div>
        <div class="col-md-2">
            <b>X</b>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
/*<li v-for="p in participants" v-bind:key="p.email" v-bind:email="p.email" v-bind:username="p.username">
                    <b v-if="validateParticipant()" class="mainB"> {{ p.name }} A.K.A: {{ p.username }} </b>
                </li>*/
    export default {
        name: 'Veto',
        props: ["hostname","participants"],
        methods: {
            validateParticipant: function(participant){
                return (this.hostname != participant);
            }
        },
        created: function(){
            console.log(this.hostname, this.participants);
        }
    }
</script>