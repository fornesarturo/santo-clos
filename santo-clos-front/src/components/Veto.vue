<template>
    <div class="row">
        <div class="col-md-11">
            <ul>
                <li v-for="p in participants" v-bind:key="p.email" v-bind:email="p.email" v-bind:username="p.username">
                    <b v-if="validateParticipant()" class="mainB"> {{ p.name }} A.K.A: {{ p.username }} </b>
                </li>
            </ul>
        </div>
        <div class="col-md-1">
            <input type="button" v-on:click=remove value="X" class="btn btn-danger">
        </div>
    </div>
</template>

<script>
/* eslint-disable */
    export default {
        name: 'NewParticipant',
        props: ["hostName","participants"],
        methods: {
            validateParticipant: function(hostName, participant){
                return (hostName != participant);
            }
        }
    }
</script>