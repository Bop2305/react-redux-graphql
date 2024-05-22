import React from "react";
import PathConstants from "./pathConstants";

type Route = {
  path: string;
  element: any;
};

const Home = React.lazy(() => import("../pages/Home"));
const Counter = React.lazy(() => import("../pages/Counter"));
const People = React.lazy(() => import("../pages/People"));
const SalePage = React.lazy(() => import("../pages/SalePage"));
const ReportPage = React.lazy(() => import("../pages/ReportPage"));
const PoliciesPage = React.lazy(() => import("../pages/PoliciesPage"));

const routes: Route[] = [
  {
    path: PathConstants.HOME,
    element: <Home />,
  },
  {
    path: PathConstants.COUNTER,
    element: <Counter />,
  },
  {
    path: PathConstants.PEOPLE,
    element: <People />,
  },
  {
    path: PathConstants.SALE_PAGE,
    element: <SalePage />,
  },
  {
    path: PathConstants.POLICIES_PAGE,
    element: <PoliciesPage />,
  },
  {
    path: PathConstants.REPORT_PAGE,
    element: <ReportPage />,
  },
];

export default routes;
