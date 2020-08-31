import {apolloClient} from "@/services/apollo-client";
import {GET_CUSTOM_ALLOWANCE} from "@/graphql/CutomAllowance";


export const getCustomAllowance = (employeeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: GET_CUSTOM_ALLOWANCE,
                variables: {
                    employeeId
                }
            })
            resolve(res.data.getCustomAllowance)
        } catch (err) {
            reject(err)
        }
    })
}
