import React, { useState, useCallback } from 'react';
import styles from './BulkEmailDrawer.module.scss';

import { connect } from 'react-redux';
import { Drawer, Button as AntButton, Divider as AntDivider, Input, Modal, notification, Popconfirm } from 'antd';

import Divider from 'components/generic/Divider';
import * as AuthSelectors from 'redux/auth/selectors';
import * as OrganiserSelectors from 'redux/organiser/selectors';
import EmailService from 'services/email';

const BulkEmailDrawer = ({ registrationIds, buttonProps, user, idToken, event }) => {
    const [visible, setVisible] = useState(false);
    const [testEmail, setTestEmail] = useState(user.email);
    const [testModalVisible, setTestModalVisible] = useState(false);
    const [testModalLoading, setTestModalLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const [subject, setSubject] = useState();
    const [subtitle, setSubtitle] = useState();
    const [headerImage, setHeaderImage] = useState();
    const [body, setBody] = useState();
    const [ctaText, setCtaText] = useState();
    const [ctaLink, setCtaLink] = useState();
    const [messageId, setMessageId] = useState();

    const params = {
        subject: subject,
        subtitle: subtitle,
        header_image: headerImage,
        body: body,
        cta_text: ctaText,
        cta_link: ctaLink
    };

    const handleClose = useCallback(() => {
        setVisible(false);
    }, []);

    const handleCloseModal = useCallback(() => {
        setTestModalVisible(false);
    }, []);

    const handleTestEmail = useCallback(() => {
        setTestModalLoading(true);
        EmailService.sendPreviewEmail(idToken, event.slug, testEmail, params)
            .then(() => {
                notification.success({
                    message: 'Success',
                    description: 'Check your inbox!'
                });
            })
            .catch(err => {
                console.log(err);
                notification.error({
                    message: 'Something went wrong...',
                    description: 'Did you enter a valid email address?'
                });
            })
            .finally(() => {
                setTestModalLoading(false);
                setTestModalVisible(false);
            });
        return null;
    }, [idToken, event.slug, testEmail, params]);

    const handleConfirm = useCallback(() => {
        setLoading(true);
        EmailService.sendBulkEmail(idToken, event.slug, registrationIds, params, messageId)
            .then(() => {
                notification.success({
                    message: 'Success'
                });
            })
            .catch(err => {
                notification.error({
                    message: 'Something went wrong...',
                    description: 'Are you connected to the internet?'
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [idToken, event.slug, params, registrationIds, messageId]);

    return (
        <React.Fragment>
            <Modal
                title="Send this to yourself"
                visible={testModalVisible}
                onOk={handleTestEmail}
                onCancel={handleCloseModal}
                confirmLoading={testModalLoading}
            >
                <Input
                    size="large"
                    placeholder="Your email address"
                    value={testEmail}
                    onChange={e => setTestEmail(e.target.value)}
                />
            </Modal>
            <Drawer
                title={`Email ${registrationIds.length} selected registrations`}
                placement="right"
                width={640}
                closable={true}
                onClose={handleClose}
                visible={visible}
                getContainer={false}
            >
                <AntDivider>Bulk email</AntDivider>
                <p>
                    Here you can send an email to all selected participants. Type in your own email address below to
                    test the email before sending it out to everyone!
                </p>
                <label className={styles.label}>Header image url</label>
                <Input
                    value={headerImage}
                    onChange={e => setHeaderImage(e.target.value)}
                    type="text"
                    size="large"
                    placeholder="https://"
                ></Input>
                <span className={styles.hint}>Url to a header image for your email</span>
                <Divider size={1} />
                <label className={styles.label}>Message subject</label>
                <Input
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    type="text"
                    size="large"
                    placeholder="Subject"
                ></Input>
                <span className={styles.hint}>The subject line of your message</span>
                <Divider size={1} />
                <label className={styles.label}>Message subtitle</label>
                <Input
                    value={subtitle}
                    onChange={e => setSubtitle(e.target.value)}
                    type="text"
                    size="large"
                    placeholder="Your subtitle"
                ></Input>
                <span className={styles.hint}>A subtitle to be shown under the subject (optional)</span>
                <Divider size={1} />
                <label className={styles.label}>Message body</label>
                <Input.TextArea
                    size="large"
                    type="text"
                    placeholder="We're just reaching out to let you know..."
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    autosize={{
                        minRows: 10,
                        maxRows: 20
                    }}
                ></Input.TextArea>
                <span className={styles.hint}>The content of your email</span>
                <Divider size={1} />
                <label className={styles.label}>Unique message id</label>
                <Input
                    value={messageId}
                    onChange={e => setMessageId(e.target.value)}
                    size="large"
                    placeholder="something-you-will-remember"
                />
                <span className={styles.hint}>
                    If you want, you can enter a unique message id here. Messages with the same id will only be sent
                    once to a given participant - this is useful if you want to avoid sending out the same message to a
                    participant who has already received it earlier.
                </span>
                <Divider size={1} />
                <label className={styles.label}>Call to action</label>
                <Input
                    value={ctaText}
                    onChange={e => setCtaText(e.target.value)}
                    size="large"
                    placeholder="Click this button"
                />
                <span className={styles.hint}>
                    If your want a Call to Action button in your email, enter the text for the button here.
                </span>
                <Divider size={1} />
                <label className={styles.label}>Call to action link</label>
                <Input
                    value={ctaLink}
                    onChange={e => setCtaLink(e.target.value)}
                    size="large"
                    placeholder="https://..."
                />
                <span className={styles.hint}>Enter the link where your Call to Action button should lead</span>
                <Divider size={2} />
                <AntButton size="large" block type="primary" onClick={setTestModalVisible}>
                    Test email
                </AntButton>
                <Divider size={1} />
                <Popconfirm
                    title="Are you sure? You can't un-send this email"
                    onConfirm={handleConfirm}
                    okText="Yes"
                    cancelText="No"
                >
                    <AntButton size="large" block type="primary" loading={loading}>
                        Send to {registrationIds.length} recipients
                    </AntButton>
                </Popconfirm>
            </Drawer>
            <AntButton type="link" children={`Email all`} onClick={setVisible} {...buttonProps} />
        </React.Fragment>
    );
};

const mapState = state => ({
    user: AuthSelectors.getCurrentUser(state),
    event: OrganiserSelectors.event(state),
    idToken: AuthSelectors.getIdToken(state)
});

export default connect(mapState)(BulkEmailDrawer);
