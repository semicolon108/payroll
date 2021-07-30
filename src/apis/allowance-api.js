import {apolloClient} from "@/services/apollo-client";
import {ADD_OR_UPDATE_ALLOWANCE, GET_ALLOWANCE} from "@/graphql/Allowance";


export const getAllowance = (employeeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: GET_ALLOWANCE,
                variables: {
                    employeeId
                }
            })
            resolve(res.data.getAllowance)
        } catch (e) {
            reject(e)
        }
    })
}

export const addOrUpdateAllowance = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_OR_UPDATE_ALLOWANCE,
                variables: form
            })
            resolve(res.data.addOrUpdateAllowance)
        } catch (e) {
            reject(e)
        }
    })
}