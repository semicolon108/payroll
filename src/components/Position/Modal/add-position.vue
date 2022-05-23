<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <div class="modal-card slide-down">
        <div class="modal-card-head">
          <h3>{{ isEditMode ? "Edit Position" : "Add Position" }}</h3>
          <button
            class="modal-close is-large"
            @click="CloseModal"
            aria-label="close"
          ></button>
        </div>

        <section class="modal-card-body">
          <div class="field">
            <label for="" class="label">Position</label>
            <div class="control">
              <ValidationProvider
                name="Position"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  v-model="name"
                  type="text"
                  class="input"
                  placeholder="Enter position name"
                />
                <p class="has-text-danger">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
          <div class="field">
            <label for="" class="label">Select Department</label>
            <div class="control">
              <div class="select">
                <ValidationProvider
                  name="Department"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select v-model="departmentId">
                    <option
                      v-for="i in departments"
                      :key="i._id"
                      :value="i._id"
                    >
                      {{ i.name }}
                    </option>
                  </select>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
        </section>
        <div class="modal-card-foot">
          <button
            v-if="isEditMode"
            @click="handleSubmit(updatePosition)"
            class="button primary"
          >
            Update
          </button>
          <button
            v-else
            @click="handleSubmit(addPosition)"
            class="button primary"
          >
            Save
          </button>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { GET_DEPARTMENTS } from "@/graphql/Department";
import { ADD_POSITION, UPDATE_POSITION } from "@/graphql/Position";

export default {
  props: ["isEditMode"],
  data: () => ({
    departments: [],
    departmentId: "",
  }),
  methods: {
    CloseModal() {
      this.$emit("CloseModal");
    },
    async getDepartments() {
      try {
        const res = await this.$apollo.query({
          query: GET_DEPARTMENTS,
        });
        this.departments = res.data.getDepartments;
        this.departmentId = this.departments[0]._id;
      } catch (err) {
        throw new Error(err);
      }
    },
    async addPosition() {
      try {
        await this.$store.dispatch("loading");
        const res = await this.$apollo.mutate({
          mutation: ADD_POSITION,
          variables: {
            departmentId: this.departmentId,
            name: this.name,
          },
        });
        const item = res.data.addPosition;
        if (item) {
          await this.$store.dispatch("completed");
          this.$emit("PushItem", item);
          this.$emit("CloseModal");
        }
      } catch (err) {
        await this.$store.dispatch("error");
        throw new Error(err);
      }
    },
    async updatePosition() {
      try {
        await this.$store.dispatch("loading");
        const res = await this.$apollo.mutate({
          mutation: UPDATE_POSITION,
          variables: {
            positionId: this._id,
            name: this.name,
            departmentId: this.departmentId,
          },
        });
        const item = res.data.updatePosition;
        await this.$store.dispatch("completed");
        this.$emit("CloseModal");
        this.$emit("UpdateItem", item);
      } catch (err) {
        await this.$store.dispatch("error");
        throw new Error(err);
      }
    },
  },
  created() {
    this.getDepartments();
  },
};
</script>

<style lang="scss" scoped>
</style>