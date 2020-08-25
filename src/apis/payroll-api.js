import {apolloClient} from "@/services/apollo-client";
import {CALC_PAYROLL, GET_PAYROLL_BY_EMPS, GET_PAYROLL_BY_MONTHS} from "@/graphql/Payroll";

export const getPayrollByMonths = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_PAYROLL_BY_MONTHS,
            })
            resolve(res.data.getPayrollByMonths)
        } catch (err) {
            reject(err)
        }
    })
}

export const getPayrollByEmps = (monthlyPaymentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_PAYROLL_BY_EMPS,
                variables: {
                    monthlyPaymentId
                }
            })
            resolve(res.data.getPayrollByEmps)
        } catch (err) {
            reject(err)
        }
    })
}



export const calcPayroll = (monthlyPaymentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: CALC_PAYROLL,
                variables: {
                    monthlyPaymentId
                }
            })
            resolve(res.data.calcPayroll)
        } catch (err) {
            reject(err)
        }
    })
}

