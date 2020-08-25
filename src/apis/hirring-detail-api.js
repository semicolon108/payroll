import {apolloClient} from "@/services/apollo-client";
import {ADD_OR_UPDATE_HIRRING_DETAIL, GET_HIRRING_DETAIL} from "@/graphql/HirringDetail";

export const getHirringDetail = (employeeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_HIRRING_DETAIL,
                variables: {
                    employeeId
                }
            })
            resolve(res.data.getHirringDetail)
        } catch (err) {
            reject(err)
        }
    })
}

export const addOrUpdateHirringDetail = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_OR_UPDATE_HIRRING_DETAIL,
                variables: form
            })
            resolve(res.data.addOrUpdateHirringDetail)
        } catch (err) {
            reject(err)
        }
    })
}