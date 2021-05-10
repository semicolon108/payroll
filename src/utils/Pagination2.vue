<template>
    <div>
        <pagination v-model="page" :per-page="perPage" :records="count" @paginate="myCallback"
         texts="eiei"
        />
    </div>
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

.VuePagination__pagination {
    background: white;
    li {
        padding: 1rem;
        &.active {
            background: rgb(65, 65, 228);
            color: white;
        }
    }
}
</style>