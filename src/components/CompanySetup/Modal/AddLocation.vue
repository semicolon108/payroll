<template>
    <div class="modal is-active">
        <div class="modal-background" @click="CloseModal"></div>
        <div class="modal-card">
            <div class="modal-card-head">
                <h3> {{ isEditMode ? 'Update Working Location' : 'Add Working Location' }} </h3>
                <button class="modal-close is-large" @click="CloseModal()" aria-label="close"></button>
            </div>
            <section class="modal-card-body">
                <div class="field">
                    <label for="" class="label">Location Name</label>
                    <div class="control">
                        <input v-model="form.name" type="text" class="input" placeholder="Headquarters">
                    </div>
                </div>
                <div class="field">
                    <label for="" class="label">Province</label>
                    <div class="control">
                        <select v-model="form.provinceId" class="input">
                        <option :value="i._id" v-for="i in provinces" :key="i._id">{{ i.name }}</option>
                        </select>
                    </div>
                </div>
            </section>
            <div class="modal-card-foot">
                 <button v-if="isEditMode" @click="updateWorkingLocation" class="button primary">Update</button>
                <button v-else @click="addWorkingLocation" class="button primary">Save</button>
               
            </div>
        </div>
    </div>
</template>

<script>
import { getReuse } from '@/apis/reuse-api'
import { addWorkingLocation, updateWorkingLocation } from '@/apis/working-location-api'

export default {
    data: () => ({
        provinces: [],
        form: {
            name: '',
            provinceId: ''
        },
        isEditMode: false,
        workingLocationId: ''
    }),
    methods: {
        CloseModal() {
            this.$emit('CloseModal')
        },
        async getProvinces() {
            this.provinces = await getReuse('Province')
            if(!this.isEditMode) this.form.provinceId = this.provinces[0]._id
        },
        async addWorkingLocation() {
           try {
               this.$store.dispatch('loading')
                await addWorkingLocation(this.form)
                this.$store.dispatch('completed')
            this.CloseModal()
           } catch(e) {
               this.$store.dispatch('error')
               throw new Error(e)
           }
        },
        async updateWorkingLocation() {
              try {
               this.$store.dispatch('loading')
                this.form.workingLocationId = this.workingLocationId
                await updateWorkingLocation(this.form)
                this.$store.dispatch('completed')
            this.CloseModal()
           } catch(e) {
               this.$store.dispatch('error')
               throw new Error(e)
           }
        }
    },
    created() {
        this.getProvinces()
    }
}
</script>

<style lang="scss" scoped>

</style>