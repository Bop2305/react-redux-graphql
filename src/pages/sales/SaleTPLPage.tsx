import LayoutTabs from "../../modules/layout/LayoutTabs";
import PathConstants from "../../routes/pathConstants";
import SaleTPLMorPage from "./SaleTPLMorPage";

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

const SaleTPLPage: React.FC = () => (
  <LayoutTabs tabItems={tabItems}>
    <SaleTPLMorPage />
  </LayoutTabs>
);

export default SaleTPLPage;
