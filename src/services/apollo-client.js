import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'
import {baseURL} from "@/config/variables";


Vue.use(VueApollo)

const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('accessToken')

    // Return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjI4ZDkzMGYxNGRmZDA4ZjE0ZjA0NjgiLCJpYXQiOjE1OTY1MTI2MzEsImV4cCI6MTYwNDI4ODYzMX0.FsnTiLi3psUcElTZbfjQA2rb0-oyblOLy9K9PDEvNdc'
        }
    }
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

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClientz = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    defaultOptions
})

const apolloProvider = new VueApollo({
    defaultClient: apolloClientz,
})

export default apolloProvider

export const apolloClient = apolloProvider.defaultClient