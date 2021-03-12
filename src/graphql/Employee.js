import gql from 'graphql-tag'

export const GET_EMPLOYEES = gql`

    {
        getEmployees {
            _id
            image {
                src
            }
            employeeCode
            firstName
            lastName
            firstNameLao
            lastNameLao
            dateOfBirth
            mobile
            idCardOrPassport
            email
            ssoId
            isSso
            mobile
            gender

            emergencyContact {
                fullName
                contactNumber
                relationshipId
            }
            bankAccount {
                bankId
                accountName
                accountNumber
            }
            position
            department

            isExpat
            isCompleted
        }
    }

`

export const GET_EMPLOYEE = gql`

    query(
        $employeeId: ID!
    ) {
        getEmployee(
            employeeId: $employeeId
        ) {
            _id
            employeeCode
            firstName
            lastName
            firstNameLao
            lastNameLao
            dateOfBirth
            mobile
            idCardOrPassport
            email
            ssoId
            isSso
            
            emergencyContact {
                fullName
                relationshipId
                contactNumber
            }
            bankAccount {
                bankId
                accountName
                accountNumber
            }

            genderId 
            gender
            maritalStatusId 
            nationalityId
            image {
                _id
                name
                src
                size
            }
            isExpat
            customFields {
                key
                value
            }

        }
    }

`

export const ADD_EMPLOYEE = gql`

    mutation(
        $employeeCode: ID!
        $firstName: String!
        $lastName: String!
        $dateOfBirth: Date
        $mobile: String
        $idCardOrPassport: String
        $email: String
        $ssoId: String
        $isSso: Boolean!
        $emergencyContact: EmergencyContactInput
        $bankAccount: BankAccountInput

        $genderId: ID!
        $maritalStatusId: ID!
        $nationalityId: ID!

        $image: AddFileInput

        $isExpat: Boolean!
    ) {
        addEmployee(
            info: {
                employeeCode: $employeeCode
                firstName: $firstName
                lastName: $lastName
                dateOfBirth: $dateOfBirth
                mobile: $mobile
                idCardOrPassport: $idCardOrPassport
                email: $email
                ssoId: $ssoId
                isSso: $isSso
                emergencyContact: $emergencyContact
                bankAccount: $bankAccount

                genderId: $genderId
                maritalStatusId: $maritalStatusId
                nationalityId: $nationalityId
                image: $image
                isExpat: $isExpat
            }
        ) {
            _id
            firstName
            lastName
            dateOfBirth
            mobile
            idCardOrPassport
            email
            ssoId
            isSso
            emergencyContact {
                fullName
                relationshipId
                contactNumber
            }
            bankAccount {
                bankId
                accountName
                accountNumber
            }

            genderId
            maritalStatusId 
            nationalityId
            image {
                _id
                name
            }
            isExpat
        }
    }

`

export const UPDATE_EMPLOYEE = gql`

    mutation(
        $employeeId: ID!

        $employeeCode: ID!
        $firstName: String!
        $lastName: String!
        $firstNameLao: String
        $lastNameLao: String
        $dateOfBirth: Date
        $mobile: String
        $idCardOrPassport: String
        $email: String
        $ssoId: String
        $isSso: Boolean!
        $emergencyContact: EmergencyContactInput
        $bankAccount: BankAccountInput

        $genderId: ID!
        $maritalStatusId: ID!
        $nationalityId: ID!

        $image: AddFileInput
        $isExpat: Boolean!

    ) {
        updateEmployee(
            info: {
                employeeId: $employeeId
                employeeCode: $employeeCode
                firstName: $firstName
                lastName: $lastName

                firstNameLao: $firstNameLao
                lastNameLao: $lastNameLao

                dateOfBirth: $dateOfBirth
                mobile: $mobile
                idCardOrPassport: $idCardOrPassport
                email: $email
                ssoId: $ssoId
                isSso: $isSso
                emergencyContact: $emergencyContact
                bankAccount: $bankAccount

                genderId: $genderId
                maritalStatusId: $maritalStatusId
                nationalityId: $nationalityId
                image: $image

                isExpat: $isExpat
            }
        ) {
            _id
            employeeCode
            firstName
            lastName
            firstNameLao
            lastNameLao
            dateOfBirth
            mobile
            idCardOrPassport
            email
            ssoId
            isSso
            emergencyContact {
                fullName
                relationshipId
                contactNumber
            }
            bankAccount {
                bankId
                accountName
                accountNumber
            }
            genderId
            maritalStatusId
            nationalityId
            image {
                _id
                name
            }
            isExpat
        }
    }

`

export const UPDATE_CUSTOM_FIELDS_BY_EMP = gql`
    mutation (
    $employeeId: ID!
    $customFields: [EmCustomFieldInput]
    ) {
    updateCustomFieldsByEmp(
        employeeId: $employeeId
        customFields: $customFields
    )
    }

`