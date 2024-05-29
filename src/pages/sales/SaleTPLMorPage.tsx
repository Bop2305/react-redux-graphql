import LayoutMenu from "../../modules/layout/LayoutMenu";
import LayoutTabs from "../../modules/layout/LayoutTabs";
import PathConstants from "../../routes/pathConstants";

const menuItems = [
  {
    label: "CRL",
    path: PathConstants.SALE_CRL_MOR_PAGE,
  },
  {
    label: "TPL",
    path: PathConstants.SALE_TPL_MOR_PAGE,
  },
];

const tabItems = [
  {
    label: "TPL MOR",
    path: PathConstants.SALE_TPL_MOR_PAGE,
  },
  {
    label: "TPL PA",
    path: PathConstants.SALE_TPL_PA_PAGE,
  },
];
const SaleTPLMorPage: React.FC = () => (
  <LayoutMenu menuItems={menuItems}>
    <LayoutTabs tabItems={tabItems}>
      <h1>Sale TPL Mor Page</h1>
    </LayoutTabs>
  </LayoutMenu>
);

export default SaleTPLMorPage;
