<template>
<div>
    <div class="page-header">
        <div class="header-start">
            <div class="header-title">
                <h3 class="xxl-title">Overtime</h3>
            </div>
            <div class="button-group">
                <button class="button primary">Upload</button>
            </div>
        </div>
    </div>

    <div class="box">
        <div class="formula">
            <label>OT Rate fomula</label>
            <span>Basic Salary</span>
            <i class="fal fa-divide"></i>
            <span>OT Day 26</span> 
            <i class="fal fa-divide"></i>
            <span>Working Hrs 8</span>
            <i class="fal fa-times"></i>
            <span>OT Hrs</span>
            <i class="fal fa-times"></i>
            <span>OT Rate</span>
        </div> 
        <div class="box-header">
            <div class="box-header-start">
                <input type="text" class="input" placeholder="Search employee">
            </div>
            <div class="box-header-end">
                <button
                        class="button"
                        :class="{'primary' : showAmount }"
                        @click="showAmount = !showAmount">
                    Show Amount (LAK)
                </button>
          </div>
        </div> <!-- Box Header -->


        <table class="table is-fullwidth" id="my-table">
            <thead>
                <tr>
                    <th class="is-xxs">
                        <span>ID</span>
                    </th>
                    <th>
                        <span>Employee Name</span>
                    </th>
                    <th class="is-right">
                        <span>Basic Salary</span>
                    </th>
                    <th class="is-xs is-right">
                        <p>OT Rate 1.0</p>
                    </th>
                    <th class="is-xs is-right">
                        <p>OT Rate 1.5</p>
                    </th>
                    <th class="is-xs is-right">
                        <p>OT Rate 2.0</p>
                    </th>
                    <th class="is-xs is-right">
                        <p>OT Rate 2.5</p>
                    </th>
                    <th class="is-xs is-right">
                        <p>OT Rate 3.0</p>
                    </th>
                    <th class="is-sm is-right">
                        <p>Total</p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(i, idx) in 10" :key="idx">
                    <td>001</td>
                    <td>
                        Anousone
                    </td>
                    <td class="is-right">
                        <p>2.000.000</p>
                    </td>
                    <td class="is-right">
                        <span>3.4</span>
                        <p v-if="showAmount">2.000.000</p>
                    </td>
                    <td class="is-right">
                        <span >3.4</span>
                        <p v-if="showAmount">2.000.000</p>
                    </td>
                    <td class="is-right">
                        <span>8.8</span>
                        <p v-if="showAmount">2.000.000</p>
                    </td>
                    <td class="is-right">
                        <span>8.8</span>
                        <p v-if="showAmount">2.000.000</p>
                    </td>
                    <td class="is-right">
                        <span>8.8</span>
                        <p v-if="showAmount">2.000.000</p>
                    </td>
                    <td class="is-right total">
                        <p>2.000.000</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>    

    </div>
</template>

<script>
    export default {
        data: () => ({
            showAmount: true,
        })
    }
</script>
<style lang="scss" scoped>

.formula{
    margin-bottom: 20px;
    i{
        margin: 0 10px;
    }
    label{
        margin-right: 10px;
    }
    span{
        padding: 3px 8px;
        background-color: $light-grey-color;
        color: $font-color;
    }
}

.input{
    @include input;
}

.box-header {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
    .box-header-end{
        .button{
            margin-left: 10px;
            &:focus{
                box-shadow: none;
            }
            i{
                margin-right: 5px;
            }
        }
    }
}
.total{
    font-weight: 700;
}
</style>