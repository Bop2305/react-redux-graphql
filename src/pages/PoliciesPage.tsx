import { connect } from "react-redux";
import LayoutTabs from "../modules/layout/LayoutTabs";

const PoliciesPage: React.FC = () => {
  return (
    <>
      <LayoutTabs tabItems={[]}>
        <h1>PoliciesPage</h1>
      </LayoutTabs>
    </>
  );
};

export default connect()(PoliciesPage);
