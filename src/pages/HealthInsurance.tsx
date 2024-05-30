import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BuyerInfo from "../modules/insurance/health/BuyerInfo";
import InsuredPersonInfo from "../modules/insurance/health/InsuredPersonInfo";
import PolicyInfo from "../modules/insurance/health/PolicyInfo";

export default function HealthInsurance() {
  const [value, setValue] = React.useState(
    "buyerInfo" || "insuredPersonInfo" || "policyInfo"
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Bên mua bảo hiểm" value="buyerInfo" />
            <Tab label="Người được bảo hiểm" value="insuredPersonInfo" />
            <Tab label="Thông tin hợp đồng" value="policyInfo" />
          </TabList>
        </Box>
        <TabPanel value="buyerInfo">
          <BuyerInfo />
        </TabPanel>
        <TabPanel value="insuredPersonInfo">
          <InsuredPersonInfo />
        </TabPanel>
        <TabPanel value="policyInfo">
          <PolicyInfo />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
