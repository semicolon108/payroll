<template>
  <div>
    <tbody>
    <tr v-for="(i, idx) in items" :key="idx">
      {{i}}
      <td>{{ i.fullName }}</td>
      <!--          <td class="is-right">-->
      <!--            <div class="workday">-->
      <!--              <div v-if="!i.isEditMode" class="edit">-->
      <!--                <span v-if="!payrollEmps.isCalculated" @click="i.isEditMode = true"><i class="fas fa-pen"></i></span>-->
      <!--                <span>{{ i.workingDay }}</span>-->
      <!--              </div>-->
      <!--              <div class="workdday-input" v-if="i.isEditMode">-->
      <!--                <span @click="addOrUpdateActualWorkingDay(i.employeeId)" class="save">Save</span>-->
      <!--                <input-->
      <!--                    :ref="`input${i.employeeId}`"-->
      <!--                    :value="i.workingDay"-->
      <!--                    class="input"-->
      <!--                    type="text"-->
      <!--                    style="width: 30px"-->
      <!--                >-->
      <!--                <span @click="i.isEditMode = false">&times;</span>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </td>-->
      <td class="is-right">{{ i.basicSalary | currency }}</td>
      <td class="is-right">{{ i.earningAmount | currency }}</td>
      <td class="is-right">{{ i.deductionAmount | currency }}</td>
      <td class="is-right">{{ i.ssoPaidByCom | currency }}</td>
      <td class="is-right">{{ i.ssoPaidByEmp | currency }}</td>
      <td class="is-right">{{ i.tax | currency }}</td>
      <td class="is-right">{{ i.netSalary | currency }}</td>
      <!-- <td class="is-right status " :class="{'is-approved':  i._id}">
        <i v-if="i._id" class="fas fa-check-circle"></i>
        <i v-else class="far fa-check-circle"></i>
      </td> -->
      <td class="is-right">
        <div class="icons">
          <span class="icon"><i class="fas fa-search"></i></span>
        </div>
      </td>
    </tr>
    </tbody>
  </div>
</template>

<script>
export default {
data: () => ({

})
}
</script>

<style scoped>

</style>