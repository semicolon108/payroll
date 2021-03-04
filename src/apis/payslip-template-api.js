import { apolloClient } from "@/services/apollo-client";
import { GET_PAYSLIP_TEMPLATE, ADD_OR_UPDATE_PAYSLIP_TEMPLATE } from "@/graphql/PayslipTemplate";


export const getPayslipTemplateApi = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_PAYSLIP_TEMPLATE
            })
            resolve(res.data.getPayslipTemplate)
        } catch (err) {
            reject(err)
        }
    })
}



export const addOrUpdatePayslipTemplateApi = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_OR_UPDATE_PAYSLIP_TEMPLATE,
                variables: form
            })
            resolve(res.data.addOrUpdatePayslipTemplate)
        } catch (err) {
            reject(err)
        }
    })
}