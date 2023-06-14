import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Leftbar from "./components/leftbar/Leftbar";
import Rightbar from "./components/rightbar/Rightbar";
import Navbar from "./components/navbar/Navbar";

//  import "bootstrap/dist/css/bootstrap.min.css";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  //Route,
  Outlet
} from "react-router-dom";

function App() {

  const currentUser = true;

  //para que podamos añadir las barras a todas las pages que queramos
  const Layout = () =>{
    return(
      <div>
        <Navbar/>
        <div style={{display:"flex"}}>
          <Leftbar/>
          <div style={{flex:6}}>
            <Outlet/>
          </div>
          <Rightbar/>
        </div>
      </div>
    )
  }

  //todo lo que envolvamos con <ProtectedRoute> comprobará si hemos iniciado sesion
  //de no ser asi nos redigiremos a login
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login"/>
    }

    return children;
  }
  const router = createBrowserRouter([
    {
      path:"/",
      element: (
        <ProtectedRoute>
          <Layout/>
        </ProtectedRoute>
      ),
      children:[
        {
          path:"/",
          element:<Home/>,
        },
        {
          path:"/profile/:id",
          element:<Profile/>,
        },
        {
          path:"/",
          element:<Home/>,
        },

      ]
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
  ]);
  return (
  <div>
<RouterProvider router={router} />  
</div>
  );
}

export default App;
