
import { apolloClient } from "@/services/apollo-client";
import { GET_EMPS_BY_WAGE_TYPE } from "../graphql/SalaryWageType";

export const getEmpsByWageType = (args) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_EMPS_BY_WAGE_TYPE,
                variables: {
                    wageType: args.wageType,
                    monthlyPaymentId: args.monthlyPaymentId
                }
            })
            resolve(res.data.getEmpsByWageType)
        } catch (err) {
            reject(err)
        }
    })
}

