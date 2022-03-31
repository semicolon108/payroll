import gql from 'graphql-tag'

export const UPLOAD_EMPLOYEES_SALARY = gql`

    mutation ($info: UploadEmployeesSalaryInput) {
        uploadEmployeesSalary(info: $info)
    }


`