<template>
    <div>
    
        <div class="page-header">
            <div class="header-start">
                <h3 class="page-title">Employee</h3>
                <button class="button primary" @click="$router.push({name:'basic_detail'})"><i class="fas fa-plus"></i> Add</button>
            </div>
            <div class="header-end">
                <button class="button" :class="{'primary' : !isResigned}" @click="isResigned = false">Working</button>
                <button class="button" :class="{'primary': isResigned}" @click="isResigned = true">Resigned / Incomplete</button>
            </div>
        </div>

        <div class="box">
            <div class="box-header">
                <Pagination v-model="currentPage" :count="employeesCount" :perPage="perPage" />
                <div class="box-header-end">
                    <div class="field">
                        <p class="control has-icons-left">
                            <input v-model="textSearch" class="input" type="text" placeholder="Search..." style="border-radius: 0px;">
                            <span class="icon is-small is-left"><i class="fas fa-search"></i></span>
                        </p>
                    </div>
                    <div class="select">
                        <select v-model="perPage" class="ml-5" name="" id="">
                            <option :value="10">10</option>
                            <option :value="20">20</option>
                            <option :value="30">30</option>
                            <option :value="40">50</option>
                            <option :value="50">100</option>
                        </select>
                    </div>
                </div>
            </div>
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
                        <td class="truncate" style="max-width: 150px">{{i.employeeCode}}</td>
                        <td class="truncate" style="max-width: 180px">{{i.firstName}} {{i.lastName}}</td>
                        <td class="is-hidden-mobile truncate" style="max-width: 180px">{{ i.position }}</td>
                        <td class="is-hidden-mobile truncate" style="max-width: 180px">{{ i.department }}</td>
                        <td> {{ i.isCompleted ? 'Completed' : 'Incomplete' }}</td>
                        <td>
                            <div class="icons">
                                <span v-if="i.isCompleted" @click="$router.push({ name: 'edit_basic_detail', params: { id: i._id, name: `${i.firstName} ${i.lastName}` } } )" class="icon"><i class="fas fa-pen"></i></span>
                                <span v-else @click="$router.push({ name: 'hiring_detail', params: { id: i._id, name: `${i.firstName} ${i.lastName}`  } } )" class="icon"><i class="fas fa-pen"></i></span>
                                <!--                                <span class="icon"><i class="fas fa-trash"></i></span>-->
                            </div>
                        </td>
                    </tr>
                </tbody>
                <div>
    
                </div>
            </table>
            <div v-else>
                <Loading v-for="n in 7" :key="n" style=" height: 60px" class="mb-3" />
            </div>
        </div>
    </div>
</template>

<script>
import { GET_EMPLOYEES } from "@/graphql/Employee";
import Loading from '@/components/Loading/SkeletonLoading'
import Pagination from '@/utils/Pagination2'

export default {
    components: {
        Loading,
        Pagination
    },
    data: () => ({
        employees: [],
        employeesCount: 1,
        textSearch: '',
        timer: null,
        isLoading: true,
        currentPage: 1,
        perPage: 20,
        isResigned: false
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
        },
        currentPage() {
            this.$router.push({ ...this.$route, query: { ...this.$route.query, page: this.currentPage } })
            this.getEmployees()
        },
        perPage() {
            this.$router.push({ ...this.$route, query: { ...this.$route.query, perPage: this.perPage } })
            this.getEmployees()
        },
        '$route.query.page': {
            handler(val) {
                if (val) {
                    this.currentPage = parseInt(val, 10)
                }
            },
            immediate: true
        },
        '$route.query.perPage': {
            handler(val) {
                if (val) {
                    this.perPage = parseInt(val, 10)
                }
            },
            immediate: true
        },
        isResigned() {
           this.getEmployees()
        }
    },
    methods: {
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
                this.employees = res.data.getEmployees.employees
                this.employeesCount = res.data.getEmployees.employeesCount
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