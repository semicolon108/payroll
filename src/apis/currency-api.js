import {apolloClient} from "@/services/apollo-client";
import {GET_CURRENCY} from "@/graphql/Currency";

export const getCurrencies = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: GET_CURRENCY
            })
            resolve(res.data.getCurrencies)
        } catch (err) {
            reject(err)
        }
    })
}
