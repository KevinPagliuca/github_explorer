import React from 'react';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.containerHeader}>
      <div className={styles.logoHeader}>
        <img src="/logoImage.svg" alt="logo" />
        <strong>github<span>_explorer</span></strong>
      </div>
    </header>
  )
};