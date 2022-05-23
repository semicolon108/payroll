<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>

    <div class="modal-content box slide-down">
      <div class="header">
        <h3>Manage Group</h3>
      </div>

      <div class="field">
        <label for="" class="label">Group Name</label>
        <div class="control">
          <input type="text" class="input" />
        </div>
      </div>
      <button
        class="modal-close is-large"
        @click="CloseModal"
        aria-label="close"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    CloseModal() {
      this.$emit("CloseModal");
    },
  },
};
</script>

<style lang="scss" scoped>
hr {
  height: 1px;
}
button.button {
  margin-right: 10px;
}
.checkbox-item {
  input {
    display: none;

    &:checked ~ label {
      background-color: $sub-color;
      border-color: $sub-color;
      color: #fff;
    }
  }

  label {
    display: inline-block;
    cursor: pointer;
    padding: 5px 15px;
    border: 1px solid $border-color;
    margin-bottom: 10px;
    margin-right: 10px;
  }
}

.switch {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .item {
    margin-bottom: 5px;
    padding: 5px 15px 5px 15px;
    height: 36px;
    margin-right: 5px;
    background-color: $light-grey-color;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    white-space: nowrap;
    &.is-active {
      background-color: $sub-color;
      color: #fff;
    }
  }
}
</style>