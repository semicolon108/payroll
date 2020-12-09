import {GET_WORKING_LOCATIONS, ADD_WORKING_LOCATION, UPDATE_WORKING_LOCATION, DELETE_WORKING_LOCATION} from '@/graphql/WorkingLocation'
import { apolloClient } from "@/services/apollo-client";

export const getWorkingLocations = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_WORKING_LOCATIONS
            })
            resolve(res.data.getWorkingLocations)
        } catch (err) {
            reject(err)
        }
    })
}

export const addWorkingLocation = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_WORKING_LOCATION,
                variables: form
            })
            resolve(res.data.addWorkingLocation)
        } catch (err) {
            reject(err)
        }
    })
}



export const updateWorkingLocation = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: UPDATE_WORKING_LOCATION,
                variables: form
            })
            resolve(res.data.updateWorkingLocation)
        } catch (err) {
            reject(err)
        }
    })
}


export const deleteWorkingLocation = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: DELETE_WORKING_LOCATION,
                variables: form
            })
            resolve(res.data.deleteWorkingLocation)
        } catch (err) {
            reject(err)
        }
    })
}