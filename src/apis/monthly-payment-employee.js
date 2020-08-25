import {apolloClient} from "@/services/apollo-client";
import {
    ADD_DEDUCTIBLE,
    APPROVED_DEDUCTIBLE,
    GET_MONTHLY_PAYMENT_EMPLOYEES,
    UPLOAD_DEDUCTIBLE
} from "@/graphql/MonthlyPaymentEmployee";

export const getMonthlyPaymentEmployees = (monthlyPaymentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_MONTHLY_PAYMENT_EMPLOYEES,
                variables: {
                    monthlyPaymentId
                }
            })
            resolve(res.data.getMonthlyPaymentEmployees)
        } catch (err) {
            reject(err)
        }
    })
}


export const uploadDeductible = (items) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: UPLOAD_DEDUCTIBLE,
                variables: {
                    items
                }
            })
            resolve(res.data.uploadDeductable)
        } catch (err) {
            reject(err)
        }
    })
}


export const addDeductible = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_DEDUCTIBLE,
                variables: {
                    monthlyPaymentId: form.monthlyPaymentId,
                    items: form.items
                }
            })
            resolve(res.data.addDeductible)
        } catch (err) {
            reject(err)
        }
    })
}


export const approveDeductible = (monthlyPaymentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: APPROVED_DEDUCTIBLE,
                variables: {
                    monthlyPaymentId
                }
            })
            resolve(res.data.approveDeductible)
        } catch (err) {
            reject(err)
        }
    })
}