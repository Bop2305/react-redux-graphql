import LayoutMenu from "../../modules/layout/LayoutMenu";
import LayoutTabs from "../../modules/layout/LayoutTabs";
import PathConstants from "../../routes/pathConstants";
import SaleCRLMorPage from "./SaleCRLMorPage";
import SaleCRLPaPage from "./SaleCRLPaPage";

const menuItems = [
  {
    label: "CRL",
    path: PathConstants.SALE_CRL_PAGE,
  },
  {
    label: "TPL",
    path: PathConstants.SALE_TPL_PAGE,
  },
];

const SaleCRLPage: React.FC = () => (
  <LayoutMenu menuItems={menuItems}>
    {/* <SaleCRLMorPage />
    <SaleCRLPaPage /> */}
    <SaleCRLMorPage />
  </LayoutMenu>
);

export default SaleCRLPage;
