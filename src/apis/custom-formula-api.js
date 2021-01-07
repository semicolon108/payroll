import {apolloClient} from "@/services/apollo-client";
import {GET_CUSTOM_FORMULAS, ADD_CUSTOM_FORMULA} from "@/graphql/CustomFormula";

export const getCustomFormulasApi = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_CUSTOM_FORMULAS,
            })
            resolve(res.data.getCustomFormulas)
        } catch (e) {
            reject(e)
        }
    })
}

export const addCustomFormulaApi = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: ADD_CUSTOM_FORMULA,
                variables: form

            })
            resolve(res.data.addCustomFormula)
        } catch (e) {
            reject(e)
        }
    })
}
