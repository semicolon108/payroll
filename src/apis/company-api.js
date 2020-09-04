import {apolloClient} from "@/services/apollo-client";
import {GET_COMPANY, UPDATE_COMPANY} from "@/graphql/Company";


export const getCompany = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_COMPANY,
            })
            resolve(res.data.getCompany)
        } catch (err) {
            reject(err)
        }
    })
}


export const updateCompany = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: UPDATE_COMPANY,
                variables: {
                    info: form
                }
            })
            resolve(res.data.updateCompany)
        } catch (err) {
            reject(err)
        }
    })
}
