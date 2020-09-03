import {apolloClient} from "@/services/apollo-client";
import {ADD_OR_UPDATE_COMPANY_CURRENCY, GET_COMPANY_CURRENCIES} from "@/graphql/CompanyCurrency";

export const getCompanyCurrencies = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_COMPANY_CURRENCIES
            })
            resolve(res.data.getCompanyCurrencies)
        } catch (err) {
            reject(err)
        }
    })
}


export const addOrUpdateCompanyCurrency = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_OR_UPDATE_COMPANY_CURRENCY,
                variables: {
                    info: form
                }
            })
            resolve(res.data.addOrUpdateCompanyCurrency)
        } catch (err) {
            reject(err)
        }
    })
}