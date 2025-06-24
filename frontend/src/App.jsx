import "./index.css";
import "./App.css";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/About";
import Login from "./components/Login";
// import
import Dashboard from "./components/User/Dashboard";
import Profile from "./components/User/Profile";
import { useAuth } from "./components/Authprovider";
import Logout from "./components/Logout";
// import UserLayout from "./Components/User/UserLayout/UserLayout";


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