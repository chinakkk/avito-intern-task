import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { MainLayout } from 'src/app/layouts/MainLayout';
import { BoardsPage } from 'src/pages/BoardsPage';
import { BoardPage } from 'src/pages/BoardPage';
import { IssuesPage } from 'src/pages/IssuesPage';
import { ROUTES } from 'src/shared/config/routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: ROUTES.BOARDS, element: <BoardsPage /> },
      { path: `${ROUTES.BOARD}/:id`, element: <BoardPage /> },

      { path: ROUTES.ISSUES, element: <IssuesPage /> },

      {
        path: '*',
        element: <Navigate to={ROUTES.ISSUES} replace />,
      },
      {
        path: '/',
        element: <Navigate to={ROUTES.ISSUES} replace />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
