import "./index.css";
import "./App.css";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About";
// import Register from "./Components/Register/Register";
// import Regist
// import Login from "./Components/Login/Login";

import { ProtectedRoute } from "./Components/User/ProtectedRoute";
import Dashboard from "./Components/User/Dashboard/Dashboard";
import Profile from "./Components/User/Profile/Profile";
import { useAuth } from "./Components/AuthProvider/AuthProvider";
import Logout from "./Components/Logout.jsx/Logout";
import UserLayout from "./Components/User/UserLayout/UserLayout";



function App() {

  const { user } = useAuth();

  const isAuthenticated = !!user;

  const route = createBrowserRouter([{
      path: "/",
      element: <Home />,
    },{
      path: "/about",
      element: <About />,
    },{
      path: "/register",
      element: <Register />,
    },    {
      path: "/login",
      element: <Login />,
    },{
      path:"logout",
      element:<Logout/>
    },{
      path:"/user",
      element:
        <ProtectedRoute isAllowed={isAuthenticated}>
          <UserLayout/>
        </ProtectedRoute>,
      children:[{
          path:"dashboard",
          element:<Dashboard/>
        },{
          path:"profile",
          element:<Profile/>
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;