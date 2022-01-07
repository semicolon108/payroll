<template>
  <div class="page-container">
    <div class="page-header border-bottom">
      <h3 class="page-title">Department</h3>
      <button class="button primary" @click="isOpen = true; isEditMode = false"><i class="fas fa-plus"></i> Add</button>
    </div>
    <div class="page-content">
      <table v-if="!isLoading" class="table is-fullwidth" id="my-table">
        <thead>
        <tr class="sticky">
          <th>Department</th>
          <th>Total Employee</th>
          <th class="is-xs is-right">Option</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(i, idx) in departments" :key="idx">
          <td class="truncate" style="max-width: 180px">{{ i.name }}</td>
          <td>{{ i.employeesCount }}</td>
          <td>
            <div class="icons">
              <span class="icon" @click="editModal(i._id, i.name)"><i class="fas fa-pen"></i></span>
              <span @click="deleteDepartment(i._id)" class="icon alert"><i class="fas fa-trash"></i></span>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-else>
        <Loading v-for="n in 7" :key="n" style=" height: 60px" class="mb-3"  />
      </div>
    </div>
<!--    <component :is="ModalClick" @CloseModal="ModalClick=''" @PushItem="pushItem"-->
<!--               @UpdateItem="updateItem"-->
<!--               ref="Modal"-->
<!--    ></component>-->
    <AddDepartment
        v-if="isOpen"
       :isEditMode="isEditMode"
       @CloseModal="isOpen = false"
       @PushItem="getDepartments"
       @UpdateItem="getDepartments"
       ref="Modal"
    />
  </div>
</template>

<script>
import AddDepartment from '@coms/Department/Modal/add-department.vue';
import {DELETE_DEPARTMENT, GET_DEPARTMENTS} from "@/graphql/Department";
 import Loading from '@/components/Loading/SkeletonLoading'
export default {
  components: {
    AddDepartment,
    Loading
  },
  data: () => ({
    ModalClick: '',
    departments: [],
    isOpen: false,
    isEditMode: false,
    isLoading: true
  }),
  methods: {
    async getDepartments() {
      try {
        const res = await this.$apollo.query({
          query: GET_DEPARTMENTS
        })
        this.departments = res.data.getDepartments
          setTimeout(() => {
                this.isLoading = false
             }, 400)
      } catch (err) {
        throw new Error(err)
      }
    },

    async deleteDepartment(departmentId) {
      try {
        await this.$store.dispatch('loading')
        const res = await this.$apollo.mutate({
          mutation: DELETE_DEPARTMENT,
          variables: {
            departmentId
          }
        })
        const message = res.data.deleteDepartment
        if(message === 'Deleted') {
          await this.$store.dispatch('completed')
          const curIdx = this.departments.findIndex(i => i._id === departmentId)
          this.departments.splice(curIdx, 1)
        }
      } catch (err) {
        await this.$store.dispatch('error')
        if(err.graphQLErrors[0].message === 'You need to delete this positions first') {
          alert(err.graphQLErrors[0].message + ': ' + err.graphQLErrors[0].extensions.positionExists.map(i => i.name))
        }
      }
    },

    editModal(_id, name) {
      this.isOpen = true;
      this.isEditMode = true
      this.$nextTick(() => {
        this.$refs.Modal._id = _id
        this.$refs.Modal.name = name
      })
    },
    // pushItem(item) {
    //   this.departments.push(item)
    // },
    // updateItem(item) {
    //   const curIdx = this.departments.findIndex(i => i._id === item._id)
    //   this.departments.splice(curIdx, 1, item)
    // }
  },
  created() {
    this.getDepartments()
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
