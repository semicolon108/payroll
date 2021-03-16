<template>
  <div>
    <div class="page-header">
      <h3 class="page-title">Position</h3>
      <button class="button primary" @click="isOpen = true; isEditMode = false"><i class="fas fa-plus"></i>Add</button>
    </div>
    <div class="box">
      <table v-if="!isLoading" class="table is-fullwidth" id="my-table">
        <thead>
        <tr>
          <th>Position</th>
          <th>Department</th>
          <th>Total Employee</th>
          <th class="is-xs is-right">Option</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(i, idx) in positions" :key="idx">
          <td class="truncate" style="max-width: 180px">{{ i.name }}</td>
          <td class="truncate" style="max-width: 180px">{{ i.departmentId.name }}</td>
          <td class="truncate" style="max-width: 180px">{{ i.employeesCount }}</td>
          <td>
            <div class="icons">
              <span class="icon" @click="editModal(i._id, i.name, i.departmentId._id)"><i class="fas fa-pen"></i></span>
              <span @click="deletePosition(i._id)" class="icon alert"><i class="fas fa-trash"></i></span>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
       <div v-else>
            <Loading v-for="n in 7" :key="n" style=" height: 60px" class="mb-3"  />
           </div>
    </div>
    <PositionModal
         v-if="isOpen"
         :isEditMode="isEditMode"
          @PushItem="getPositions"
          @UpdateItem="getPositions"
         @CloseModal="isOpen = false"
          ref="Modal"
    />
  </div>
</template>

<script>
import PositionModal from '@coms/Position/Modal/add-position.vue';
import {GET_POSITIONS} from "@/graphql/Position";
import {deletePosition} from "@/apis/position-api";
 import Loading from '@/components/Loading/SkeletonLoading'

export default {
  components: {
    PositionModal,
    Loading
  },
  data: () => ({
    ModalClick: '',
    positions: [],
    isOpen: false,
    isEditMode: false,
     isLoading: true
  }),
  methods: {
    async getPositions() {
      try {
        const res = await this.$apollo.query({
          query: GET_POSITIONS
        })
        this.positions = res.data.getPositions
           setTimeout(() => {
                this.isLoading = false
             }, 400)
      } catch (err) {
        throw new Error(err)
      }
    },
    editModal(_id, name, departmentId) {
      this.isOpen = true
      this.isEditMode = true
      this.$nextTick(() => {
        this.$refs.Modal._id = _id
        this.$refs.Modal.name = name
        this.$refs.Modal.departmentId = departmentId
      })
    },
    async deletePosition(id) {
       try {
         await this.$store.dispatch('loading')
         await deletePosition(id)
         await this.$store.dispatch('completed')
         await this.getPositions()

       } catch (err) {
         await this.$store.dispatch('error')
         if(err.graphQLErrors[0].message === 'Please unselected employees from this position first') {
           alert(err.graphQLErrors[0].message + ': ' + err.graphQLErrors[0].extensions.isExists.map(i => i.employeeId.employeeCode))
         }
     }

    }
  },
  created() {
    this.getPositions()
  }
}
</script>

<style lang="scss" scoped>

h3 {
  font-weight: 700;
}

.employees {
  margin-top: 10px;
  display: flex;

  .employee {
    display: block;
    background-image: url(https://www.cobdoglaps.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg);
    width: 30px;
    height: 30px;
    background-position: center;
    background-size: cover;
    border-radius: 100%;
    border: 1px solid $primary-color;

    &:not(:first-child) {
      margin-left: -3px;
    }
  }
}

.button {
  border-radius: 0;
  margin-left: 10px;
  background-color: $primary-color;
  color: #fff;
  border-color: $primary-color;

  &:hover {
    color: #fff;
    border-color: $primary-color;
  }

  &:focus {
    color: #fff;
    border-color: $primary-color;
  }

  &:active {
    color: #fff;
  }
}

</style>
