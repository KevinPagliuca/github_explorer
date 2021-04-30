import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';

import styles from './SingleRepo.module.scss';
import { Header } from '../../components/Header';
import { GetStaticPaths, GetStaticProps } from 'next';
import api from '../../services/api';

const SingleRepo: React.FC = ({ repoInfo }: any) => {
  console.log(repoInfo)
  return (
    <div className={styles.containerSingleRepo}>
      <Head>
        <title>Github_explorer | Explorar</title>
      </Head>

      <Header withBackButton />

      <div className={styles.repoContent}>
        <div className={styles.header}>
          <div className={styles.ownerRepoImg}>
            <Image src={repoInfo.owner.avatar_url} width={400} height={400} />
          </div>
          <div className={styles.repoName}>
            <strong>{repoInfo.full_name}</strong>
            <p>{repoInfo.description}</p>
          </div>
        </div>

        <div className={styles.repoStats}>
          <div>
            <strong>{repoInfo.stargazers_count}</strong>
            <span>Stars</span>
          </div>
          <div>
            <strong>{repoInfo.forks_count}</strong>
            <span>Forks</span>
          </div>
          <div>
            <strong>{repoInfo.open_issues}</strong>
            <span>Issues abertas</span>
          </div>
        </div>
      
        <div className={styles.repoFolders}>
          
        </div>      
      </div>
    </div>
  );
}

export default SingleRepo;



export const getStaticPaths: GetStaticPaths = async (ctx) => {
  return {
    paths: [],
    fallback: 'blocking'
  }

}
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { repositorie } = ctx.params;
  const { data } = await api.get(`/repos/${repositorie[0]}/${repositorie[1]}`);

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      repoInfo: data
    }
  }
}