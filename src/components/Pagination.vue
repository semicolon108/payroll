<template>
<div  class="container">
  <ul class="page">
    <li class="page__btn" :class="{'disabled' : (currentPage === 1)}" @click="currentPage--">
         <i class="fas fa-chevron-left"></i>
    </li>

    <li class="page__numbers" @click="currentPage = 1" v-if="currentPage > 3"> {{pages[0]}}</li>
    <li class="page__dots" v-if="currentPage > 3">...</li>

    <li class="page__numbers" :key="pageNumber" v-for="pageNumber in displayedPages" @click="currentPage = pageNumber" :class="{'active' : (currentPage === (pageNumber))}">{{pageNumber}}</li>

    <li class="page__dots" v-if="currentPage < pages.length - 2">...</li>
    <li class="page__numbers" @click="currentPage = pages.length" v-if="currentPage < pages.length - 2"> {{pages[pages.length - 1]}}</li>

    <li class="page__btn" :class="{'disabled' : (currentPage >= pages.length)}" @click="currentPage++">
        <i class="fas fa-chevron-right"></i>
    </li>
  </ul>
</div>
</template>


<style lang="scss" scoped>

ul.page{
    display: flex;
    margin: 10px 0 10px;
}

.page {
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
        &.disabled {
            pointer-events: none;
            opacity: 50%;
            background: gray;
               border-color: gray;
        }
        &.active {
            background-color: $primary-color;
            border-color: $primary-color;
            color: white;
        }
    }
}
</style>

<script>
    export default {
        props: ['value', 'total'],
        data() {
            return {
                items: [],
                currentPage: 1,
                perPage: 10,
                pages: [],
            };
        },
        methods: {
            // get the 100 items list
                getItems() {
                    for (let i = 0; i < this.total ?? 300; i++) {
                    const template = `eiei${i}`;
                    this.items.push(template);
                    }
                },
                // separate items per page.
                // Ex: Page 2 -> from item 11 to 20
                pagination(items) {
                    const newItems = items
        
                    let currentPage = this.currentPage;
                    let perPage = this.perPage;

                    let start = currentPage * perPage - perPage;
                    let end = currentPage * perPage;

                    return newItems.slice(start, end);
                },

                // generate number of pages
                setPages() {
                    // N of items (100) / 10 items per page
                    let numberOfPages = Math.ceil(this.items.length / this.perPage);
                    //generate 10 pages (100 / 10)
                    for (let i = 1; i <= numberOfPages; i++) {
                        this.pages.push(i);
                    }
                }
        },
        computed: {
            // display the items per page
            displayedItems() {
                return this.pagination(this.items);
            },
            displayedPages() {
            // if currentPage is page 1
            if (this.currentPage === 1) {
                return this.pages.slice(this.currentPage - 1, this.currentPage + 4);
            }
            // if currentPage equal 2
            else if(this.currentPage === 2) {
                return this.pages.slice(this.currentPage - 2, this.currentPage + 3);
            }
            // if currentPage equal 3
            else if (this.currentPage === 3) {
                return this.pages.slice(this.currentPage - 3, this.currentPage + 2);
            }
            // if currentPage is the last page
            else if (this.currentPage === this.pages.length) {
                return this.pages.slice(this.currentPage - 5, this.currentPage + 1);
            }
            // if currentPage is the last page - 1
            else if (this.currentPage === this.pages.length - 1) {
                return this.pages.slice(this.currentPage - 4, this.currentPage + 2);
                }
            // if currentPage is the last page - 2
            
                else if (this.currentPage === this.pages.length - 2) {
                return this.pages.slice(this.currentPage - 3, this.currentPage + 2);
                }

            
            // if currentPage is between 4-7
            else if (this.currentPage >= 4 && this.currentPage <= 7) {
                return this.pages.slice(this.currentPage - 2, this.currentPage + 1);
            }
            // if currentPage more than 7
            else if (this.currentPage > 7 && this.currentPage <= this.pages.length - 3) {
                return this.pages.slice(this.currentPage - 2, this.currentPage + 1);
            }
            else return 0
            }
        },
        watch: {
            //how many pages to display
            items: {
                handler() {
                    this.setPages();
                },
                deep: true,
            },
            currentPage(page) {
                this.$emit('input', page)
            },
            value: {
               handler(page) {
                    this.currentPage = page
               },
               immediate: true
            },
            total: {   
                handler() {
                        this.items = []
                        this.pages = []
                        this.getItems();
                },
                immediate: true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>