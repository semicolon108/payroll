<template>
  <div>
    <div class="page-header">
      <h3 class="page-title">Position</h3>
      <button class="button" @click="ModalClick = 'AddPosition'"><i class="fas fa-plus"></i></button>
    </div>
    <div class="box">
      <table class="table is-fullwidth" id="my-table">
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
          <td>{{ i.name }}</td>
          <td>{{ i.departmentId.name }}</td>
          <td>{{ i.employeeCount }}</td>
          <td>
            <div class="icons">
              <span class="icon" @click="editModal(i._id, i.name, i.departmentId._id)"><i class="fas fa-pen"></i></span>
              <span class="icon alert"><i class="fas fa-trash"></i></span>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <component
        :is="ModalClick"
        @CloseModal="ModalClick=''"
        @PushItem="pushItem"
        @UpdateItem="updateItem"
        ref="Modal"
    ></component>
  </div>
</template>

<script>
import AddPosition from '@coms/Position/Modal/add-position.vue';
import EditPosition from '@coms/Position/Modal/edit-position.vue';
import {GET_POSITIONS} from "@/graphql/Position";

export default {
  components: {
    AddPosition,
    EditPosition
  },
  data: () => ({
    ModalClick: '',
    positions: []
  }),
  methods: {
    async getPositions() {
      try {
        const res = await this.$apollo.query({
          query: GET_POSITIONS
        })
        this.positions = res.data.getPositions
      } catch (err) {
        throw new Error(err)
      }
    },
    editModal(_id, name, departmentId) {
      this.ModalClick = 'EditPosition'
      this.$nextTick(() => {
        this.$refs.Modal._id = _id
        this.$refs.Modal.name = name
        this.$refs.Modal.departmentId = departmentId
      })
    },
    pushItem(item) {
      this.positions.push(item)
    },
    updateItem(item) {
      const curIdx = this.positions.findIndex(i => i._id === item._id)
      this.positions.splice(curIdx, 1, item)
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
