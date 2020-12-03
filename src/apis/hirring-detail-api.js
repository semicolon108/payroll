import {apolloClient} from "@/services/apollo-client";
import {ADD_OR_UPDATE_HIRING_DETAIL, ADJUST_SALARY, GET_HIRING_DETAIL} from "@/graphql/HirringDetail";

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

export const adjustSalary = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADJUST_SALARY,
                variables: {
                    info: form
                }
            })
            resolve(res.data.adjustSalary)
        } catch (err) {
            reject(err)
        }
    })
}