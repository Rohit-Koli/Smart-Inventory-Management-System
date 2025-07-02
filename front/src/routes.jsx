// routes.jsx
import { createBrowserRouter } from 'react-router-dom'
import Register from './components/Register'
import Logout from './components/Logout'
import ErrorPage from './components/ErrorPage'
import App from './App'
import Login from './components/Login'
import LandingPage from './components/LandingPage'
import UserDashboard from './components/user/UserDashboard'
import ProtectedRoute from './components/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App renders Navbar + layout
    errorElement: <ErrorPage />,
    children: [
      {
        path: '', // default route => http://localhost:5173/
        element: <LandingPage />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
      {
        path: 'userDashboard',
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
])
