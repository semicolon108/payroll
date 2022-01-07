<template>
    <div class="container">
        <div class="page-header">
            <div class="header-start">
                <div class="header-title">
                    <h3>Daily Wage Calculation</h3>
                </div>
            </div>
            <!-- <div class="header-end">
                <button class="button primary" @click="ModalClick = 'Upload'">
                    <span><i class="fal fa-cloud-upload"></i></span>
                    <span>Upload Work Day</span>
                </button>
            </div> -->
        </div>

        <div class="_tabs">
            <ul>
                <li 
                    @click="layoutSelected = i.name"
                    :class="{'is-active': i.name === layoutSelected}"
                    v-for="i in wage" :key="i._id">
                    <a>{{i.name}}</a>
                </li>
            </ul>
        </div>

        <div class="box">
            <!-- <nav class="pagination" role="navigation" aria-label="pagination">
                <ul class="pagination-list">
                    <li>
                        <a class="pagination-previous">Previous</a></li>
                    <li>
                        <a class="pagination-link" aria-label="Goto page 1">1</a>
                    </li>
                    <li>
                        <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a class="pagination-link" aria-label="Goto page 45">45</a>
                    </li>
                    <li>
                        <a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
                    </li>
                    <li>
                        <a class="pagination-link" aria-label="Goto page 47">47</a>
                    </li>
                    <li>
                        <span class="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a class="pagination-link" aria-label="Goto page 86">86</a>
                    </li>
                    <li>
                        <a class="pagination-next">Next page</a>
                    </li>
                </ul>
            </nav> -->
            <div class="table-container">
                <table class="table is-fullwidth" id="my-table">
                    <thead>
                        <tr>
                            <th class="is-xxs">ID</th>
                            <th>
                                Employee name
                                <!-- <input type="text" class="label_input" placeholder="Employee name"> -->
                            </th>
                            <th class="is-xs is-center">Contact Number</th>
                            <th class="is-xs is-center">Payment Type</th>
                            <th class="is-xs is-right">Daily Wage Rate</th>
                            <th class="is-xxs is-right">Work Day</th>
                            <th class="is-xs is-right">Total Wage / Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(i, index) in employees" :key="index">
                            <td>{{i.employeeCode}}</td>
                            <td>{{i.fullName}}</td>
                            <td>{{ i.mobile }}</td>
                            <td class="is-center">{{ i.wageType }}</td>
                            <td class="is-right">{{ i.basicSalary | currency }}</td>
                            <td class="is-right">
                                {{i.actualWorkingDay}}
                            </td>
                            <!-- <td class="is-right">
                                <div class="workday">
                                    <input type="text" class="input" :value="i.actualWorkingDay">
                                </div>
                            </td> -->
                            <td class="is-right">{{ i.thisMonthSalary | currency }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <component :is="ModalClick" @CloseModal="ModalClick=''"></component>

    </div>

</template>

<script>
    import Upload from '@coms/PayrollCalculation/Wage-Calculation/Modal/Upload.vue'
    import {getEmpsByWageType} from '@/apis/salary-wage-type-api'
    
    export default {
        components: {
            Upload,
        },
        data: () => ({
            ModalClick: '',
            layoutSelected: 'Monthly',
            wage: [
                {
                    name: 'Monthly'
                },
                {
                    name: 'Daily'
                }
            ],

            employees: []
        }),
        watch: {
            layoutSelected() {
                this.getEmps()
            }
        },
            methods: {

        async getEmps() {
              const args = {
                wageType: this.layoutSelected,
                monthlyPaymentId: this.$route.params.id
            }
            const data = await getEmpsByWageType(args)

            this.employees = data
        },
        },
         created() {
            
          this.getEmps()

        }
    }

</script>

<style lang="scss" scoped>
._tabs{
  margin: 0;
  padding: 0;
  position: relative;
  // bottom: -1px;
  ul{
    padding: 0;
    margin: 0;
    display: flex;
    li{
        cursor: pointer;
        list-style-type: none;
        margin: 0 10px 0 0;
        padding: 10px 20px;
        border-left: 1px solid $border-color;
        border-top: 1px solid $border-color;
        border-right: 1px solid $border-color;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $border-color;
        &:hover{
            background-color: $primary-color;
            color: #fff;
    }
    &:hover a{
    color: #fff;
    }
    a{
    color: #000;
    }
    &.is-active{
        box-shadow: 0 1px 0 0 #fff;
        background-color: #fff;
        border-left: 1px solid $border-color;
        border-top: 1px solid $border-color;
        border-right: 1px solid $border-color;
        a, i{
          color: $primary-color;
        }
      }
    } //li
  }
}
.pagination{
    padding-left: 0;
    padding-right: 0;
    ul{
        margin: 0;
        li{
            list-style-type: none;
            a{
                border-radius: 0;
            }
        }
    }
}
.workday{
    display: flex;
    input.input{
        text-align: center;
        background-color: transparent !important;
        font-size: 16px;
        outline: none;
        height: auto;
        &:focus{
            outline: none;
            box-shadow: none;
            box-shadow: unset;
        }
    }
}
.label_input{
    font-size: 16px;
    padding: 10px;
    border-width: 0;
    outline: none;
    &:focus{
        outline: none;
    }
}
.tips{
    position: absolute;
    width: 100%;
    background-color: $warning-color;
    z-index: 1;
    padding: 10px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    transition: all ease .2s;
    p{
        margin: 0;
        line-height: 1;
    }
    i{
        cursor: pointer;
        font-size: 20px;
        margin: 0;
    }
}


.header-end{
    display: flex;
    align-items: center;
    .completed-count{
        display: flex;
        h3{
            margin: 0 10px 0 0;
            font-size: 16px;
            font-weight: 500;
        }
        ul{
            display: flex;
            align-items: center;
            margin: 0;
            li{
                font-size: 16px;
                list-style-type: none;
                margin: 0;
                line-height: 1;
                padding: 0 3px;
                &:nth-child(1){
                    font-weight: 700;
                    cursor: pointer;
                    color: $primary-color;
                }
                &:nth-child(3){
                    font-weight: 700;
                    cursor: pointer;
                }
            }
        }
    } // completed count
    button.button{
        transition: ease .2s;
        overflow: hidden;
        span{
            text-align: center;
            i{
                text-align: center;
            }
        }
    }
    
    
}
.table-container{
    overflow-x: auto;
}
ul.option{
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    li{
        list-style-type: none;
        margin: 0;
        padding: 0;
        cursor: pointer;
    }
}
</style>