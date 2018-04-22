<template>
  <div class="row">
      <div class="col-md-7">
          <div id="userWishField" class="inputWrapper inputValidate" data-validate="What item/thing do you wish?">
            <input type="text" class="inputRight" name="userWish" placeholder="Add a wish item" v-bind:value="value" v-on:input='updateValue($event.target.value)'>
            <span class="inputFocus"></span>
          </div>
      </div>
      <div class="col-md-3">
          <input type="button" v-on:click=remove value="X" class="btn btn-danger">
      </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'NewWish',
  props: ["id", "value"],
  methods: {
      remove: function(){
          this.$emit('remove-wish', this.id);
      },
      updateValue: function(value){
          this.$emit('input', value);
      }
  }
}
</script>

