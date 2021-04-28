import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

export interface Repositories {
  total_count: number;
  items: {
    name: string;
    full_name: string;
    description: string;
    owner: {
      avatar_url: string;
    }
  }[]
}

interface RepositoriesContextData {
  page: number;
  lastPage: number;
  repos: Repositories;
  handleSearchRepos: (word: string) => void;
  loading: boolean;
}

export const RepositoriesContext = createContext({} as RepositoriesContextData);

export const RepositoriesProvider: React.FC = ({ children }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<Repositories>();
  const [lastPage, setLastPage] = useState(1);


  async function handleSearchRepos(word: string) {
    setLoading(true);
    const { data } = await api.get(`/search/repositories?q=${word}&per_page=15&page=${page}`, {
      params: {
        q: word,
        per_page: 16,
        page: page,
      }
    });
    setRepos(data);
    setLastPage(Math.ceil(data.total_count / 15));
    setLoading(false);
  }

  return (
    <RepositoriesContext.Provider
      value={{
        page,
        repos,
        lastPage,
        loading,
        handleSearchRepos,
      }}
    >
      {children}
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