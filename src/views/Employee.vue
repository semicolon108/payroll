<template>
    <div>
        <div class="page-header">
            <h3 class="page-title">Employee</h3>
            <button class="button primary" @click="$router.push({name:'basic_detail'})"><i class="fas fa-plus"></i> Add</button>
        </div>
        <div class="box">
            <table class="table is-fullwidth" id="my-table">
                <thead>
                  
                    <tr>
                        <th class="is-xs">Photo</th>
                        <th>Full Name</th>
                        <th class="is-hidden-mobile">Position</th>
                        <th class="is-hidden-mobile">Deparment</th>
                        <th>Status</th>
                        <th class="is-xs is-right">Option</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in employees" :key="index">
                        <td class="is-xs" v-if="i.image">
                          <div :style="{ backgroundImage: 'url('+ i.image.src +')' }" class="photo"></div>
                        </td>
                        <td class="is-xs" v-else>
                          <div v-if="i.gender === 'Male'" :style="{ backgroundImage: 'url('+ require('../../../public/assets/img/male-avatar.png') +')' }" class="photo"></div>

                          <div v-else :style="{ backgroundImage: 'url('+  require('../../../public/assets/img/female-avatar.png') +')' }" class="photo"></div>
                          
                        </td>
                        
                        <td>{{i.firstName}} {{i.lastName}}</td>
                        <td class="is-hidden-mobile">{{  i.position  }}</td>
                        <td class="is-hidden-mobile">{{  i.department  }}</td>
                        <td > {{ i.isCompleted ? 'Completed' : 'Incomplete' }}</td>
                        <td>
                            <div class="icons">
                                <span v-if="i.isCompleted" @click="$router.push({ name: 'edit_basic_detail', params: { id: i._id } } )" class="icon"><i class="fas fa-pen"></i></span>
                              <span v-else @click="$router.push({ name: 'hiring_detail', params: { id: i._id } } )" class="icon"><i class="fas fa-pen"></i></span>
<!--                                <span class="icon"><i class="fas fa-trash"></i></span>-->
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {GET_EMPLOYEES} from "@/graphql/Employee";

    export default {
        data: () => ({
          employees: []
        }),
      methods: {
          async getEmployees() {
            try {
              const res = await this.$apollo.query({
                query: GET_EMPLOYEES
              })
              this.employees = res.data.getEmployees
            } catch (err) {
              throw new Error(err)
            }
          }
      },
      created() {
          this.getEmployees()
      }
    }
</script>

<style lang="scss" scoped>

</style>