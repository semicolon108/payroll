<template>
    <div class="modal is-active">
        <div class="modal-background" @click="CloseModal"></div>
        <div class="modal-card">
             <ValidationObserver v-slot="{ handleSubmit }">
            <div class="modal-card-head">
                <h3>{{ isEditMode ? 'Update Working Day' : 'Add Working Day' }}</h3>
                <button class="modal-close is-large" @click="CloseModal()" aria-label="close"></button>
            </div>
            <section class="modal-card-body">
                <div class="field">
                    <label for="" class="label">Group Name</label>
                    <div class="control">
                         <ValidationProvider rules="required" v-slot="{ errors }">
                            <input v-model="form.name" type="text" class="input" placeholder="Contract Staff">
                             <p class="has-text-danger">{{ errors[0] }}</p>
                         </ValidationProvider>
                    </div>
                </div>
                <div class="field">
                    <label for="" class="label">Work Day</label>
                    <div class="control">
                         <ValidationProvider rules="required" v-slot="{ errors }">
                        <input v-model="form.workingDay" type="text" class="input" placeholder="e.g 30">
                                                     <p class="has-text-danger">{{ errors[0] }}</p>
                         </ValidationProvider>
                    </div>
                </div>
                <div class="field">
                    <label for="" class="label">OT Day</label>
                    <div class="control">
                         <ValidationProvider rules="required" v-slot="{ errors }">
                        <input v-model="form.OTBase" type="text" class="input" placeholder="e.g 30">
                                         <p class="has-text-danger">{{ errors[0] }}</p>
                         </ValidationProvider>
                    </div>
                </div>
            </section>
            <div class="modal-card-foot">
                <button v-if="isEditMode" @click="handleSubmit(updateWorkingDayGroup)" class="button primary">Update</button>
                <button v-else @click="handleSubmit(addWorkingDayGroup)" class="button primary">Save</button>
            </div>
             </ValidationObserver>
        </div>
    </div>
</template>

<script>
import { addWorkingDayGroup, updateWorkingDayGroup } from '@/apis/working-day-group-api'

export default {
    data: () => ({
        form: {
            name: '',
            workingDay: null,
            OTBase: null
        },
        isEditMode: false,
        workingDayGroupId: ''
    }),
    methods: {
        CloseModal() {
            this.$emit('CloseModal')
        },
        async addWorkingDayGroup() {
            try {
                this.$store.dispatch('loading')

                await addWorkingDayGroup({
                    name: this.form.name,
                    workingDay: parseInt(this.form.workingDay, 10),
                    OTBase: parseInt(this.form.OTBase, 10)
                })
                this.$store.dispatch('completed')
                this.CloseModal()
            } catch (e) {
                this.$store.dispatch('error')
                throw new Error(e)
            }
        },
        async updateWorkingDayGroup() {
            try {
                this.$store.dispatch('loading')
                this.form.workingDayGroupId = this.workingDayGroupId
                this.form.workingDay = parseInt(this.form.workingDay, 10)
                this.form.OTBase = parseInt(this.form.OTBase, 10)
                await updateWorkingDayGroup(this.form)
                this.$store.dispatch('completed')
                this.CloseModal()
            } catch (e) {
                this.$store.dispatch('error')
                throw new Error(e)
            }
        }
    },

}
</script>

<style lang="scss" scoped>

</style>