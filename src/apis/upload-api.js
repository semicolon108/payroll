import { apolloClient } from "@/services/apollo-client";
import {UPLOAD_EMPLOYEES_SALARY} from '@/graphql/Upload'

export const uploadEmployeesSalaryApi = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: UPLOAD_EMPLOYEES_SALARY,
                variables: {
                    info: form
                }
            })
            resolve(res.data.uploadEmployeesSalary)
        } catch (err) {
            reject(err)
        }
    })
}