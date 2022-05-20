<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
    <div class="modal-card slide-down">
      <div class="modal-card-head">
        <h3>Assign Allowance to group</h3>
        <button
          class="modal-close is-large"
          @click="CloseModal()"
          aria-label="close"
        ></button>
      </div>
      <section class="modal-card-body">
        <div class="field">
          <ul>
            <li
              v-for="(i, index) in allowanceGroups"
              :key="index"
              :class="{ active: selected }"
            >
              <span>{{ i.groupname }}</span>
            </li>
          </ul>
        </div>

        <div class="buttons">
          <button class="button primary">Save</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    allowanceGroups: [
      {
        groupname: "Default",
      },
      {
        groupname: "Operation",
      },
      {
        groupname: "Local Staff",
      },
    ],
  }),
  methods: {
    CloseModal() {
      this.$emit("CloseModal");
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  li {
    &.active span {
      background-color: $sub-color;
      color: #fff;
    }
    span {
      display: block;
      background-color: $light-grey-color;
      padding: 8px 15px;
      margin-right: 5px;
      margin-bottom: 5px;
      cursor: pointer;
    }
  }
}
</style>