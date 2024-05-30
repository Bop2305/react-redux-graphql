import React from "react";
import PathConstants from "./pathConstants";

type Route = {
  path: string;
  element: any;
};

const Home = React.lazy(() => import("../pages/Home"));
const Counter = React.lazy(() => import("../pages/Counter"));
const People = React.lazy(() => import("../pages/People"));
const SalePage = React.lazy(() => import("../pages/sales/SalePage"));
const SaleCRLPage = React.lazy(() => import("../pages/sales/SaleCRLPage"));
const SaleCRLMorPage = React.lazy(() => import("../pages/sales/SaleCRLMorPage"));
const SaleCRLPaPage = React.lazy(() => import("../pages/sales/SaleCRLPaPage"));
const SaleTPLPage = React.lazy(() => import("../pages/sales/SaleTPLMorPage"));
const SaleTPLMorPage = React.lazy(() => import("../pages/sales/SaleTPLMorPage"));
const SaleTPLPaPage = React.lazy(() => import("../pages/sales/SaleTPLPaPage"));
const ReportPage = React.lazy(() => import("../pages/ReportPage"));
const PoliciesPage = React.lazy(() => import("../pages/PoliciesPage"));
const DashBoard = React.lazy(() => import("../pages/DashBoard"));
const HealthInsurance = React.lazy(() => import("../pages/HealthInsurance"));

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
    path: PathConstants.SALE_CRL_PAGE,
    element: <SaleCRLPage />,
  },
  {
    path: PathConstants.SALE_CRL_MOR_PAGE,
    element: <SaleCRLMorPage />,
  },
  {
    path: PathConstants.SALE_CRL_PA_PAGE,
    element: <SaleCRLPaPage />,
  },
  {
    path: PathConstants.SALE_TPL_PAGE,
    element: <SaleTPLPage />,
  },
  {
    path: PathConstants.SALE_TPL_MOR_PAGE,
    element: <SaleTPLMorPage />,
  },
  {
    path: PathConstants.SALE_TPL_PA_PAGE,
    element: <SaleTPLPaPage />,
  },
  {
    path: PathConstants.POLICIES_PAGE,
    element: <PoliciesPage />,
  },
  {
    path: PathConstants.REPORT_PAGE,
    element: <ReportPage />,
  },
  {
    path: PathConstants.DASHBOARD,
    element: <DashBoard />,
  },
  {
    path: PathConstants.HEALTH,
    element: <HealthInsurance />,
  },
];

export default routes;
