import { apolloClient } from "@/services/apollo-client";
import {GET_REUSES} from "@/graphql/Reuse";


export const getReuse = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_REUSES,
                variables: {
                    type
                }
            })
            resolve(res.data.getReuses)
        } catch (err) {
            reject(err)
        }
    })
}