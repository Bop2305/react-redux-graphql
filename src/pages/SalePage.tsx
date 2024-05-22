import { connect } from "react-redux";
import LayoutTabs from "../modules/layout/LayoutTabs";

const SalePage: React.FC = () => {
  return (
    <>
      <LayoutTabs>
        <h1>SalePage</h1>
      </LayoutTabs>
    </>
  );
};

export default connect()(SalePage);
