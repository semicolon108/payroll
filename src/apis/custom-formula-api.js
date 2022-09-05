import {apolloClient} from "@/services/apollo-client";
import {GET_CUSTOM_FORMULAS, GET_CUSTOM_FORMULAS_BY_NAME, ADD_CUSTOM_FORMULA, DELETE_CUSTOM_FORMULA} from "@/graphql/CustomFormula";

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

export const getCustomFormulasByNameApi = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_CUSTOM_FORMULAS_BY_NAME,
                variables: {
                    name: 'Pension Fund'
                }
            })
            resolve(res.data.getCustomFormulasByName)
        } catch (e) {
            reject(e)
        }
    })
}

export const addCustomFormulaApi = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_CUSTOM_FORMULA,
                variables: {
                    info: form
                }

            })
            resolve(res.data.addCustomFormula)
        } catch (e) {
            reject(e)
        }
    })
}


export const deleteCustomFormulaApi = (customFormulaId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: DELETE_CUSTOM_FORMULA,
                variables: {
                    customFormulaId
                }

            })
            resolve(res.data.deleteCustomFormula)
        } catch (e) {
            reject(e)
        }
    })
}

