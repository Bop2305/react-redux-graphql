import { connect } from "react-redux";
import LayoutTabs from "../modules/layout/LayoutTabs";

const ReportPage: React.FC = () => {
  return (
    <>
      <LayoutTabs tabItems={[]}>
        <h1>ReportPage</h1>
      </LayoutTabs>
    </>
  );
};

export default connect()(ReportPage);
