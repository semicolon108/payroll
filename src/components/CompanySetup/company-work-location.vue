<template>
<div class="box">
    <div class="box-header">
        <h3 class="box-title">Working Location</h3>
        <div class="button-group">
            <button class="button primary" @click="ModalClick()">Add Location</button>
        </div>
    </div>
    <table class="table has-border is-fullwidth" id="my-table">
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
                <span class="icon" @click="editModal(i)"><i class="fas fa-pen"></i></span>
                <span @click="deleteWorkingLocation(i._id)" class="icon alert"><i class="fas fa-trash"></i></span>
              </div>
            </td>
          </tr>
        </tbody>
    </table>
    <AddLocation ref="WorkingLocation" @CloseModal="ModalAddLocation = false; getWorkingLocations()" v-if="ModalAddLocation"/>
</div>
</template>

<script>
import AddLocation from './Modal/AddLocation'
import {getWorkingLocations, deleteWorkingLocation} from '@/apis/working-location-api'

export default {
    components:{
        AddLocation
    },
    data: () => ({
        ModalAddLocation: false,
        workingLocations: []
    }),
    methods:{
        ModalClick(){
            this.ModalAddLocation = true
        },
        editModal(item) {
          this.ModalAddLocation = true
            this.$nextTick(() => {
                this.$refs.WorkingLocation.isEditMode = item._id
                this.$refs.WorkingLocation.workingLocationId = item._id
                this.$refs.WorkingLocation.form.name = item.name
                this.$refs.WorkingLocation.form.provinceId = item.provinceId._id
            })
        },
        async getWorkingLocations() {
         try {
            this.workingLocations = await getWorkingLocations()
         }catch(e) {
           throw new Error(e)
         }
        },
        async deleteWorkingLocation(workingLocationId) {
          const isConfirmed = await this.$dialog.confirm('Sure ?')
          if(!isConfirmed) return
        
          try {
            this.$store.dispatch('loading')
            await deleteWorkingLocation({ workingLocationId })
            this.$store.dispatch('completed')
            this.getWorkingLocations()
          } catch(e) {
            this.$store.dispatch('error')
            throw new Error(e)
          }
        }
    },
    created() {
      this.getWorkingLocations()
    }
}
</script>

<style lang="scss" scoped>
select {
  cursor: pointer;
}

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