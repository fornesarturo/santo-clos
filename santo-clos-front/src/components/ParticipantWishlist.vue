<template>
    <div>
        <li v-for="participant in participants" v-bind:key="participant.id">
            <div class="row">
                <div class="col-md-8">
                    <b class="mainB"> {{ participant.name }} </b>
                </div>
                <div class="col-md-4">
                    <input type="button" id="checkParticipantWishlist" v-on:click='loadWishlist()' value="View Checklist">
                </div>
            </div>
        </li>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'ParticipantWishlist',
    props: ['participants'],
        methods: {
            loadWishlist: function(){
                // wat to do?
            }
    }
}
</script>

