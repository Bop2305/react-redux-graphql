/**
 * Layout Tabs
 */

import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { styled } from "@mui/styles";

type TabItem = {
  label: string;
  path: string;
};

type Props = {
  children: React.ReactNode;
  tabItems: TabItem[];
};

const LinkWrapper = styled("div")({
  display: "flex",
  gap: "5px",
  marginTop: "10px",
});

const MyLink = styled(Link)({
  padding: "5px 10px",
  border: "solid 1px",
  borderRadius: "5px",
});

const LayoutTabs: React.FC<Props> = ({ children, tabItems }) => {
  const location = useLocation();
  const params = useParams();

  return (
    <div>
      <LinkWrapper>
        {tabItems.map((it) => (
          <MyLink to={it.path}>{it.label}</MyLink>
        ))}
      </LinkWrapper>
      {/* {params.resourceCode === "ABC" && <h1>Title 1</h1>} */}
      {children}
    </div>
  );
};

export default LayoutTabs;
