import {apolloClient} from "@/services/apollo-client";
import {GET_MONTHLY_DOCUMENTS} from "@/graphql/MonthlyDocument";

export const getMonthlyDocuments = (monthlyPaymentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_MONTHLY_DOCUMENTS,
                variables: {
                    monthlyPaymentId
                }
            })
            resolve(res.data.getMonthlyDocuments)
        } catch (err) {
            reject(err)
        }
    })
}
