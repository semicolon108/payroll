import {apolloClient} from "@/services/apollo-client";
import {GET_CUSTOM_FORMULAS} from "@/graphql/CustomFormula";

export const getCustomFormulas = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_CUSTOM_FORMULAS,
            })
            resolve(res.data.getCustomFormulas)
        } catch (err) {
            reject(err)
        }
    })
}
