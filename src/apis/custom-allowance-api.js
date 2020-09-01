import {apolloClient} from "@/services/apollo-client";
import {ADD_OR_UPDATE_CUSTOM_ALLOWANCE, GET_CUSTOM_ALLOWANCE} from "@/graphql/CutomAllowance";


export const getCustomAllowance = (employeeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: GET_CUSTOM_ALLOWANCE,
                variables: {
                    employeeId
                }
            })
            resolve(res.data.getCustomAllowance)
        } catch (err) {
            reject(err)
        }
    })
}


export const addOrUpdateCustomAllowance = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_OR_UPDATE_CUSTOM_ALLOWANCE,
                variables: form
            })
            resolve(res.data.addOrUpdateCustomAllowance)
        } catch (err) {
            reject(err)
        }
    })
}