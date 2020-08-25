<template>
    <div>
        <div class="page-header">
            <h3 class="page-title">Company Setup</h3>
        </div>
        <div class="navigation-tab">
            <router-link class="navigation-item" :to="{name:'company_info'}">Company Info</router-link>
            <router-link class="navigation-item" :to="{name:'company_policy'}">Company Policy</router-link>
            <router-link class="navigation-item" :to="{name:'company_deductible'}">Earning / Deduction</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.navigation-tab{
    display: flex;
    margin-bottom: 20px;
    .navigation-item{
        color: $font-color;
        padding: 10px 20px;
        border-top: 1px solid $border-color;
        border-bottom: 1px solid $border-color;
        border-left: 1px solid $border-color;
        cursor: pointer;
        &:last-child{
            border-right: 1px solid $border-color;
        }
        &.router-link-exact-active{
            background-color: $primary-color;
            color: #fff;
            border-color: $primary-color;;
        }
    }
}
</style>