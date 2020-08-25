<template>
  <div>
    <div class="page-header">
        <h3 class="page-title">Report</h3>
    </div>
    <div class="box">
        <table class="table is-fullwidth report" id="my-table">
        <thead>
            <tr>
                <th>Date</th>
                <th class="is-right">No. of employee</th>
                <th class="is-right">Basic Salary</th>
                <th class="is-right">Earning</th>
                <th class="is-right">OT</th>
                <th class="is-right">Net Salary</th>
                <th class="is-right">TAX</th>
                <th class="is-right">SSO (5.5%)</th>
                <th class="is-right">SSO (6%)</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(i, idx) in 3" :key="idx">
                <td>25, Mar-2020</td>
                <td class="is-right">40</td>
                <td class="is-right">200.000.000</td>
                <td class="is-right">120.000.000</td>
                <td class="is-right">30.000.000</td>
                <td class="is-right">200.000.000</td>
                <td class="is-right">120.000.000</td>
                <td class="is-right">300.000.000</td>
                <td class="is-right">300.000.000</td>
            </tr>
        </tbody>
        </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home'
}
</script>

<style lang="scss" scoped>
#my-table.report{
    th{
        font-size: 14px;
    }
    td{
        font-size: 14px;
    }
}

</style>
