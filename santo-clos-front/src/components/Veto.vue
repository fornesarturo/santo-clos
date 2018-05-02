<template>
    <div class="row">
        <div class="col-md-12">
            <ul>
                <li v-for="p in participants" v-bind:key="p.email" v-bind:email="p.email" v-bind:username="p.username" v-bind:checkedItem="p.checkedItem" v-if="processDone">
                    <div class="row">
                        <div class="col-md-2 offset-sm-2" v-if="p.checkedItem">
                            <input v-if="validateParticipant(p.username)" v-bind:value="p.username" type="checkbox" class="double inputVeto" v-on:change="changeStatus($event.target.value)" checked>
                        </div>
                        <div class="col-md-2 offset-sm-2" v-else>
                            <input v-if="validateParticipant(p.username)" v-bind:value="p.username" type="checkbox" class="double inputVeto" v-on:change="changeStatus($event.target.value)">
                        </div>
                        <div class="col-md-8">
                            <h2 v-if="validateParticipant(p.username)"> {{ p.name }} A.K.A: {{ p.username }} </h2>
                        </div>
                    </div>
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
    import CheckboxRadio from 'vue-checkbox-radio'
    export default {
        name: 'Veto',
        props: ["hostname", "participants", "checked"],
        data: function() {
            return {
                processDone:false
            };
        },
        created: function() {
            this.participants.forEach(participant => {
                if(this.checked.includes(participant.username)) {
                    participant.checkedItem = true;
                }
                else {
                    participant.checkedItem = false;
                }
            })
            this.processDone = true;
        },
        components: {
            CheckboxRadio
        },
        methods: {
            validateParticipant: function(participant){
                return (this.hostname != participant)
            },
            changeStatus: function(value) {
                console.log("OnChangeCalled: ", value)
      	        this.$emit('changecheck', value)
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
