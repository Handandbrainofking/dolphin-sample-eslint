<template>
  <div class="category">
    <text class="category-text">{{ title }}</text>
  </div>
</template>

<style scoped>
.category {
  /* margin-top: 20px; */
  padding-left: 24px;
  width: 750px;
  height: 68px;
  background-color: #0092d7;
  justify-content: center;
}

.category-text {
  color: #ffffff;
  font-weight: 600;
  font-size: 28px;
}
</style>

<script>
export default {
  props: {
    title: String
  }
}
</script>
