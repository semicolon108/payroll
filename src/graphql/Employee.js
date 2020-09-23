import gql from 'graphql-tag'

export const GET_EMPLOYEES = gql`

    {
        getEmployees {
            _id
            employeeCode
            firstName
            lastName
            dateOfBirth
            contactName
            idCardOrPassport
            email
            ssoId
            isSso
            emergencyContact {
                fullName
                #  relationship
                contactNumber
            }
            bankAccount {
                bankName
                accountName
                accountNumber
            }
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
            dateOfBirth
            contactName
            idCardOrPassport
            email
            ssoId
            isSso
            emergencyContact {
                fullName
                relationshipId {
                    _id
                    name
                }
                contactNumber
            }
            bankAccount {
                bankName
                accountName
                accountNumber
            }

            genderId {
                _id
                name
            }
            maritalStatusId {
                _id
                name
            }
            nationalityId {
                _id
                name
            }
            image {
                _id
                name
                src
                size

            }

        }
    }

`

export const ADD_EMPLOYEE = gql`

    mutation(
        $employeeCode: ID!
        $firstName: String!
        $lastName: String!
        $dateOfBirth: Date!
        $contactName: String!
        $idCardOrPassport: String!
        $email: String!
        $ssoId: String!
        $isSso: Boolean!
        $emergencyContact: EmergencyContactInput!
        $bankAccount: BankAccountInput!

        $genderId: ID!
        $maritalStatusId: ID!
        $nationalityId: ID!

        $image: AddFileInput
    ) {
        addEmployee(
            info: {
                employeeCode: $employeeCode
                firstName: $firstName
                lastName: $lastName
                dateOfBirth: $dateOfBirth
                contactName: $contactName
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
            }
        ) {
            _id
            employeeCode
            firstName
            lastName
            dateOfBirth
            contactName
            idCardOrPassport
            email
            ssoId
            isSso
            emergencyContact {
                fullName
                relationshipId {
                    _id
                    name
                }
                contactNumber
            }
            bankAccount {
                bankName
                accountName
                accountNumber
            }

            genderId {
                _id
                name
            }
            maritalStatusId {
                _id
                name
            }
            nationalityId {
                _id
                name
            }
            image {
                _id
                name
            }
        }
    }

`

export const UPDATE_EMPLOYEE = gql`

    mutation(
        $employeeId: ID!

        $employeeCode: ID!
        $firstName: String!
        $lastName: String!
        $dateOfBirth: Date!
        $contactName: String!
        $idCardOrPassport: String!
        $email: String!
        $ssoId: String!
        $isSso: Boolean!
        $emergencyContact: EmergencyContactInput!
        $bankAccount: BankAccountInput!

        $genderId: ID!
        $maritalStatusId: ID!
        $nationalityId: ID!

        $image: AddFileInput
    ) {
        updateEmployee(
            info: {
                employeeId: $employeeId
                employeeCode: $employeeCode
                firstName: $firstName
                lastName: $lastName
                dateOfBirth: $dateOfBirth
                contactName: $contactName
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
            }
        ) {
            _id
            employeeCode
            firstName
            lastName
            dateOfBirth
            contactName
            idCardOrPassport
            email
            ssoId
            isSso
            emergencyContact {
                fullName
                relationshipId {
                    _id
                    name
                }
                contactNumber
            }
            bankAccount {
                bankName
                accountName
                accountNumber
            }

            genderId {
                _id
                name
            }
            maritalStatusId {
                _id
                name
            }
            nationalityId {
                _id
                name
            }
            image {
                _id
                name
            }
        }
    }

`