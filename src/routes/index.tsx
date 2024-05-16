import React from "react";
import PathConstants from "./pathConstants";

type Route = {
  path: string;
  element: any;
};

const Home = React.lazy(() => import("../pages/Home"));
const Counter = React.lazy(() => import("../pages/Counter"));

const routes: Route[] = [
  {
    path: PathConstants.HOME,
    element: <Home />,
  },
  {
    path: PathConstants.COUNTER,
    element: <Counter />,
  },
];

export default routes;
