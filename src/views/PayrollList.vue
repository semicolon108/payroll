<template>
    <section>
        <div class="page-header flex justify-between">
          <div class="flex items-center">
 <h3 class="page-title">Payroll

 
            </h3>
                         <button 
                         @click="isDelete = !isDelete"
                         class="button py-1">Toggle Delete Option</button>
          </div>
           
            <div v-if="getCompany.isCalcByWorkGroup">
              <select name="" id=""
              v-model="workGroupId"
              >
                <option 
                v-for="i in workGroups " :key="i._id"
                :value="i._id">{{i.name}}</option>
              </select>
              <button 
              @click="addPayroll"
              class="button " >Add Payroll</button>
            </div>
        </div>
    
        <div v-if="getCompany.isCalcByWorkGroup">
          <div v-if="!isLoading" >
            <div v-for="(t, idx) in groupByWorkGroup" :key="idx" class="box">
              <h3 class="box-title">{{t[0].paymentDate | moment}}</h3>
            <table class="table is-fullwidth" id="my-table">
                <thead>
                    <tr>
                        <th>Work Group</th>
                        <th class="is-right">No. of employee</th>
                        <th class="is-right">Total SSO</th>
                        <th class="is-right">Total TAX</th>
                        <th class="is-right">Total Salary</th>
                        <th class="is-sm is-right">Option</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in t" :key="i._id">
                        <td>{{ i.workGroupId.name  }}</td>
                        <td class="is-right">{{ i.workGroupId.employeesCount }}</td>
                        <td class="is-right">{{ i.totalSso | currency }} LAK</td>
                        <td class="is-right">{{ i.totalTax | currency }} LAK</td>
                        <td class="is-right">{{ i.totalSalary | currency }} LAK</td>
                        <td class="is-right">
                            <div v-if="i.isApproved" class="option is-primary">
                                <router-link :to="{ name: 'calculate_earning_deduction', params: { id: i.monthlyPaymentId } }">
                                    <i class="fas fa-expand"></i>
                                    <span>Check</span>
                                </router-link>
                            </div>
    
                            <div v-else class="option is-primary">
                                    <a @click="$router.push({ name: 'calculate_earning_deduction', params: { id: i.monthlyPaymentId } })">
                                  <i class="fas fa-calculator"></i>
                                  <span>Calculate</span>
                                </a>
                            </div>
          
                            <a 
                  v-if="isDelete"
                            @click="deletePayroll(i.monthlyPaymentId)" class="ml-2 text-red-600">
                              <i class="fas fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    
        <div v-else>
            <Loading style=" height: 100px" class="mb-2" />
            <Loading style=" height: 100px" class="mb-2" />
            <Loading style=" height: 100px" class="mb-2" />
            <Loading style=" height: 100px" class="mb-2" />
        </div>


        </div>
    
    
        <div v-else>



          <div v-if="!isLoading" class="box current">
            <h3 class="box-title">Current Payroll</h3>
            <div class="summary-container">
                <div v-if="currentItem" class="summary-items">
                    <div class="summary-item">
                        <span>Total Employees</span>
                        <h3>{{currentItem.employeeCount }}</h3>
                    </div>
                    <div class="summary-item">
                        <span>Total SSO</span>
                        <h3>{{ currentItem.totalSso | currency }} LAK</h3>
                    </div>
                    <div class="summary-item">
                        <span>Total TAX</span>
                        <h3>{{ currentItem.totalTax | currency }} LAK</h3>
                    </div>
                    <div class="summary-item">
                        <span>Total Net Salary</span>
                        <h3>{{ currentItem.totalSalary | currency }} LAK</h3>
                    </div>
                </div>
    
    
                <!-- <div
                  @click="$router.push({ name: 'payrollCalculation', params: { id: currentItem.monthlyPaymentId } })"
                  class="summary-option">
                <span>Calculate</span>
              </div> -->
                <div @click="$router.push({ name: 'calculate_earning_deduction', params: { id: currentItem.monthlyPaymentId } })" class="summary-option">
                    <span>Calculate</span>
                </div>
    
    
                <!--            <div v-else class="summary-option"-->
                <!--                 @click="alert = 'checkDeductible'; monthlyPaymentId = currentItem.monthlyPaymentId "-->
                <!--            >-->
                <!--                <span>Calculate</span>-->
                <!--            </div>-->
            </div>
        </div>
    
        <div v-else>
            <Loading style=" height: 100px" class="mb-7" />
        </div>
    
        <div v-if="!isLoading" class="box">
            <h3 class="box-title">Previous Payroll</h3>
            <table class="table is-fullwidth" id="my-table">
                <thead>
                    <tr>
                        <th>Payment date</th>
                        <th class="is-right">No. of employee</th>
                        <th class="is-right">Total SSO</th>
                        <th class="is-right">Total TAX</th>
                        <th class="is-right">Total Salary</th>
                        <th class="is-sm is-right">Option</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in exceptCurrent" :key="i._id">
                        <td>{{ i.paymentDate | moment }}</td>
                        <td class="is-right">{{ i.employeeCount }}</td>
                        <td class="is-right">{{ i.totalSso | currency }} LAK</td>
                        <td class="is-right">{{ i.totalTax | currency }} LAK</td>
                        <td class="is-right">{{ i.totalSalary | currency }} LAK</td>
                        <td class="is-right">
                            <div v-if="i.isApproved" class="option is-primary">
                                <router-link :to="{ name: 'calculate_earning_deduction', params: { id: i.monthlyPaymentId } }">
                                    <i class="fas fa-expand"></i>
                                    <span>Check</span>
                                </router-link>
                            </div>
    
                            <div v-else class="option is-primary">
                                <a @click="$router.push({ name: 'calculate_earning_deduction', params: { id: i.monthlyPaymentId } })">
                    <i class="fas fa-calculator"></i>
                    <span>Calculate</span>
                  </a>
                            </div>
    
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    
        <div v-else>
            <Loading style=" height: 100px" class="mb-2" />
            <Loading style=" height: 100px" class="mb-2" />
            <Loading style=" height: 100px" class="mb-2" />
            <Loading style=" height: 100px" class="mb-2" />
        </div>



        </div>
    </section>
</template>

<script>
import { getPayrollByMonths } from '@/apis/payroll-api'
import Loading from '@/components/Loading/SkeletonLoading'
import { mapGetters } from 'vuex'
import _ from 'lodash'
import {getWorkingDayGroups} from '@/apis/working-day-group-api'
import {addPayroll, deletePayroll} from '@/apis/payroll-api'


export default {
    components: {
        Loading
    },
    computed: {
        ...mapGetters(['getCompany']),
        currentItem() {
            return this.items[0]
        },
        exceptCurrent() {
            return this.items.filter((i, idx) => idx !== 0)
        },
        groupByWorkGroup() {
          const group = _.groupBy(this.items, 'paymentDate')
          const arr = _.values(group)
          return arr
        }
    },
    data: () => ({
        items: [],
        alert: '',
        isLoading: true,
        workGroups: [],
        workGroupId: '',
        isDelete: false
    }),
    methods: {
        async getPayrowByMonths() {
            this.items = await getPayrollByMonths()
            setTimeout(() => {
                this.isLoading = false
            }, 400)
        },
        async getWorkingDayGroups() {
          this.workGroups =  await getWorkingDayGroups()

        },
        async addPayroll() {
          const isConfirmed = await this.$dialog.confirm('Sure?')
         if(!isConfirmed) return
          await addPayroll(this.workGroupId)
          this.getPayrowByMonths()
        },
        async deletePayroll(id) {
        const isConfirmed = await this.$dialog.confirm('Sure?')
         if(!isConfirmed) return
          await deletePayroll(id)
           this.getPayrowByMonths()
        }
    },
    created() {
        this.getPayrowByMonths()
        this.getWorkingDayGroups()
    }
}
</script>

<style lang="scss" scoped>
.box.current {
    padding: 0;
    box-shadow: none;
    border: none;
    .box-title {
        font-weight: normal;
        font-size: 14px;
        margin: 0px;
        background-color: $primary-color;
        color: #fff;
        display: inline-block;
        padding: 5px 10px;
        border-radius: 3px 3px 0 0;
    }
    .summary-container {
        display: flex;
        .summary-option {
            background-color: $primary-color;
            color: #fff;
            padding: 10px;
            display: flex;
            align-items: center;
            cursor: pointer;
        }
        .summary-items {
            border: 1px solid $primary-color;
            padding: 10px;
            flex-grow: 1;
            display: flex;
            color: $font-color;
            .summary-item {
                flex-grow: 1;
                span {
                    font-size: 14px;
                    color: $dark-grey-color;
                }
                h3 {
                    font-size: 18px;
                    font-weight: 700;
                    color: $primary-color;
                    ;
                }
            }
        }
    }
}

.box-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
    color: $font-color;
}

.option {
    color: $primary-color;
    white-space: pre;
    display: inline-block;
    cursor: pointer;
    border: none;
    &.is-primary {
        padding: 5px 15px;
        background-color: $primary-color;
        color: #fff;
    }
    a {
        color: #fff;
    }
    span {
        margin-left: 5px;
    }
}
</style>