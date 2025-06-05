import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { MainLayout } from 'src/app/layouts/MainLayout';
import { BoardsPage } from 'src/pages/BoardsPage';
import { BoardPage } from 'src/pages/BoardPage';
import { IssuesPage } from 'src/pages/IssuesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/boards', element: <BoardsPage /> },
      { path: '/board/:id', element: <BoardPage /> },

      { path: '/issues', element: <IssuesPage /> },

      {
        path: '*',
        element: <Navigate to="/boards" replace />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
