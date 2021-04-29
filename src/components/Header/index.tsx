import { NextPage } from 'next';
import Router from 'next/router';
import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';

import styles from './Header.module.scss';

interface HeaderProps {
  withBackButton?: boolean;
}

export const Header: NextPage<HeaderProps> = ({ withBackButton }) => {
  return (
    <header className={styles.containerHeader}>
      <div className={styles.logoHeader}>
        <img src="/logoImage.svg" alt="logo" />
        <strong>github<span>_explorer</span></strong>
      </div>

      {withBackButton &&
        <div className={styles.backButton} onClick={() => Router.back()}>
          <FaAngleLeft size={20} />
          <span>Voltar</span>
        </div>
      }
    </header>
  )
};