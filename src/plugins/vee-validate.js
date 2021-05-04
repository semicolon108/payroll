import Vue from 'vue'
import moment from 'moment'

import {ValidationObserver, ValidationProvider, extend} from 'vee-validate'
import {required, numeric, length} from "vee-validate/dist/rules";


Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)


extend('length', length)



extend('required', {
    ...required,
    message: 'This field is required'
})

extend('numeric', {
    ...numeric,
    message: 'This field must be Number'
})

extend('isDate', {
    validate: (value) => {
        const utc = moment(value, 'DD/MM/YYYY', true)
        return utc.isValid()
    },
    computesRequired: true,
    message: 'This field must be DATE'
})

extend('isDateOrNull', {
    validate: (value) => {
        const utc = moment(value, 'DD/MM/YYYY', true)
        return utc.isValid() || value === '' ||  value === null || value === undefined
    },
    computesRequired: true,
    message: 'This field must be DATE or NULL'
})
