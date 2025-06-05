// src/app/router.tsx
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import {BoardPage, BoardsPage, IssuesPage} from 'src/pages';

const router = createBrowserRouter([
  {path: '/boards', element: <BoardsPage/>},


  {path: '/board/:id', element: <BoardPage/>},
  {path: '/issues', element: <IssuesPage/>},
  {
    path: '*',
    element: <Navigate to="/boards" replace/>,
  },
]);

export const AppRouter = () => <RouterProvider router={router}/>;
