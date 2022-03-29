<template>
  <div class="page-container">
    <div class="page-header border-bottom">
      <div class="header-start">
        <h3 class="page-title">Pension Fund</h3>
        <!-- <button class="button primary"><i class="fas fa-plus"></i> Add</button> -->
      </div>
      <div>
        <input type="text" class="input" placeholder="Search..." />
      </div>
      <div class="header-end">
        <button class="button primary">Active</button>
        <button class="button">History</button>
      </div>
    </div>

    <div class="page-content">
      <table class="table is-fullwidth" id="my-table">
        <thead>
          <tr class="sticky">
            <th class="is-xxs">Photo</th>
            <th class="is-xs">Employee ID</th>
            <th class="is-sm">Full Name</th>
            <th class="is-md is-hidden-mobile">Position</th>
            <th class="is-xxs is-center">Status</th>
            <th class="is-xxs is-right">Option</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box-header {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  .box-header-end {
    margin-left: auto;
    .field {
      margin: 0;
      display: inline-block;
      input {
        height: 2.5em;
      }
    }
  }
}
</style>