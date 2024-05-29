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
    label: "CRL MOR",
    path: PathConstants.SALE_CRL_MOR_PAGE,
  },
  {
    label: "CRL PA",
    path: PathConstants.SALE_CRL_PA_PAGE,
  },
];

const SaleCRLMorPage: React.FC = () => (
  <LayoutMenu menuItems={menuItems}>
    <LayoutTabs tabItems={tabItems}>
      <h1>Sale CRL Mor Page</h1>
    </LayoutTabs>
  </LayoutMenu>
);

export default SaleCRLMorPage;
