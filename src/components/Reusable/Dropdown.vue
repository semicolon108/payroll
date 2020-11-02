<template>
  <div class="dropdown-container">
    <div class="dropdown-list">
      <div v-for="n in 10" :key="n" class="dropdown-item">em</div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.dropdown-container{
  background-color: #fff;
  padding: 10px;
  border: 1px solid $border-color;
  position: absolute;
  top: 70px;
}

</style>