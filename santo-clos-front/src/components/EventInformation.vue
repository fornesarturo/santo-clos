<template>
<div class="mainContainer">
            <div class="mainWrapper">
                <form class="settings">
                    <span class="mainTitle">
                        <b> {{ evtName }}  </b>
                    </span>
                    <span class="mainSubtitle">
                        <b> Hosted by {{ evtHostName }}</b>
                    </span>
                    <div class="row">
                        <div class="container col-md-6">
                            <b class="mainB"> Location: {{ evtLocation }} </b>
                            <b class="mainB"> Max Amount: {{ evtMaxAmount }} </b>
                            <button> My Wishlist </button>
                            <b class="mainB"> You're buying a gift for {{ evtUserYouGive }} ! </b>
                        </div>
                        <div class="container col-md-6">
                            <ParticipantWishlist></ParticipantWishlist>
                        </div>
                    </div>
                </form>
            </div>
</div>
</template>

<script>
/* eslint-disable */
import ParticipantWishlist from "@/components/ParticipantWishlist";

export default {
    name: 'EventInformation',
    props: ['evtName', 'evtLocation', 'evtHostName', 'evtUserYouGive', 'evtMaxAmount'],
    components: {
        ParticipantWishlist
    }
};
</script>

