<template>
<div>
  <div class="bg-blue-200 m-2 flex justify-between" v-for="(i, idx) in customFormulas" :key="i._id">
    <div>
          <p class="mr-4">Key: {{ i.name }}</p>
          <p>Formula: {{ i.formulas.join(' ') }}</p>
    </div>
    <div class="flex">
        <div>
          <span>Round Num</span>
          <input :value="i.round" type="text" class="block w-16">
        </div>
        <span 
          @click="setAsNetPay(idx)"
          :class="{'bg-yellow-200': i.isFinalNetPay}" class="flex items-center cursor-pointer">Set as NetPay</span>
      </div>
    </div>
    <div class="absolute top-0 left-0">
       <p>eiei:{{ customList }}</p>
    </div>
    <p>Formula as key: <span class="text-2xl text-yellow-600 font-bold">{{ calc }}</span></p>


<input v-model="name" class="border " type="text" name="" id="">
<!-- <button class="bg-green-400" @click="evalSubmit">Eval Submit</button> -->
<button class="bg-blue-400 text-white mx-2" @click="addCustomFormula">Add Custom List</button>
<!-- <p>Eval (string formula to eval calc): <span class="text-2xl text-yellow-600 font-bold">{{eval}}</span></p> -->

  <div class="home flex justify-center">
    <div class="flex">


   <div class="w-48 mr-2">
      <h3 class="bg-yellow-400 text-center">Draggable 1</h3>
      {{list1}}
      <draggable
        class="dragArea list-group"
        :list="list1"
        group="people"
      >
        <div class="text-center" v-for="(element, idx) in list1" :key="idx">
          <p class="bg-blue-200 m-2">{{ element }}</p>
        </div>
      </draggable>
    </div>

    <div class="w-48 mr-2">
      <h3 class="bg-yellow-400 text-center">Draggable 2</h3>
      <draggable class="dragArea list-group" :list="list2" group="people">
        <div class="text-center" v-for="(element, idx) in list2" :key="idx">
         <p class="bg-blue-200 m-2">{{ element }}</p>
        </div>
      </draggable>
    </div>

    <div class="w-48">
      <h3 class="bg-yellow-400 text-center">Draggable 3</h3>
      <draggable class="dragArea list-group" :list="list3" group="people">
        <div class="text-center " v-for="(element, idx) in list3" :key="idx">
          <p class="bg-blue-200 m-2">{{ element }}</p>
        </div>
      </draggable>
    </div>


      <!-- <div class="w-56 mr-2">
      <h3>Draggable 1</h3>
      <draggable
        class=" bg-gray-200 h-64"
        :list="list1"
        :clone="clone"
        :group="{ name: 'people', pull: pullFunction }"
        @start="start"
        item-key="name"
      >

        <template #item="{ element }">
            {{ element }}
          <div class="m-3 w-10 h-10 bg-blue-400 rounded flex align-center justify-center">
           <span class="text-white text-3xl"> {{ element.name }}</span>
          </div>
        </template>

      </draggable>
    </div> -->

     <!-- <div class="w-56 mr-2">
      <h3>Draggable 2</h3>
      <draggable
        class=" bg-gray-200 h-64"
        :list="list2"
        :clone="clone"
        :group="{ name: 'people', pull: pullFunction }"
        @start="start"
        item-key="id"
      >
        <template #item="{ element }">
                  <div class="m-3 bg-blue-400 rounded flex align-center justify-center">
           <span class=" text-3xl text-white"> {{ element.name }}</span>
          </div>
        </template>
      </draggable>
    </div>

     <div class="w-56">
      <h3>Draggable 3</h3>
      <draggable
        class=" bg-gray-200 h-64"
        :list="list3"
        :clone="clone"
        :group="{ name: 'people', pull: pullFunction }"
        @start="start"
        item-key="id"
      >
        <template #item="{ element }">
         <span class="m-3 bg-blue-400 rounded flex align-center justify-center">
           <span class=" text-3xl text-white"> {{ element.name }}</span>
          </span>
        </template>
      </draggable>
    </div> -->

    </div>
  </div>
</div>
</template>

<script>
import draggable from 'vuedraggable'
import {getCustomFormulasApi, addCustomFormulaApi} from '@/apis/custom-formula-api'

const defaultSym = ['+',  '-' ,  '*' ,  '/']
//const defaultSym2 = [{ name: '+' }, { name: '-' }, { name: '*' }, {name: '/'}]
//const defaultList = [{ name: 'basicSalary' }, {  name: 'totalOT'}, { name: 'SSO' }, {name: 'TAX'}]

// const ret = {
//   basicSalary:  4324529,
//   totalOT:  868024,
//   SSO: 247500,
//   TAX: 182253 
// }


export default {
  data: () => ({
     list1: [...defaultSym,...defaultSym, ...defaultSym ],
     list2: [...keys],
     list3: [],
     drag: false,
     controlOnStart: true,
     calc: null ,
     sum: null ,
     eval: null,
     name: '',
     customList: [],
     customFormulas: []

  }),
  components: {
      draggable
  },
  watch: {
    list3: {
      handler() {
        this.formula()
      },
      deep: true
    },
    list1() {
      if(this.list1 !== ['+', '-', '*', '/']) return
      this.list1 = ['+', '-', '*', '/']
    }
  },
  
  methods: {
    onSymListChanged() {
      alert('Changed')
    },

    async getCustomFormulas() {
    try {
          this.customFormulas = await getCustomFormulasApi()
      } catch(e) {
        throw new Error(e)
      }
    },
    async addCustomFormula() {
      try {
        const form = {
          name: this.name,
          formulas: this.list3
        }
        await addCustomFormulaApi(form)
        this.getCustomFormulas()
      }catch(e) {
        throw new Error(e)
      }
    },
    setAsNetPay(idx) {
      this.customFormulas = this.customFormulas.map(i => ({...i, isFinalNetPay: false}))
      this.customFormulas[idx].isFinalNetPay = true
    },

    evalSubmit() {
      this.eval = eval(this.sum)
    },
    addCustomList() {
      this.customList.push({
        key: this.name,
        value: this.eval
      })
      this.name = ''
    },
    formula() {
      const formula = this.list3
      const sym = ['+', '-', '*', '/']
      let calc = ''
     // let sum = ''
      for (let i=0; i < formula.length; i++) {
        if(!sym.includes(formula[i])) {
          calc = calc  + formula[i]
         // sum = sum  + ret[formula[i]]
        } 
        else {
          calc = calc  +  formula[i]
          //sum = sum  + formula[i]
        }
      }
      this.calc = calc
      //this.sum  = sum
    },
    pullFunction() {
      return this.controlOnStart ? "clone" : true;
    },
    start({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey;
    }
  },

  created() {
    this.getCustomFormulas()
  }

}



const keys = [
  'basicSalary',
  'tax',
  'ssoPaidByEmp',
  'ssoPaidByCom',
  'calcSso',
  'totalOTAmount',
  'totalDueAsTax',
  'earningBeforeTax',
  'earningAfterTax',
  'deductionBeforeTax',
  'deductionAfterTax',
  'calcDeductible',
  'deductibleBeforeTax',
  'deductibleAfterTax', 
]

</script>
