import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'
import {baseURL, 
   logoutURL
} from "@/config/variables";
import { onError } from "apollo-link-error"
import store from '../store'

 Vue.use(VueApollo)

const authLink = setContext(async (_, { headers }) => {
    const token = store.getters.getToken || null
    // const token = store.getters.getToken
    return {
        headers: {
            ...headers,
            Authorization: token  || null
        }
    }
})


const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors)
        graphQLErrors.forEach((err) => {
            if(err.extensions.code === 'UNAUTHENTICATED') {
                window.location.href = logoutURL
            }
        })
   // if (networkError) console.log(`[Network error]: ${networkError}`)
})

const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    }
}


// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: `${baseURL}/graphql`
})

const link = errorLink.concat(authLink.concat(httpLink))

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClientz = new ApolloClient({
    link,
    cache,
    defaultOptions
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClientz,
})

export default apolloProvider

export const apolloClient = apolloClientz