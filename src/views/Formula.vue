<template>
    <div class="page-container">
        <div class="page-header">
            <div class="header-start">
                <h3 class="page-title">Custom Fomula</h3>
                <a 
             @click="addArr"
                class="button primary"><i class="fas fa-plus"></i> Add</a>
            </div>
            <div class="header-end"></div>
        </div>
    
        <div class="page-content no-padding" >
           <Formula 
                v-for="(i, idx) in customFormulas"
                :formula="i"
                :formulaNames="customFormulaNames.filter((o, index) => index < idx)"
                :lastSortByFormula="customFormulas.length - 1"
                :idx="idx"
                :key="idx"
                ref="formula"
                @submitForm="submitForm"
                @deleteFormula="deleteFormula"
            />

        </div>
        


    </div>
</template>

<script>
import Formula from '@/components/Formula'
import {getCustomFormulasApi, addCustomFormulaApi, deleteCustomFormulaApi} from '@/apis/custom-formula-api'
export default {
 components: {
   Formula
 },
 data: () => ({
   customFormulas: [],
   customFormulaNames: []  
 }),
 methods: {
    //    goto(refName) {
    // }
     addArr() {
        this.customFormulas.push(null)

       this.$nextTick(() => {
            const el = this.$refs.formula[this.customFormulas.length - 1].$el;

            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
       })
     }, 
    async getCustomFormulas() {
    try {
          this.customFormulas = await getCustomFormulasApi()
                
       // this.customFormulaNames  = this.customFormulas.filter(i => u)
        this.customFormulaNames =  this.customFormulas.map(i => '#' + i.name) 
      } catch(e) {
        throw new Error(e)
      }
    },
    async addCustomFormula(form) {
      try {
        await this.$store.dispatch("loading");
        await addCustomFormulaApi(form)
        this.getCustomFormulas()
        await this.$store.dispatch("completed");
       
      }catch(e) {
        throw new Error(e)
      }
    },

    async deleteCustomFormula(id) {
   try {
        await this.$store.dispatch("loading");
        await deleteCustomFormulaApi(id)
        this.getCustomFormulas()
        await this.$store.dispatch("completed");
      }catch(e) {
        throw new Error(e)
      }
    },
    submitForm(form) {
        if(form) {
            this.addCustomFormula(form)
        }
    },
    deleteFormula({ id, idx }) {
        if(id) {
            this.deleteCustomFormula(id)
        }else  {
            this.customFormulas.splice(idx, 1)
        }   
    }
 },
 created() {
     this.getCustomFormulas()
 }

};
</script>

<style lang="scss" scoped>
.group {
    margin-bottom: 30px;
    border-radius: 5px;
    padding: 30px;
    background-color: $light-bg-color;
    position: relative;
    border: 1px solid $border-color;
    .del {
        position: absolute;
        top: 0;
        right: 0;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba($dark-grey-color, 0.1);
        border-radius: 0 0 0 5px;
        cursor: pointer;
        i {
            color: $alert-color;
        }
    }
    .formula {
        .formula-header {
            display: flex;
            align-items: flex-end;
            margin-bottom: 20px;
            input {
                height: 100%;
            }
            .select {
                text-align: center;
                &::after {
                    display: none;
                }
                select {
                    padding-left: 10px;
                    padding-right: 10px;
                    text-align: center;
                    option {
                        text-align: center;
                    }
                }
            }
        }
        .formula-box {
            background-color: $light-grey-color;
            padding: 20px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
            border: 1px solid $border-color;
            border-radius: 5px;
            div>span {
                cursor: pointer;
                background-color: $primary-color;
                color: #fff;
                @include sm-font;
                margin: 0;
                border-radius: 5px;
                padding: 8px 15px;
                display: flex;
                align-items: center;
            }
            .operator {
                background-color: rgba($grey-color, 0.5);
                color: $font-color;
                position: relative;
                i {
                    @include sm-font;
                }
                ul {
                    position: absolute;
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                    top: 43px;
                    left: 0;
                    li {
                        display: inline-block;
                        background-color: $grey-color !important;
                        color: $font-color;
                    }
                }
            }
        }
    } // fomula
    .allowance {
        .formula-box {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
            div>span {
                cursor: pointer;
                background-color: $light-grey-color;
                @include sm-font;
                margin: 0;
                border-radius: 5px;
                display: flex;
                align-items: center;
                padding: 8px 15px;
                &.used {
                    background-color: $warning-color;
                }
            }
        }
    }
}

.section-title {
    width: 50%;
    font-weight: 700;
    @include md-font;
    border-width: 0 0 1px 0;
    background-color: transparent !important;
}
</style>