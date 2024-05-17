import React, { useCallback } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import withTheme from "hoc/withTheme";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    boxShadow: theme.shadows[1],
    "& .MuiTabs-root": {
      minHeight: "unset",
    },
    "& .MuiButtonBase-root": {
      height: 20,
      minHeight: "unset",
    },
  },
}));

type TabsProps = {
  tabs: { label: string; content: any }[];
};

const Tabs = (props: TabsProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(props.tabs?.[0]?.label);

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    },
    [setValue]
  );

  return (
    <div className={classes.wrapper}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {props.tabs?.map((t) => (
                <Tab
                  style={{ fontSize: 10, padding: 0 }}
                  key={`${t?.label}tab`}
                  label={t?.label}
                  value={t?.label}
                />
              ))}
            </TabList>
          </Box>
          {props.tabs?.map((t) => (
            <TabPanel
              style={{ padding: theme.spacing(2) }}
              key={`${t?.label}tabPanel`}
              value={t?.label}
            >
              {t?.content}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </div>
  );
};

export default withTheme<TabsProps>(Tabs);
