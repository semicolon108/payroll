import {apolloClient} from "@/services/apollo-client";
import {ADD_EARN_DEDUCT, DELETE_EARN_DEDUCT, GET_EARN_DEDUCTS, UPDATE_EARN_DEDUCT} from "@/graphql/EarnDeduct";

export const getEarnDeducts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_EARN_DEDUCTS,
            })
            resolve(res.data.getEarnDeducts)
        } catch (err) {
            reject(err)
        }
    })
}

export const addEarnDeduct = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_EARN_DEDUCT,
                variables: form
            })
            resolve(res.data.addEarnDeduct)
        } catch (err) {
            reject(err)
        }
    })
}

export const updateEarnDeduct = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: UPDATE_EARN_DEDUCT,
                variables: form
            })
            resolve(res.data.updateEarnDeduct)
        } catch (err) {
            reject(err)
        }
    })
}

export const deleteEarnDeduct = (earnDeductId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: DELETE_EARN_DEDUCT,
                variables: {
                    earnDeductId
                }
            })
            resolve(res.data.deleteEarnDeduct)
        } catch (err) {
            reject(err)
        }
    })
}
