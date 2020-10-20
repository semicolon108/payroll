<template>
  <div>
    <div v-show="$store.getters.isLoading || $store.getters.isCompleted || $store.getters.isError" class="bg-default-loading"></div>
    <div class="default-loading">
      <transition name="fade">
        <div v-if="$store.getters.isLoading" class="loading-card is-loading">
          <i class="fas fa-spinner fa-spin"></i>
          <span>Loading...</span>
        </div>
        <div v-else-if="$store.getters.isCompleted" class="loading-card is-completed">
          <i class="far fa-check-circle"></i>
          <span>Completed</span>
        </div>
        <div v-else-if="$store.getters.isError" class="loading-card is-error">
          <i class="fas fa-exclamation-triangle"></i>
          <span>Error</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.bg-default-loading {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.default-loading {
  z-index: 999;
  position: fixed;
  top: 0;
  right: 0;
  margin: 20px 20px;

  .loading-card {
    width: 180px;
    background-color: black;
    color: white;
    padding: 10px 12px 10px 12px;
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;

    i {
      font-size: 1.2rem
    }

    span {
      margin-left: .5rem;
    }
  }

  .is-error {
    background-color: #E60061;
  }

  .is-loading {
    background-color: #0BB2EB;
  }

  .is-completed {
    background-color: #40E0D0;
  }
}

</style>