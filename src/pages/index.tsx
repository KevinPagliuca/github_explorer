import { NextPage } from 'next';
import { FormEvent, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Header } from '../components/Header';
import { FaChevronRight } from 'react-icons/fa';

import styles from './Home.module.scss';
import { useRepositories } from '../contexts/RepositoriesContext';

interface Repositories {
  id: number;
  full_name: string;
  name: string;
  description: string;
  avatar_url: string;
  owner: string;
  starts: number;
  forks: number;
  issues: number;

}

interface HomeProps {
  repos: Repositories[];
}

const Home: NextPage<HomeProps> = () => {
  const { handleSearchRepos, listRepos, loading } = useRepositories();
  const searchInputRef = useRef(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (searchInputRef.current.value !== '') {
      handleSearchRepos(searchInputRef.current.value);
    } else {

    }
  }

  return (
    <div className={styles.containerHome}>
      <Head>
        <title>Github_explorer | Explorar</title>
      </Head>
      <Header />
      <div className={styles.searchReposContainer}>
        <strong>Explore repositórios <br /> no Github.</strong>

        <div className={styles.inputGroup}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%' }}>
            <input
              type="text"
              placeholder="Digite um repo. 😉"
              ref={searchInputRef}
            />
            <button type="submit">{loading ? 'Buscando...' : 'Pesquisar'}</button>
          </form>
        </div>

        <div className={styles.searchContent}>
          {listRepos?.items.map((repo) => (
            <Link href={`/repositorie/${repo.owner}/${repo.name}`} key={repo.id}>
              <div className={styles.containerCard}>
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
            </Link>
          ))}
        </div>

      </div>

    </div>
  );
}
export default Home;