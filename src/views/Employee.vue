<template>
    <div class="page-container">
        
        <div class="page-header border-bottom">
            <div class="header-start">
                <h3 class="page-title">Employee</h3>
                <button class="button primary" @click="$router.push({name:'basic_detail'})"><i class="fas fa-plus"></i> Add</button>
                 <button class="button primary"
   
                  @click="isShowUploadModal = true"><i class="fas fa-plus"></i> Upload Salary</button>
            </div>
            <div>
                <input type="text" v-model="textSearch" class="input" placeholder="Search..." >
            </div>
            <div class="header-end">
                <button class="button" :class="{'primary' : !isResigned}" @click="isResigned = false">Working</button>
                <!-- <button class="button" :class="{'primary' : !isResigned}" @click="isResigned = false">Incomplete</button> -->
                <button class="button" :class="{'primary': isResigned}" @click="isResigned = true">Resigned / Incomplete</button>
            </div>
        </div>

        <!-- <div class="box-header">
            <Pagination v-model="currentPage" :count="employeesCount" :perPage="perPage" />
            <div class="box-header-end">
                <div class="field">
                    <p class="control has-icons-left">
                        <input v-model="textSearch" class="input" type="text" placeholder="Search..." style="border-radius: 0px;">
                        <span class="icon is-small is-left"><i class="fas fa-search"></i></span>
                    </p>
                </div>
                <div class="select">
                    <select v-model="perPage" name="" id="">
                        <option :value="10">10</option>
                        <option :value="20">20</option>
                        <option :value="30">30</option>
                        <option :value="40">50</option>
                        <option :value="50">100</option>
                    </select>
                </div>
            </div>
        </div> -->

        <div
      
         class="page-content">
            <table class="table is-fullwidth" id="my-table">
                <thead>
                    <tr class="sticky">
                        <th class="is-xxs">Photo</th>
                        <th class="is-xs">Employee ID</th>
                        <th class="is-sm">Full Name</th>
                        <th class="is-md is-hidden-mobile">Position</th>
                        <!-- <th class="is-hidden-mobile">Deparment</th> -->
                        <th class="is-xxs is-center">Status</th>
                        <th class="is-xxs is-right">Option</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, index) in employees" :key="index">
                        <td v-if="i.image">
                            <div :style="{ backgroundImage: 'url('+ i.image.src +')' }" class="photo"></div>
                        </td>
                        <td v-else>
                            <div v-if="i.gender === 'Male'" :style="{ backgroundImage: 'url('+ require('../../public/assets/img/male-avatar.png') +')' }" class="photo"></div>
                            <div v-else :style="{ backgroundImage: 'url('+  require('../../public/assets/img/female-avatar.png') +')' }" class="photo"></div>
                        </td>
                        <td>{{i.employeeCode}}</td>
                        <td class="is-xs">{{i.firstName}} {{i.lastName}}</td>
                        <td class="is-hidden-mobile"><p>{{ i.position }}</p></td>
                        <!-- <td class="is-hidden-mobile"><p>{{ i.department }}</p></td> -->
                        <td class="is-center">
                            <p v-if="i.isCompleted">
                                <i class="is-info fas fa-check-circle"></i>
                            </p>
                            <p v-else>
                                <i class="fas fa-times-circle"></i>
                            </p>
                        </td>
                        <td>
                            <div class="icons">
                                <router-link v-if="i.isCompleted" :to="{ name: 'edit_basic_detail', params: { id: i._id, name: `${i.firstName} ${i.lastName}` } }" class="icon">
                                    <i class="fas fa-pen"></i>
                                </router-link>
                                
                                <router-link v-else :to="{ name: 'hiring_detail', params: { id: i._id, name: `${i.firstName} ${i.lastName}`  } }" class="icon">
                                    <i class="fas fa-pen"></i>
                                </router-link>
                            </div>
                        </td>
                    </tr>
        
                </tbody>
            </table>
                <div v-if="!isLoading">
                    <infinite-loading @infinite="infiniteHandler"
              
                        ref="infiniteLoading"
                        >
                            <div slot="spinner">Loading...</div>
                        <div slot="no-more"></div>
                        <div slot="no-results"></div>
           
                    </infinite-loading>
                </div>
     
            <div v-else>
                <Loading v-for="n in 7" :key="n" style=" height: 60px" class="mb-3" />
            </div>
        </div>
      
      <Upload v-if="isShowUploadModal"
      
                    @closeModal="isShowUploadModal = false"
      />

    </div>
</template>

<script>
import { GET_EMPLOYEES } from "@/graphql/Employee";
import Loading from '@/components/Loading/SkeletonLoading'
// import Pagination from '@/utils/Pagination2'
import InfiniteLoading from 'vue-infinite-loading';
import Upload from "@coms/Upload/upload.vue";

export default {
    components: {
         Loading,
        InfiniteLoading,
        Upload
        // Pagination
    },
    data: () => ({
        employees: [],
        employeesCount: 1,
        textSearch: '',
        timer: null,
        isLoading: true,
        currentPage: 1,
        perPage: 20,
        isResigned: false,
        isShowUploadModal: false
    }),
    watch: {
        textSearch() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.getEmpsWithReset()
            }, 400);
        },
        // currentPage() {
        //     this.$router.push({ ...this.$route, query: { ...this.$route.query, page: this.currentPage } })
        //     this.getEmployees()
        // },
        // perPage() {
        //     this.$router.push({ ...this.$route, query: { ...this.$route.query, perPage: this.perPage } })
        //     this.getEmployees()
        // },
        // '$route.query.page': {
        //     handler(val) {
        //         if (val) {
        //             this.currentPage = parseInt(val, 10)
        //         }
        //     },
        //     immediate: true
        // },
        // '$route.query.perPage': {
        //     handler(val) {
        //         if (val) {
        //             this.perPage = parseInt(val, 10)
        //         }
        //     },
        //     immediate: true
        // },

        isResigned() {
            this.getEmpsWithReset()
        }
    },
    methods: {

        infiniteHandler() {
            this.getEmpsWithInfinite()
        },

         getEmpsWithReset() {
            this.employees = []
            this.currentPage = 1
            this.$nextTick(() => {
                this.$refs.infiniteLoading.stateChanger.reset()
            });
 
        },

        async getEmpsWithInfinite() {
               const emps = await this.getEmployees()
                  // setTimeout(() => {
                       if (emps.length) {
                        this.currentPage++
                        this.employees.push(...emps)
                        this.$refs.infiniteLoading.stateChanger.loaded()
                        } else {
                            this.$refs.infiniteLoading.stateChanger.complete()
                   
                        }
                // }, 100)
        },
        async getEmployees() {
            try {
                const res = await this.$apollo.query({
                    query: GET_EMPLOYEES,
                    variables: {
                        textSearch: this.textSearch,
                        page: this.currentPage,
                        perPage: this.perPage,
                        isResigned: this.isResigned
                    }
                })
                const emps = res.data.getEmployees.employees
                return emps
            
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    created() {
        setTimeout(() => {
            this.isLoading = false
        }, 1700)
    }


}
</script>

<style lang="scss" scoped>
.box-header{
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    .box-header-end{
        margin-left: auto;
        .field{
            margin: 0;
            display: inline-block;
            input{
                height: 2.5em;
            }
        }
        .select{
            margin-top: 0;
            width: auto;
            height: 2.5em;
            border-color: $border-color;
            select{
                border-color: $border-color;
                width: auto;
                height: 2.5em;
            }
        }
    }
}
</style>