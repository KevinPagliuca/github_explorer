import React from 'react';
import ReactLoading from 'react-loading';

import styles from './LoadingModal.module.scss';

export const LoadingModal: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backdropContainer} />
      <ReactLoading
        type="spinningBubbles"
        className={styles.loadingContent}
      />
    </div>
  );
}