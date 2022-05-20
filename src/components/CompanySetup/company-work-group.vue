<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-start">
        <h3 class="page-title">Company Work Group</h3>
        <button class="button primary" @click="ModalClick()">
          <i class="fas fa-plus"></i> Add
        </button>
      </div>
    </div>
    <div class="page-content">
      <table class="table is-fullwidth" id="my-table">
        <thead>
          <tr>
            <th>Group Name</th>
            <th class="is-xs">Employee</th>
            <th class="is-xs">Workday</th>
            <th class="is-xs">OT Day</th>
            <th class="is-xxs is-right">Option</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in workingDayGroups" :key="i._id">
            <td>{{ i.name }}</td>
            <td>{{ i.employeesCount }}</td>
            <td>{{ i.workingDay }}</td>
            <td>{{ i.OTBase }}</td>
            <td class="is-right">
              <div class="icons">
                <span class="icon hover-primary" @click="editModal(i)">
                  <i class="fas fa-pen"></i>
                </span>
                <span
                  @click="deleteWorkingDayGroup(i._id)"
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
    <!-- Modal -->
    <WorkDay
      ref="WorkingDayGroup"
      @CloseModal="
        Modal = false;
        getWorkingDayGroups();
      "
      v-if="Modal"
    />
    <!-- Modal -->
  </div>
</template>

<script>
import WorkDay from "./Modal/WorkDay.vue";
import {
  getWorkingDayGroups,
  deleteWorkingDayGroup,
} from "@/apis/working-day-group-api";

export default {
  components: { WorkDay },
  data: () => ({
    Modal: false,
    workingDayGroups: [],
  }),
  methods: {
    ModalClick() {
      this.Modal = true;
    },
    editModal(item) {
      this.Modal = true;
      this.$nextTick(() => {
        this.$refs.WorkingDayGroup.isEditMode = item._id;
        this.$refs.WorkingDayGroup.workingDayGroupId = item._id;
        this.$refs.WorkingDayGroup.form.name = item.name;
        this.$refs.WorkingDayGroup.form.workingDay = item.workingDay;
        this.$refs.WorkingDayGroup.form.OTBase = item.OTBase;
      });
    },
    async getWorkingDayGroups() {
      this.workingDayGroups = await getWorkingDayGroups();
    },
    async deleteWorkingDayGroup(workingDayGroupId) {
      const isConfirmed = await this.$dialog.confirm("Sure ?");
      if (!isConfirmed) return;

      try {
        this.$store.dispatch("loading");
        await deleteWorkingDayGroup({ workingDayGroupId });
        this.$store.dispatch("completed");
        this.getWorkingDayGroups();
      } catch (e) {
        this.$store.dispatch("error");
        throw new Error(e);
      }
    },
  },
  created() {
    this.getWorkingDayGroups();
  },
};
</script>

<style lang="scss" scoped>
</style>