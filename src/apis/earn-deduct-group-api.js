import {apolloClient} from "@/services/apollo-client";
import {
    ADD_EARN_DEDUCT_GROUP,
    DELETE_EARN_DEDUCT_GROUP,
    GET_EARN_DEDUCT_GROUPS,
    UPDATE_EARN_DEDUCT_GROUP
} from "@/graphql/EarnDeductGroup";

export const getEarnDeductGroups = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_EARN_DEDUCT_GROUPS,
            })
            resolve(res.data.getEarnDeductGroups)
        } catch (err) {
            reject(err)
        }
    })
}

export const addEarnDeductGroup = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_EARN_DEDUCT_GROUP,
                variables: form
            })
            resolve(res.data.addEarnDeductGroup)
        } catch (err) {
            reject(err)
        }
    })
}

export const updateEarnDeductGroup = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: UPDATE_EARN_DEDUCT_GROUP,
                variables: form
            })
            resolve(res.data.updateEarnDeductGroup)
        } catch (err) {
            reject(err)
        }
    })
}

export const deleteEarnDeductGroup = (earnDeductGroupId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: DELETE_EARN_DEDUCT_GROUP,
                variables: {
                    earnDeductGroupId
                }
            })
            resolve(res.data.deleteEarnDeductGroup)
        } catch (err) {
            reject(err)
        }
    })
}