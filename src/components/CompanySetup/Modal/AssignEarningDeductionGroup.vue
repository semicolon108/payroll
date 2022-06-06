<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card slide-down" style="padding: 0">
      <div class="modal-card-head">
        <h3>Assign Allowance to group</h3>
        <button
          class="modal-close is-large"
          @click="closeModal"
          aria-label="close"
        ></button>
      </div>
      <section class="modal-card-body">
        <div class="field">
          <ul>
            <li
              v-for="(i, index) in earnDeductGroups"
              :key="index"
              :class="{ active: groupIds.includes(i._id) }"

              @click="selectGroup(i)"
            >
   
              <span>{{ i.name }}</span>
            </li>
          </ul>
        </div>

        <div class="buttons">
          <button class="button primary" @click="updateEarnDeduct">Save</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { updateEarnDeduct } from "@/apis/earn-deduct-api";
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
    earnDeductGroups: [],
   // selectedGroups: [],
    form: {
      earnDeductId: null,
      name: "",
      type: "Earning",
      isBeforeTax: true,
      isBeforeSso: false,
      earnDeductGroupIds: [],
    },
    //earnDeduct: null
  }),
  computed: {
    groupIds() {
      return this.form.earnDeductGroupIds
    }
  },
  methods: {
    selectGroup(i) {
      if(this.groupIds.includes(i._id)) {
        const idx = this.form.earnDeductGroupIds.findIndex(o => o === i._id)
        this.form.earnDeductGroupIds.splice(idx, 1)
      }else {
        this.form.earnDeductGroupIds.push(i._id)
      }
    },
     async updateEarnDeduct() {
      //const item =
       await updateEarnDeduct(this.form);
     // this.$emit("UpdateItem", item);
      this.closeModal();
    },
    closeModal() {
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