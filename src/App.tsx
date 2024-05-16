import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Page404 from "./pages/Page404";
import routes from "./routes";

function App() {
  const router = createBrowserRouter([
    {
      element: <div><Outlet /></div>,
      errorElement: <Page404 />,
      children: routes,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
