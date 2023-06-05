import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";


function App() {
  const router = createBrowserRouter([
    {
      path: "/";
      element: <div>Hello world!</div>
    },
  ]);
  return (
  <div>
    <Register/>
  </div>
  );
}

export default App;
