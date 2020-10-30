<template>
  <div class="dropdown-t">
    <div class="search-group">
      <input type="text" class=" input">
    </div>
    <br>
    <div class="dropdown-items">
      <div v-for="n in 10" :key="n" class="dropdown-item">em</div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.dropdown-t{
  position: absolute;
  z-index: 99;
  background: white;
  width: 100%;

  border: 1px solid grey;

  .search-group {
    width: 100%;
    padding: 5px;
  }

  .dropdown-items {
      .dropdown-item {

      }
  }
}

</style>