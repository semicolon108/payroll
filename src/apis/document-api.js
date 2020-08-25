import {apolloClient} from "@/services/apollo-client";
import {ADD_DOCUMENT, DELETE_DOCUMENT, GET_DOCUMENTS} from "@/graphql/Document";

export const getDocuments = (employeeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_DOCUMENTS,
                variables: {
                    employeeId
                }
            })
            resolve(res.data.getDocuments)
        } catch (err) {
            reject(err)
        }
    })
}


export const addDocument = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: ADD_DOCUMENT,
                variables: form
            })
            resolve(res.data.addDocument)
        } catch (err) {
            reject(err)
        }
    })
}

export const deleteDocument = (documentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: DELETE_DOCUMENT,
                variables: {
                    documentId
                }
            })
            resolve(res.data.deleteDocument)
        } catch (err) {
            reject(err)
        }
    })
}
