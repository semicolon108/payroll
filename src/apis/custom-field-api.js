import {apolloClient} from "@/services/apollo-client";
import {GET_CUSTOM_FIELDS, ADD_CUSTOM_FIELD} from "@/graphql/CustomField";

export const getCustomFieldsApi = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_CUSTOM_FIELDS,
            })
            resolve(res.data.getCustomFields)
        } catch (e) {
            reject(e)
        }
    })
}

export const addCustomFieldApi = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: ADD_CUSTOM_FIELD,
                variables: form
            })
            resolve(res.data.addCustomFieldApi)
        } catch (e) {
            reject(e)
        }
    })
}
