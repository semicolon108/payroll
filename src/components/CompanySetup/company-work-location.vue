<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-start">
        <h3 class="page-title">Work Location</h3>
        <button class="button primary" @click="ModalClick()">
          Add Location
        </button>
      </div>
    </div>

    <div class="page-content">
      <table class="table is-fullwidth" id="my-table">
        <thead>
          <tr>
            <th>Location Name</th>
            <th class="is-md">Province</th>
            <th class="is-sm">No. of employee</th>
            <th class="is-xxs is-right">Option</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in workingLocations" :key="i._id">
            <td>{{ i.name }}</td>
            <td>{{ i.provinceId.name }}</td>
            <td>{{ i.employeesCount }}</td>
            <td class="is-right">
              <div class="icons">
                <span class="icon hover-primary" @click="editModal(i)">
                  <i class="fas fa-pen"></i>
                </span>
                <span
                  @click="deleteWorkingLocation(i._id)"
                  class="icon alert hover-alert"
                >
                  <i class="fas fa-trash"></i>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddLocation
      ref="WorkingLocation"
      @CloseModal="
        ModalAddLocation = false;
        getWorkingLocations();
      "
      v-if="ModalAddLocation"
    />
  </div>
</template>

<script>
import AddLocation from "./Modal/AddLocation";
import {
  getWorkingLocations,
  deleteWorkingLocation,
} from "@/apis/working-location-api";

export default {
  components: {
    AddLocation,
  },
  data: () => ({
    ModalAddLocation: false,
    workingLocations: [],
  }),
  methods: {
    ModalClick() {
      this.ModalAddLocation = true;
    },
    editModal(item) {
      this.ModalAddLocation = true;
      this.$nextTick(() => {
        this.$refs.WorkingLocation.isEditMode = item._id;
        this.$refs.WorkingLocation.workingLocationId = item._id;
        this.$refs.WorkingLocation.form.name = item.name;
        this.$refs.WorkingLocation.form.provinceId = item.provinceId._id;
      });
    },
    async getWorkingLocations() {
      try {
        this.workingLocations = await getWorkingLocations();
      } catch (e) {
        throw new Error(e);
      }
    },
    async deleteWorkingLocation(workingLocationId) {
      const isConfirmed = await this.$dialog.confirm("Sure ?");
      if (!isConfirmed) return;

      try {
        this.$store.dispatch("loading");
        await deleteWorkingLocation({ workingLocationId });
        this.$store.dispatch("completed");
        this.getWorkingLocations();
      } catch (e) {
        this.$store.dispatch("error");
        throw new Error(e);
      }
    },
  },
  created() {
    this.getWorkingLocations();
  },
};
</script>

<style lang="scss" scoped>
select {
  cursor: pointer;
}
</style>