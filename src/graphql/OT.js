import gql from 'graphql-tag'

export const UPLOAD_OT = gql`
    mutation (
        $info: UploadOTInput
    ) {
        uploadOT(info: $info)
    }
`