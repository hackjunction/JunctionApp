import {
    createHttpLink,
    ApolloLink,
    InMemoryCache,
    ApolloClient,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import config from 'constants/config'

const httpLink = createHttpLink({
    uri: '/graphql',
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
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
