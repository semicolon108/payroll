import {apolloClient} from "@/services/apollo-client";
import {ADD_OR_UPDATE_HIRING_DETAIL, GET_HIRING_DETAIL} from "@/graphql/HirringDetail";

export const getHirringDetail = (employeeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_HIRING_DETAIL,
                variables: {
                    employeeId
                }
            })
            resolve(res.data.getHiringDetail)
        } catch (err) {
            reject(err)
        }
    })
}

export const addOrUpdateHirringDetail = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_OR_UPDATE_HIRING_DETAIL,
                variables: form
            })
            resolve(res.data.addOrUpdateHiringDetail)
        } catch (err) {
            reject(err)
        }
    })
}