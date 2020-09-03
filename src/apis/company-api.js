import {apolloClient} from "@/services/apollo-client";
import {GET_COMPANY} from "@/graphql/Company";


export const getCompany = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: GET_COMPANY,
            })
            resolve(res.data.getCompany)
        } catch (err) {
            reject(err)
        }
    })
}