<template>
<pagination v-model="page" :per-page="perPage" :records="count" @paginate="myCallback" texts="eiei"/>
</template>

<script>
import Pagination from 'vue-pagination-2'
    export default {
        props: ['value', 'count', 'perPage'],
        components: {
            Pagination
        },
        created() {
            if(this.value) {
                this.page = this.value
            }
           
        },
        data: () => ({
            page: 10
        }),
        watch: {
            page(val) {
                this.$emit('input', val)
            }
        }
        
    }
</script>

<style lang="scss">
.VuePagination__count, .VuePagination__count {
    display: none !important;
}
ul.VuePagination__pagination.pagination.VuePagination__pagination{
    margin: 0;
}

.VuePagination__pagination {
    background: white;
    margin: 0;
    li {
        border: 1px solid $border-color;
        display: block;
        line-height: 0;
        width: 2.5em;
        height: 2.5em;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 .25rem;
        cursor: pointer;
        line-height: 2;
        a{
            color: #000;
        }
        &.active {
            background-color: $primary-color;
            border-color: $primary-color;
            a{
                color: white;
            }
        }
    }
}
</style>