<template>
    <div class="box slide-up">
        <div class="box-header">
            <h3 class="box-title">Company Work Group</h3>
            <div class="button-group">
                <button class="button primary" @click="ModalClick()">Add Work Group</button>
            </div>
        </div>
        <div class="field">
            <!-- <div class="control">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input v-model="workingDay" type="text" class="input">
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div> -->
            <table class="table has-border is-fullwidth" id="my-table">
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
                        <td>{{i.name}}</td>
                        <td>{{i.employeesCount}}</td>
                        <td>{{i.workingDay}}</td>
                        <td>{{i.OTBase}}</td>
                        <td class="is-right">
                            <div class="icons">
                                <span class="icon" @click="editModal(i)"><i class="fas fa-pen"></i></span>
                                <span @click="deleteWorkingDayGroup(i._id)" class="icon alert"><i class="fas fa-trash"></i></span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Modal -->
        <WorkDay ref="WorkingDayGroup" @CloseModal="Modal = false; getWorkingDayGroups()" v-if="Modal" />
        <!-- Modal -->

    </div>
</template>

<script>
import WorkDay from './Modal/WorkDay.vue'
import { getWorkingDayGroups, deleteWorkingDayGroup} from '@/apis/working-day-group-api'

export default {
    components: { WorkDay },
    data: () => ({
        Modal: false,
        workingDayGroups: []
    }),
    methods: {
        ModalClick() {
            this.Modal = true
        },
        editModal(item) {
            this.Modal = true
            this.$nextTick(() => {
                this.$refs.WorkingDayGroup.isEditMode = item._id
                this.$refs.WorkingDayGroup.workingDayGroupId = item._id
                this.$refs.WorkingDayGroup.form.name = item.name
                this.$refs.WorkingDayGroup.form.workingDay = item.workingDay
                this.$refs.WorkingDayGroup.form.OTBase = item.OTBase
            })
        },
        async getWorkingDayGroups() {
            this.workingDayGroups = await getWorkingDayGroups()
        },
        async deleteWorkingDayGroup(workingDayGroupId) {
            const isConfirmed = await this.$dialog.confirm('Sure ?')
            if (!isConfirmed) return

            try {
                this.$store.dispatch('loading')
                await deleteWorkingDayGroup({ workingDayGroupId })
                this.$store.dispatch('completed')
                this.getWorkingDayGroups()
            } catch (e) {
                this.$store.dispatch('error')
                throw new Error(e)
            }
        }
    },
    created() {
        this.getWorkingDayGroups()
    }
}
</script>

<style lang="scss" scoped>
.box-header {
    display: flex;
    color: $font-color;
    margin-bottom: 20px;
    align-items: center;
    .box-title {
        font-size: 18px;
        font-weight: 700;
        color: $font-color;
        margin-right: 10px;
    }
}
</style>