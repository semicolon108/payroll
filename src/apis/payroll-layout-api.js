import {apolloClient} from "@/services/apollo-client";
import {
    ADD_PAYROLL_LAYOUT,
    DELETE_PAYROLL_LAYOUT, GET_DEFAULT_LAYOUT,
    GET_PAYROLL_LAYOUTS, SET_DEFAULT_LAYOUT,
    UPDATE_PAYROLL_LAYOUT
} from "@/graphql/PayrollLayout";

export const getPayrollLayouts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_PAYROLL_LAYOUTS
            })
            resolve(res.data.getPayrollLayouts)
        } catch (err) {
            reject(err)
        }
    })
}



export const getDefaultLayout = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_DEFAULT_LAYOUT
            })
            resolve(res.data.getDefaultLayout)
        } catch (err) {
            reject(err)
        }
    })
}


export const addPayrollLayout = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_PAYROLL_LAYOUT,
                variables: form
            })
            resolve(res.data.addPayrollLayout)
        } catch (err) {
            reject(err)
        }
    })
}


export const  updatePayrollLayout = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: UPDATE_PAYROLL_LAYOUT,
                variables: form
            })
            resolve(res.data.updatePayrollLayout)
        } catch (err) {
            reject(err)
        }
    })
}


export const  setDefaultLayout = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: SET_DEFAULT_LAYOUT,
                variables: form
            })
            resolve(res.data.setDefaultLayout)
        } catch (err) {
            reject(err)
        }
    })
}


export const  deletePayrollLayout = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: DELETE_PAYROLL_LAYOUT,
                variables: form
            })
            resolve(res.data.deletePayrollLayout)
        } catch (err) {
            reject(err)
        }
    })
}

