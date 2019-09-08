import React, { useState } from 'react';
import styles from './MarkdownInput.module.scss';

import { Input, Radio } from 'antd';

import ExternalLink from 'components/generic/ExternalLink';
import Divider from 'components/generic/Divider';
import Markdown from 'components/generic/Markdown';

const MarkdownInput = ({ name, value, onChange, onBlur }) => {
    const [mode, setMode] = useState('edit');

    function renderMode() {
        switch (mode) {
            case 'edit':
                return (
                    <Input.TextArea
                        name={name}
                        value={value}
                        onChange={onChange}
                        size="large"
                        autosize={{ minRows: 15, maxRows: 30 }}
                        placeholder="Description goes here"
                    />
                );
            case 'preview':
                return <Markdown source={value} className={styles.preview} />;
            default:
                return null;
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <span className={styles.topDescription}>
                    This field supports{' '}
                    <ExternalLink href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">
                        Markdown
                    </ExternalLink>
                </span>
                <Divider size={1} />
                <Radio.Group value={mode} onChange={e => setMode(e.target.value)}>
                    <Radio.Button value="edit">Edit</Radio.Button>
                    <Radio.Button value="preview">Preview</Radio.Button>
                </Radio.Group>
            </div>
            {renderMode()}
        </div>
    );
};

export default MarkdownInput;
