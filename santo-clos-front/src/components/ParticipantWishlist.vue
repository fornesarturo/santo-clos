<template>
    <div>
        <li v-for="participant in participants" v-bind:key="participant.id" v-bind:wishlist="participant.wishlist">
            <div class="row">
                <div class="col-md-8">
                    <b class="mainB"> {{ participant.name }} </b>
                    <input type="button">
                </div>
                <div class="col-md-4">
                    <b class="mainB"> {{ participant.wishlist }} </b>
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
}
</script>

