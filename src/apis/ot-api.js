import {apolloClient} from "@/services/apollo-client";
import {GET_OT_BY_MONTH, UPLOAD_OT, CLEAR_OT} from "@/graphql/OT";



export const getOTByMonth = (monthlyPaymentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_OT_BY_MONTH,
                variables: {
                    monthlyPaymentId
                }
            })
            resolve(res.data.getOTByMonth)
        }catch (err ) {
            reject(err)
        }
    })
}


export const uploadOT = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: UPLOAD_OT,
                variables: {
                    info: form
                }
            })
            resolve(res.data.uploadOT)
        }catch (err ) {
            reject(err)
        }
    })
}


export const clearOT = ( monthlyPaymentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: CLEAR_OT,
                variables: {
                    monthlyPaymentId
                }
            })
            resolve(res.data.clearOT)
        }catch (err ) {
            reject(err)
        }
    })
}
