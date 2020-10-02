import { apolloClient } from "@/services/apollo-client";
import {DELETE_POSITION, GET_POSITIONS} from "@/graphql/Position";


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


export const deletePosition = (positionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: DELETE_POSITION,
                variables: {
                    positionId
                }
            })
            resolve(res.data.deletePosition)
        } catch (err) {
            reject(err)
        }
    })
}