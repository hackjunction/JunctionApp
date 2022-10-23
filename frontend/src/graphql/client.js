import {
    createHttpLink,
    ApolloLink,
    InMemoryCache,
    ApolloClient,
    split,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import config from 'constants/config'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

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
    const wsLink = new GraphQLWsLink(
        createClient({
            url: 'ws://' +window.location.href+ ':2222/graphql',
            connectionParams: { authToken: idToken },
        }),
    )

    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query)
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            )
        },
        wsLink,
        httpLink,
    )

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
    links.push(splitLink)

    return new ApolloClient({
        link: ApolloLink.from(links),
        cache: new InMemoryCache(),
    })
}
