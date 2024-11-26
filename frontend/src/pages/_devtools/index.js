import Button from 'components/generic/Button'
import TextAreaInput from 'components/inputs/TextAreaInput'
import TextInput from 'components/inputs/TextInput'
import React from 'react'

const DevTools = () => {
    return (
        <div className="tw-flex tw-flex-col tw-items-center tw-p-8">
            <div className="tw-flex tw-flex-col tw-gap-4 tw-max-w-5xl">
                <h1>Dev Tools</h1>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-border-black tw-border-solid tw-rounded-md tw-p-2">
                    <h2>Single test user creation</h2>
                    <p>
                        This tool allows you to create a test user with a
                        specific user ID. This is useful for testing
                        user-specific features.
                    </p>
                    <Button
                        variant="contained"
                        onClick={() => console.log('clicked on create')}
                    >
                        Create test user
                    </Button>
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-border-black tw-border-solid tw-rounded-md tw-p-2">
                    <h2>Test user group creation</h2>
                    <p>
                        This tool allows you to create multiple test users,
                        follow the comma separated template, "tag,email slug,
                        userID prefix, eventID,amount of accounts to create"
                    </p>
                    <p>
                        Example input: TEST_ACCOUNT,testAccount,
                        testid,1234567890,1000
                    </p>
                    <code>{`[{user: {userID:testid|1, email:testAccount@test.com,tags:['TEST_ACCOUNT'],registrations:[0:{eventId:'1234567890',status:'pending',registration:'76adfs7ad67as'}]}},...till user 1000]`}</code>
                    <TextInput placeholder="TAG ,email slug,user ID prefix, eventID to register participant, amount of accounts to create" />
                    <Button
                        variant="contained"
                        onClick={() => console.log('clicked on delete')}
                    >
                        Add users
                    </Button>
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-border-black tw-border-solid tw-rounded-md tw-p-2">
                    <h2>Test user deletion</h2>
                    <p>
                        This tool allows you to delete a test user with a
                        specific user ID. This is useful for testing
                        user-specific features.
                    </p>
                    <TextAreaInput placeholder="Enter user ID" />
                    <Button
                        variant="contained"
                        onClick={() => console.log('clicked on delete')}
                    >
                        Delete list of users
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DevTools
