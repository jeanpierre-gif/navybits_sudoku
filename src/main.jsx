import { StrictMode,Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const SudokuBoard = lazy(()=>import('./components/SudokuBoard/SudokuBoard'));
const NotFoundPage = lazy(()=>import('./components/NotFoundPage/NotFoundPage'));
const routes= createBrowserRouter([
  {
    path:'/',
    exact:true,
    element:<App />
  },
  {
    path:'Sudoku/:Difficulty',
    element: <SudokuBoard />
  },
  {
    path:'*',
    element:<NotFoundPage />
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
   <RouterProvider router={routes} />
</Suspense>
  </StrictMode>
)
