<template>
    <div class="row">
        <div class="col-md-1 offset-sm-3" >
            <input type="checkbox" class="double">
        </div>
        <div class="col-md-8">
            <ul>
                <li v-for="p in participants" v-bind:key="p.email" v-bind:email="p.email" v-bind:username="p.username">
                    <h2 v-if="validateParticipant(p.username)"> {{ p.name }} A.K.A: {{ p.username }} </h2>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
/*<li v-for="p in participants" v-bind:key="p.email" v-bind:email="p.email" v-bind:username="p.username">
                    <b v-if="validateParticipant()" class="mainB"> {{ p.name }} A.K.A: {{ p.username }} </b>
                </li>*/
    import CheckboxRadio from 'vue-checkbox-radio';
    export default {
        name: 'Veto',
        props: ["hostname","participants"],
        components: {
            CheckboxRadio
        },
        methods: {
            validateParticipant: function(participant){
                return (this.hostname != participant);
            }
        }
    }
</script>
<style>
.double {
  zoom: 1.5;
  transform: scale(1.5);
  -ms-transform: scale(1.5);
  -webkit-transform: scale(1.5);
  -o-transform: scale(1.5);
  -moz-transform: scale(1.5);
  transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  -o-transform-origin: 0 0;
  -moz-transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
  vertical-align: middle;
}
</style>
