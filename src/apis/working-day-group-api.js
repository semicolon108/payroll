import {GET_WORKING_DAY_GROUPS, ADD_WORKING_DAY_GROUP, UPDATE_WORKING_DAY_GROUP, DELETE_WORKING_DAY_GROUP} from '@/graphql/WorkingDayGroup'
import { apolloClient } from "@/services/apollo-client";

export const getWorkingDayGroups = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_WORKING_DAY_GROUPS
            })
            resolve(res.data.getWorkingDayGroups)
        } catch (err) {
            reject(err)
        }
    })
}




export const addWorkingDayGroup = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_WORKING_DAY_GROUP,
                variables: form
            })
            resolve(res.data.addWorkingDayGroup)
        } catch (err) {
            reject(err)
        }
    })
}

export const updateWorkingDayGroup = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: UPDATE_WORKING_DAY_GROUP,
                variables: form
            })
            resolve(res.data.updateWorkingDayGroup)
        } catch (err) {
            reject(err)
        }
    })
}

export const deleteWorkingDayGroup = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: DELETE_WORKING_DAY_GROUP,
                variables: form
            })
            resolve(res.data.deleteWorkingDayGroup)
        } catch (err) {
            reject(err)
        }
    })
}