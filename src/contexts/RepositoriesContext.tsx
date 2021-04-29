import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { LoadingModal } from '../components/LoadingModal';

export interface Repositories {
  total_count: number;
  items: {
    id: number;
    name: string;
    full_name: string;
    description: string;
    avatar_url: string;
    owner: string;
    starts: number;
    forks: number;
    issues: number;
  }[];
}

interface RepositoriesContextData {
  page: number;
  lastPage: number;
  listRepos: Repositories;
  loading: boolean;
  handleSearchRepos: (word: string) => void;
}

export const RepositoriesContext = createContext({} as RepositoriesContextData);

export const RepositoriesProvider: React.FC = ({ children }) => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [listRepos, setListRepos] = useState<Repositories>();

  async function handleSearchRepos(word: string) {
    setLoading(true);
    const { data } = await api.get(`/search/repositories`, {
      params: {
        q: word,
        per_page: 16,
        page: page,
        sort: 'updated'
      }
    });
    const dataFormatted = {
      total_count: data.total_count,
      items: data.items.map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        avatar_url: repo.owner.avatar_url,
        owner: repo.owner.login,
        starts: repo.targazers_count,
        forks: repo.forks,
        issues: repo.open_issues_count
      }))
    }
    console.log(data);

    setListRepos(dataFormatted);
    setLastPage(Math.ceil(dataFormatted.total_count / 15));
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    api.get('/users/kevinpagliuca/repos?sort=updated').then(res => {
      const data = res.data;
      const dataFormatted = {
        total_count: data.length,
        items: data.map(repo => ({
          id: repo?.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          avatar_url: repo.owner.avatar_url,
          owner: repo.owner.login,
          starts: repo.targazers_count,
          forks: repo.forks,
          issues: repo.open_issues_count
        }))
      }
      setListRepos(dataFormatted);
      setLastPage(Math.ceil(dataFormatted.total_count / 15));
      setLoading(false);
    });
  }, []);

  async function getRepositorieFromUser(owner: string , repoName: string) {
    const { data } = await api.get(`/repos/${owner}/${repoName}`);
  }
  
  return (
    <RepositoriesContext.Provider
      value={{
        page,
        listRepos,
        lastPage,
        loading,
        handleSearchRepos,
      }}
    >
      {children}
      {loading &&
        <LoadingModal />
      }
    </RepositoriesContext.Provider>
  );
}

export function useRepositories(): RepositoriesContextData {
  const context = useContext(RepositoriesContext);
  if (!context) {
    throw new Error('should be used with AuthProvider');
  }
  return context;
}