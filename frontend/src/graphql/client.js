import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
    uri: '/graphql',
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

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    })
}
