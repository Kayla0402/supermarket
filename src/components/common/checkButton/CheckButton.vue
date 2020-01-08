<template>
  <div class="check_button">
    <img src="@/assets/img/cart/tick.svg" :class="{active:isChecked}">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default:false
      }
    }
  }
</script>

<style scoped>
  img {
    border: 2px solid #ccc;
    border-radius: 50%;
  }

  .active {
    background-color: red;
    border-color: red;
    border-radius: 50%;
  }
</style>
