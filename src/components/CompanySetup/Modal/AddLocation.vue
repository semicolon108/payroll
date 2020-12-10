<template>
    <div class="modal is-active">
        <div class="modal-background" @click="CloseModal"></div>
        <div class="modal-card">
            <ValidationObserver v-slot="{ handleSubmit }">
            <div class="modal-card-head">
                <h3> {{ isEditMode ? 'Update Work Location' : 'Add Work Location' }} </h3>
                <button class="modal-close is-large" @click="CloseModal()" aria-label="close"></button>
            </div>
            <section class="modal-card-body">
                <div class="field">
                    <label for="" class="label">Location Name</label>
                    <div class="control">
                         <ValidationProvider rules="required" v-slot="{ errors }">
                            <input v-model="form.name" type="text" class="input" placeholder="Headquarters">
                            <p class="has-text-danger">{{ errors[0] }}</p>
                         </ValidationProvider>
                    </div>
                </div>
                <div class="field">
                    <label for="" class="label">Province</label>
                    <div class="control">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                        <select v-model="form.provinceId" class="input">
                        <option :value="i._id" v-for="i in provinces" :key="i._id">{{ i.name }}</option>
                        </select>
                         <p class="has-text-danger">{{ errors[0] }}</p>
                        </ValidationProvider>
                    </div>
                </div>
            </section>
            <div class="modal-card-foot">
                 <button v-if="isEditMode" @click="handleSubmit(updateWorkingLocation)" class="button primary">Update</button>
                <button v-else @click="handleSubmit(addWorkingLocation) " class="button primary">Save</button>
               
            </div>
            </ValidationObserver>
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