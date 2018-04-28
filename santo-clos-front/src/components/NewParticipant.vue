<template>
    <div class="row">
        <div class="col-md-11">
            <div id="particicpantEmailField" class="inputWrapper inputValidate" data-validate="Participant's email required">
                <input class="inputRight" type="text" name="participantEmail" placeholder="Participant's email" v-bind:value='value' v-on:input='updateValue($event.target.value)'>
                <span class="inputFocus"></span>
            </div>
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
    props: ["id", "value"],
    methods: {
        remove: function() {
            this.$emit('remove-item', this.id);
        },
        updateValue: function(value) {
            this.$emit('input', value);
        }
    }
}
</script>

