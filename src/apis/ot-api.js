import {apolloClient} from "@/services/apollo-client";
import {UPLOAD_OT} from "@/graphql/OT";

export const uploadOT = (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await apolloClient.mutate({
                mutation: UPLOAD_OT,
                variables: {
                    info: form
                }
            })
            resolve(res.data.uploadOT)
        }catch (err ) {
            reject(err)
        }
    })

}
