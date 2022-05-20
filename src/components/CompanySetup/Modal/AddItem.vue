<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
    <ValidationObserver
      v-slot="{ handleSubmit }"
      tag="div"
      class="modal-card slide-down"
    >
      <div class="modal-card-head">
        <h3>Add Earning / Deduction</h3>
        <button
          class="modal-close is-large"
          @click="CloseModal()"
          aria-label="close"
        ></button>
      </div>
      <section class="modal-card-body">
        <div class="field">
          <label for="" class="label">Item Name</label>
          <div class="control">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input v-model="form.name" type="text" class="input" />
              <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
        <div class="field">
          <label for="" class="label">Item Type</label>
          <div class="control switch">
            <div
              class="item"
              v-for="(i, idx) in types"
              :key="idx"
              :class="{ 'is-active': form.type === i }"
              @click="form.type = i"
            >
              <span>{{ i }}</span>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="" class="label">TAX</label>
          <div class="control switch">
            <div
              class="item"
              v-for="(i, idx) in taxs"
              :key="idx"
              :class="{ 'is-active': form.isBeforeTax === i.key }"
              @click="form.isBeforeTax = i.key"
            >
              <span>{{ i.name }}</span>
            </div>
          </div>
        </div>
        <!-- <div class="field">
          <label for="" class="label">SSO</label>
          <div class="control switch">
            {{ form.isBeforeSso }}
            <div
              class="item"
              v-for="(i, idx) in sso"
              :key="idx"
              :class="{ 'is-active': form.isBeforeSso === i.key }"
              @click="form.isBeforeSso = i.key"
            >
              <span>{{ i.name }}</span>
            </div>
          </div>
        </div> -->
        <!-- <div class="field">
          <label for="" class="label">Item Group</label>
          <div class="control items">
            <div
              class="item"
              :for="i._id"
              v-for="i in earnDeductGroups"
              :key="i._id"
              :class="{ 'is-active': form.earnDeductGroupIds.includes(i._id) }"
              @click="itemSelect(i._id)"
            >
              {{ i.name }}
            </div>
          </div>
        </div> -->
      </section>

      <div class="modal-card-foot">
        <button
          v-if="isEditMode"
          @click="handleSubmit(updateEarnDeduct)"
          class="button primary"
        >
          Update
        </button>
        <button
          v-else
          @click="handleSubmit(addEarnDeduct)"
          class="button primary"
        >
          Save
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { addEarnDeduct, updateEarnDeduct } from "@/apis/earn-deduct-api";
import { getEarnDeductGroups } from "@/apis/earn-deduct-group-api";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    form: {
      earnDeductId: undefined,
      name: "",
      type: "Earning",
      isBeforeTax: true,
      earnDeductGroupIds: [],
    },
    earnDeductGroups: [],
    isEditMode: false,
    types: ["Earning", "Deduction"],
    taxs: [
      { key: true, name: "Before TAX" },
      { key: false, name: "After TAX" },
    ],
    sso: [
      { key: true, name: "Before SSO" },
      { key: false, name: "After SSO" },
    ],
  }),
  computed: {
    ...mapGetters(["getCompany"]),
  },
  async created() {
    await this.getData();

    // this.form.isBeforeSso = true
  },
  methods: {
    CloseModal() {
      this.$emit("CloseModal");
    },
    itemSelect(id) {
      const itemId = this.form.earnDeductGroupIds.includes(id);
      if (!itemId) {
        this.form.earnDeductGroupIds.push(id);
      } else {
        this.form.earnDeductGroupIds = this.form.earnDeductGroupIds.filter(
          (i) => i !== id
        );
      }
    },
    async addEarnDeduct() {
      const item = await addEarnDeduct(this.form);
      this.$emit("PushItem", item);
      this.CloseModal();
    },
    async updateEarnDeduct() {
      const item = await updateEarnDeduct(this.form);
      this.$emit("UpdateItem", item);
      this.CloseModal();
    },
    async getData() {
      this.earnDeductGroups = await getEarnDeductGroups();
    },
  },
};
</script>

<style lang="scss" scoped>
hr {
  height: 1px;
}
.items {
  display: flex;
  align-items: center;
  .item {
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 0 10px;
    height: 36px;
    background-color: $light-grey-color;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &.is-active {
      background-color: $sub-color;
      color: #fff;
    }
  }
}
</style>