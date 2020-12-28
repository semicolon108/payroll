import {apolloClient} from '@/services/apollo-client'
import {ADD_OR_UPDATE_ACTUAL_WORKING_DAY} from '@/graphql/ActualWorkingDay'

export const addOrUpdateActualWorkingDay = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_OR_UPDATE_ACTUAL_WORKING_DAY,
                variables: form
            })
            resolve(res.data.addOrUpdateActualWorkingDay)
        } catch (err) {
            reject(err)
        }
    })
}



