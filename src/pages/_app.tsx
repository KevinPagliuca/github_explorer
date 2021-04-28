import '../styles/global.scss';
import { RepositoriesProvider } from '../contexts/RepositoriesContext';


function MyApp({ Component, pageProps }) {
  return (
    <RepositoriesProvider>
      <Component {...pageProps} />
    </RepositoriesProvider>
  )
}

export default MyApp;
