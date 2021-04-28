import { GetStaticProps, NextPage } from 'next';
import { useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { Header } from '../components/Header';
import { FaChevronRight } from 'react-icons/fa';

import styles from './Home.module.scss';
import api from '../services/api';

interface Repositories {
  id: number;
  full_name: string;
  name: string;
  description: string;
  avatar_url: string;

}

interface HomeProps {
  repos: Repositories[];
}

const Home: NextPage<HomeProps> = ({ repos }) => {
  const searchInputRef = useRef(null);


  return (
    <>
      <Head>
        <title>Github_explorer | Explorar</title>
      </Head>

      <div className={styles.containerHome}>
        <Header />
        <div className={styles.searchReposContainer}>
          <strong>Explore repositórios <br /> no Github.</strong>

          <div className={styles.inputGroup}>
            <form onSubmit={() => { }} style={{ display: 'flex', width: '100%' }}>
              <input
                type="text"
                placeholder="Digite um repo. 😉"
                ref={searchInputRef}
              />
              <button type="submit">Pesquisar</button>
            </form>
          </div>

          <div className={styles.searchContent}>
            {repos.map((repo) => (
              <div key={repo.id} className={styles.containerCard}>
                <div className={styles.repoInfo}>
                  <div className={styles.repoUserImage}>
                    <Image src={repo.avatar_url} width={300} height={300} />
                  </div>
                  <div className={styles.repoName}>
                    <strong>{repo.full_name}</strong>
                    <span>{repo.description}</span>
                  </div>
                </div>
                <FaChevronRight size={20} />
              </div>
            ))}
          </div>

        </div>

      </div>
    </>
  );
}
export default Home;


export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await api.get('/users/kevinpagliuca/repos');

  const MyRepos = data.map(repo => ({
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    description: repo.description,
    avatar_url: repo.owner.avatar_url,
  }));

  return {
    props: {
      repos: MyRepos,
    },
    revalidate: 60 * 60,
  }
}
