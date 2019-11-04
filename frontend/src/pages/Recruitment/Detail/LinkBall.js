import React from 'react';
import styles from './RecruitmentUserModal.module.scss';

const LinkBall = props => {
  return (
    <a className={styles.linkBall} href={props.target} target={'_blank'}>
      {props.children}
    </a >
  );
};

export default LinkBall;
