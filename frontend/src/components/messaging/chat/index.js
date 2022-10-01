import React, { useState, useEffect } from 'react'
import { groupBy } from 'lodash-es'
import { useQuery, useSubscription, useMutation } from '@apollo/client'
import PageWrapper from 'components/layouts/PageWrapper'
import { MY_MESSAGES_QUERY } from 'graphql/queries/messages'
import { MY_MESSAGES_SUBSCRIPTION } from 'graphql/subscriptions/messages'
import { SEND_MESSAGE_MUTATION } from 'graphql/mutations/messageOps'
import { faOldRepublic } from '@fortawesome/free-brands-svg-icons'
import { TextField } from '@material-ui/core'
import { Formik } from 'formik'
import schema from '@hackjunction/shared/schemas/validation/messageSchema'
import { fieldNameFromStoreName } from '@apollo/client/cache'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import { userProfile } from 'redux/user/selectors'

/**
 * Functioncomponent that renders a chat
 * window for a given recipient id list
 */
export function Chat({ recipients = [] }) {
    const { userId } = useSelector(userProfile)
    const [messages, setMessages] = useState([])
    const {
        data,
        loading: queryLoading,
        error: queryError,
    } = useQuery(MY_MESSAGES_QUERY, {
        variables: { recipients },
    })
    const { data: newMessage, loading: subscriptionLoading } = useSubscription(
        MY_MESSAGES_SUBSCRIPTION,
    )
    const [sendMessage, { loading: mutationLoading, error: mutationError }] =
        useMutation(SEND_MESSAGE_MUTATION)

    const onSubmit = values => {
        sendMessage({
            variables: {
                input: {
                    recipients: [...recipients, userId],
                    content: values.content,
                },
            },
        })
    }

    useEffect(() => {
        if (data) {
            setMessages(old => {
                const newArray = [...old, ...data.messages]
                newArray.sort(
                    (a, b) => +new Date(a.sentAt) - +new Date(b.sentAt),
                )
                return old.length === 0 ? newArray : old
            })
        }
        if (newMessage) {
            setMessages(old => {
                const newArray = [...old, newMessage.newMessage]
                newArray.sort(
                    (a, b) => +new Date(a.sentAt) - +new Date(b.sentAt),
                )
                return newArray
            })
        }
    }, [data, setMessages, newMessage])

    return (
        <PageWrapper loading={queryLoading || mutationLoading}>
            <div>
                {messages.length > 0 &&
                    messages.map(m => {
                        return (
                            <div key={m.id}>
                                {m.sender}, {m.content}, {m.sentAt}
                            </div>
                        )
                    })}
            </div>
            <div>
                <Formik
                    initialValues={{ content: '' }}
                    onSubmit={onSubmit}
                    validationSchema={schema}
                >
                    {({ values, handleChange, handleSubmit }) => (
                        <div>
                            <TextField
                                name="content"
                                value={values.content}
                                onChange={handleChange}
                            />
                            <Button onClick={() => handleSubmit()}>Send</Button>
                        </div>
                    )}
                </Formik>
            </div>
            <div>{queryError && JSON.stringify(queryError)}</div>
        </PageWrapper>
    )
}
