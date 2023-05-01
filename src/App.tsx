import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { Spinner } from './components/Spinner/Spinner';

const Home = lazy(() => import('./pages/SearchPage/SearchPage'));
const Show = lazy(() => import('./pages/ShowPage/ShowPage'));
const NotFound = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

import { ROUTES, ROUTE_PARAMS } from './routes/routes';

function App() {
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={`${ROUTES.posts}${ROUTE_PARAMS.nasa_id}`} element={<Show />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
