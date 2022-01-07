<template>
<div class="page-container">
    <div class="page-header">
        <h3 class="page-title">Dashboard</h3>
        <div class="header-end">
            <!-- <button class="button" 
                v-click-outside="()=>{ selectMonth = false }"
                @click="selectMonth = !selectMonth">
                <i class="fal fa-calendar-alt"></i>
                Select Month
                <div class="dropdown" v-if="selectMonth">
                    <div class="dropdown-list">
                        <div class="dropdown-list-item">
                            <i class="fal fa-calendar-alt"></i>
                            JAN
                        </div>
                        <div class="dropdown-list-item">
                            <i class="fal fa-calendar-alt"></i>
                            FEB
                        </div>
                        <div class="dropdown-list-item">
                            <i class="fal fa-calendar-alt"></i>
                            MAR
                        </div>
                        <div class="dropdown-list-item">
                            <i class="fal fa-calendar-alt"></i>
                            APR
                        </div>
                    </div>
                </div>
            </button>
            <button class="button" 
                v-click-outside="()=>{ selectYear = false }"
                @click="selectYear = !selectYear">
                <i class="fal fa-calendar-alt"></i>
                Select Year
                <div class="dropdown" v-if="selectYear">
                    <div class="dropdown-list">
                        <div class="dropdown-list-item">
                            <i class="fal fa-calendar-alt"></i>
                            Last Month
                        </div>
                        <div class="dropdown-list-item">
                            <i class="fal fa-calendar-alt"></i>
                            Last Quarters
                        </div>
                        <div class="dropdown-list-item">
                            <i class="fal fa-calendar-alt"></i>
                            Last Year
                        </div>
                        <div class="dropdown-list-item">
                            <i class="fal fa-calendar-alt"></i>
                            This Year
                        </div>
                    </div>
                </div>
            </button> -->
            <button class="button primary"
                v-click-outside="()=>{ selectOption = false }"
                @click="selectOption = !selectOption">
                <i class="fal fa-calendar-alt"></i>
                This Month
                <!-- <div class="dropdown" v-if="selectOption">
                    <div class="dropdown-list">
                        <div class="dropdown-list-item">
                            <i class="fal fa-calendar-alt"></i>
                            Last Month
                        </div>
                        <div class="dropdown-list-item">
                            <i class="fal fa-calendar-alt"></i>
                            Last Quarters
                        </div>
                        <div class="dropdown-list-item">
                            <i class="fal fa-calendar-alt"></i>
                            Last Year
                        </div>
                        <div class="dropdown-list-item">
                            <i class="fal fa-calendar-alt"></i>
                            This Year
                        </div>
                    </div>
                </div> -->
            </button>
        </div>
    </div>
    <div class="page-content">
        <div class="columns">
            <div class="column is-3">
                <div class="_card">
                    <span class="_card-icon"><i class="fas fa-wallet"></i></span>
                    <h3>{{ data.totalSalary | currency}}</h3>
                    <!-- <h3>270,160,000</h3> -->
                    <small>Net Pay</small>
                </div>
            </div>
            <div class="column is-3">
                <div class="_card">
                    <span class="_card-icon"><i class="fas fa-clock"></i></span>
                    <h3>{{total.totalOT}}</h3>
                    <small>Over time</small>
                </div>
            </div>
            <div class="column is-3">
                <div class="_card">
                    <span class="_card-icon"><i class="fas fa-percentage"></i></span>
                    <!-- <h3>65,320,000</h3> -->
                    <h3>{{data.totalTax | currency}}</h3>
                    <small>TAX</small>
                </div>
            </div>
            <div class="column is-3">
                <div class="_card">
                    <span class="_card-icon"><i class="fas fa-heartbeat"></i></span>
                    <h3>{{data.totalSso | currency}}</h3>
                    <small>SSO</small>
                </div>
            </div>
        </div>

        <video autoplay loop class="w-full" src="https://s1.sentry-cdn.com/_static/e0f43681a09b5d889040b0289ac4d921/sentry/dist/congrats-robots.c1aa5c.mp4"></video>
        </div>
</div>
</template>

<script>
    import vClickOutside from 'v-click-outside'
    import {getPayrollByMonths} from '@/apis/payroll-api'
    import {getTotalPayroll} from '@/apis/payroll-api'
    export default {
        directives: {
            clickOutside: vClickOutside.directive
        },
        data: () => ({
            selectMonth : false,
            selectYear : false,
            selectOption : false,
            data: {},
            total: {}
        }),
        methods: {
            async getPayrollByMonths() {
                const data = await getPayrollByMonths()
                this.data = data[0]
                this.total = await getTotalPayroll(this.data.monthlyPaymentId)
            }
        },
        created() {
            this.getPayrollByMonths()
        }
    }
</script>

<style lang="scss" scoped>

._card{
    padding: 20px;
    border: 1px solid $border-color;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    ._card-icon{
        display: inline-block;
        min-width: 50px;
        min-height: 50px;
        border-radius: 50px;
        text-align: center;
        background-color: rgba($sub-color, .2);
        i{
            line-height: 50px;
            font-size: 20px;
            color: $primary-color;
        }
    }
    h3{
        margin-top: 5px;
        font-weight: 600;
        font-size: 24px;
        color: $font-color;
        display: flex;
        &::after{
            content: '₭';
            font-size: 14px;
            color: $dark-grey-color;
            margin-left: 5px;
            position: relative;
            top: 5px;
            font-weight: normal
        }
    }
    small{
        color: $dark-grey-color;
        font-size: 16px;
        display: block;
    }
}
</style>