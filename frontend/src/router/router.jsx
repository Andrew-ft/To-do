import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../pages/index";
import NotFound from "../pages/notFound";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: '*',
                element: <NotFound/>
            }
      ]
    },
  ]);

export default router;