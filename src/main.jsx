import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

const SudokuBoard = lazy(() => import('./components/SudokuBoard/SudokuBoard'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage/NotFoundPage'));

const validDifficulties = ['easy', 'medium', 'hard'];

const routes = createBrowserRouter([
  {
    path: '/',
    exact: true,
    element: <App />
  },
  {
    path: 'Sudoku/:Difficulty',
    element: <SudokuBoard />,
    loader: ({ params }) => {
      const { Difficulty } = params;
      if (!validDifficulties.includes(Difficulty.toLowerCase())) {
        throw redirect('/not-found');
      }
      return null;
    }
  },
  {
    path: 'not-found',
    element: <NotFoundPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={routes} />
    </Suspense>
  </StrictMode>
);
