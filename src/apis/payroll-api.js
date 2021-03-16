import {apolloClient} from "@/services/apollo-client";
import {
    CALC_PAYROLL,
    GET_TOTAL_PAYROLL,
    GET_PAYROLL_BY_EMPS,
    GET_PAYROLL_BY_MONTHS,
    SEND_PAYSLIP,
    SEND_REQUEST_CALC,
    ADD_PAYROLL,
    DELETE_PAYROLL

} from "@/graphql/Payroll";

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



export const getTotalPayroll = (monthlyPaymentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_TOTAL_PAYROLL,
                variables: {
                    monthlyPaymentId
                }
            })
            resolve(res.data.getTotalPayroll)
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


export const sendRequestCalc = (monthlyPaymentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: SEND_REQUEST_CALC,
                variables: {
                    monthlyPaymentId
                }
            })
            resolve(res.data.sendRequestCalc)
        } catch (err) {
            reject(err)
        }
    })
}

export const sendPayslip = (monthlyPaymentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: SEND_PAYSLIP,
                variables: {
                    monthlyPaymentId
                }
            })
            resolve(res.data.sendPayslip)
        }catch (err ) {
            reject(err)
        }
    })

}


export const addPayroll = (workGroupId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_PAYROLL,
                variables: {
                    workGroupId
                }
            })
            resolve(res.data.addPayroll)
        }catch (err ) {
            reject(err)
        }
    })

}


export const deletePayroll = (monthlyPaymentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: DELETE_PAYROLL,
                variables: {
                    monthlyPaymentId
                }
            })
            resolve(res.data.deletePayroll)
        }catch (err ) {
            reject(err)
        }
    })

}
