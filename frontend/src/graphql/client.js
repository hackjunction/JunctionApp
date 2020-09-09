import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import config from 'constants/config'

const httpLink = createHttpLink({
    uri: '/graphql',
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        )
    console.log(graphQLErrors)
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

export default idToken => {
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: idToken ? `Bearer ${idToken}` : '',
            },
        }
    })

    const links = []

    if (config.IS_DEBUG) {
        links.push(errorLink)
    }
    links.push(authLink)
    links.push(httpLink)

    return new ApolloClient({
        link: ApolloLink.from(links),
        cache: new InMemoryCache(),
    })
}
