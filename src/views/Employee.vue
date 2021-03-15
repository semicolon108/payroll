<template>
    <div>
        <div class="page-header flex justify-between">
            <div class="flex items-center">
              <h3 class="page-title">Employee</h3>
              <button class="button primary" @click="$router.push({name:'basic_detail'})"><i class="fas fa-plus"></i> Add</button>
            </div>
            <div class="flex">


<div class="field" style="margin-right: -1px">
  <p class="control has-icons-left">
    <input v-model="textSearch" class="input" type="text" placeholder="Search..." style="border-radius: 0px;">
    <span class="icon is-small is-left">
      <i class="fas fa-search  text-blue-700"></i>
    </span>
  </p>
</div>
      <!-- <div class="control" style="margin-right: -1px">
        <div class="select">
          <select>
            <option>Work Location</option>
            <option>With options</option>
          </select>
        </div>
    </div>
       <div class="control">
        <div class="select">
          <select>
            <option>Work Group</option>
            <option>With options</option>
          </select>
        </div>
    </div> -->
              <!-- <select name="" id="" class="select">
                <option value="">Work Location</option>
              </select>
                 <select name="" id="" class="select">
                <option value="">Work Group</option>
              </select> -->
            </div>
        </div>
        <div class="box">
            <table v-if="!isLoading" class="table is-fullwidth" id="my-table">
                <thead>                  
                    <tr>
                        <th class="is-xs">Photo</th>
                        <th>Employee ID</th>
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
                          <div v-if="i.gender === 'Male'" :style="{ backgroundImage: 'url('+ require('../../public/assets/img/male-avatar.png') +')' }" class="photo"></div>

                          <div v-else :style="{ backgroundImage: 'url('+  require('../../public/assets/img/female-avatar.png') +')' }" class="photo"></div>
                          
                        </td>
                         <td>{{i.employeeCode}}</td>
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
                <div>
                            
                </div>
            </table>
           <div v-else>
            <Loading v-for="n in 7" :key="n" style=" height: 60px" class="mb-3"  />
           </div>
        </div>
    </div>
</template>

<script>
    import {GET_EMPLOYEES} from "@/graphql/Employee";
    import Loading from '@/components/Loading/SkeletonLoading'

    export default {
      components: {
        Loading,
      },
        data: () => ({
          employees: [],
          textSearch: '',
          timer: null,
          isLoading: true
        }),
        watch: {
          textSearch() {
             if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.getEmployees()
            }, 500);
          }
        },
      methods: {
          async getEmployees() {
            try {
          
              const res = await this.$apollo.query({
                query: GET_EMPLOYEES,
                variables: {
                  textSearch: this.textSearch
                }
              })
                              this.employees = res.data.getEmployees
             setTimeout(() => {
                this.isLoading = false
             }, 400)
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