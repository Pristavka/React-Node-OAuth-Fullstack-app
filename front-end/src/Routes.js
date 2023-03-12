import { createBrowserRouter } from 'react-router-dom';
import {
    UserInfoPage,
    LogInPage,
    SignUpPage,
    ErrorPage
} from './pages';
import { PrivateRoute } from './auth/PrivateRoute';

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
        <PrivateRoute>
            <UserInfoPage />
        </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <LogInPage />
  },
  {
    path: "/signup",
    element: <SignUpPage />
  },
]);
