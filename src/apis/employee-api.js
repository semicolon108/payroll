import {apolloClient} from "@/services/apollo-client";
import {GET_EMPLOYEE, UPDATE_CUSTOM_FIELDS_BY_EMP} from "@/graphql/Employee";

export const getEmployeeApi = (employeeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.query({
                query: GET_EMPLOYEE,
                variables: {
                    employeeId
                }
            })
            resolve(res.data.getEmployee)
        } catch (err) {
            reject(err)
        }
    })
}


export const updateCustomFieldsByEmpApi = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: UPDATE_CUSTOM_FIELDS_BY_EMP,
                variables: form
            })
            resolve(res.data.updateCustomFieldsByEmp)
        } catch (err) {
            reject(err)
        }
    })
}
