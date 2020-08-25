import {apolloClient} from "@/services/apollo-client";
import {GET_MONTHLY_PAYMENTS} from "@/graphql/MonthlyPayment";

export const getMonthlyPayments = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_MONTHLY_PAYMENTS
            })
            resolve(res.data.getMonthlyPayments)
        } catch (err) {
            reject(err)
        }
    })
}