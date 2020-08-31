import {apolloClient} from "@/services/apollo-client";
import {ADD_MONTHLY_DOCUMENT, DELETE_MONTHLY_DOCUMENT, GET_MONTHLY_DOCUMENTS} from "@/graphql/MonthlyDocument";

export const getMonthlyDocuments = (monthlyPaymentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_MONTHLY_DOCUMENTS,
                variables: {
                    monthlyPaymentId
                }
            })
            resolve(res.data.getMonthlyDocuments)
        } catch (err) {
            reject(err)
        }
    })
}


export const addMonthlyDocument = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_MONTHLY_DOCUMENT,
                variables: form
            })
            resolve(res.data.addMonthlyDocument)
        } catch (err) {
            reject(err)
        }
    })
}

export const deleteMonthlyDocument = (monthlyDocumentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: DELETE_MONTHLY_DOCUMENT,
                variables: {
                    monthlyDocumentId
                }
            })
            resolve(res.data.deleteMonthlyDocument)
        } catch (err) {
            reject(err)
        }
    })
}