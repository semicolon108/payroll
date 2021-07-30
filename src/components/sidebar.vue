<template>
  <div class="sidebar">
    <div class="sidebar-container">
      <div class="sidebar-items">
        <div class="sidebar-title">Organization</div>
        <router-link to="/department" class="sidebar-item">Department</router-link>
        <router-link to="/position" class="sidebar-item">Position</router-link>
        <router-link to="/employee" class="sidebar-item">Employee</router-link>
      </div>
      <div class="sidebar-items">
        <div class="sidebar-title">Salary</div>
        <router-link to="/payroll_list" class="sidebar-item">Payroll</router-link>
      </div>
      <div class="sidebar-items" style="cursor: not-allowed">
        <div style=" cursor: not-allowed" class="sidebar-title">Setting</div>
           <!-- <router-link :to="{ name: 'formula' }" class="sidebar-item">Formula</router-link> -->
          <!-- <router-link :to="{ name: 'customfield' }" class="sidebar-item">Custom Field</router-link> -->
          <router-link to="/users" class="sidebar-item">Users</router-link>
          <router-link to="/custom-field" class="sidebar-item">Custom Field</router-link>
        <!-- <div style=" cursor: not-allowed" class="sidebar-item">SSO List</div>
        <div style=" cursor: not-allowed" class="sidebar-item">User</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    getStart: false,
  }),
}
</script>

<style lang="scss" scoped>
.sidebar {
  // position: fixed;
  top: 0;
  bottom: 0;
  font-family: $font;
  background-color: $dark-primary-color;
  width: 220px;
  .sidebar-container {
    width: 100%;
    height: 100%;
    padding: 30px;
    .sidebar-items {
      margin-bottom: 30px;
      .sidebar-title {
        color: $warning-color;
        font-size: 16px;
        display: flex;
        span:first-child{
          width: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        i{
          margin-right: 10px;
        }
      }
      .sidebar-item {
        display: block;
        cursor: pointer;
        font-size: 16px;
        padding: 10px 0 0;
        color: rgba(#fff, 0.4);
        &.router-link-exact-active {
          color: #fff;
        }
      }
    }
  }
}
</style>