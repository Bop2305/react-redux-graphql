import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page404 from "./pages/Page404";
import routes from "./routes";
import Layout from "./components/Layout";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Page404 />,
      children: routes,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
