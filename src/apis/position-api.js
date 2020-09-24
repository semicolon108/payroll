import { apolloClient } from "@/services/apollo-client";
import {GET_POSITIONS} from "@/graphql/Position";


export const getPositions = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_POSITIONS
            })
            resolve(res.data.getPositions)
        } catch (err) {
            reject(err)
        }
    })
}