import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab, { tabClasses } from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { makeStyles } from "@mui/styles";
import ButtonSimple from "../../components/common/ButtonSimple";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const CustomTab = styled(Tab)(({ theme }) => ({
  color: "grey",
  borderBottom: "1px solid black",
  padding: "5px 5px",
  width: "150px",
  [`&.${tabClasses.selected}`]: {
    borderLeft: "1px solid black",
    borderTop: "1px solid black",
    borderRight: "1px solid black",
  },
  "& .labelWrapper": {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "12px",
  },
  "& .tableRowIconWrapper": {
    cursor: "pointer",
    marginLeft: "10px",
  },
}));

const useStyles = makeStyles((theme) => ({
  wrapper: {},
  tableRowIconWrapper: {
    cursor: "pointer",
  },
}));

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Group = styled("div")({
  display: "grid",
  gridGap: "20px",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
});

const LeftContent = () => {
  const [value, setValue] = React.useState(0);
  const [isShowTab, setIsShowTab] = React.useState(true);

  const classes = useStyles();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <>
      {isShowTab ? (
        <div style={{ width: "300px" }}>
          <Box>
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <CustomTab
                  label={
                    <div className="labelWrapper">
                      <InfoOutlinedIcon /> <p>Thông tin chung</p>
                    </div>
                  }
                  {...a11yProps(0)}
                />
                <CustomTab
                  label={
                    <div className="labelWrapper">
                      <PersonOutlineOutlinedIcon /> <p>Thông tin liên hệ</p>{" "}
                      <div
                        className="tableRowIconWrapper"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsShowTab(false);
                        }}
                      >
                        <TableRowsIcon />
                      </div>
                    </div>
                  }
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <div style={{ gap: "20px", paddingTop: "20px" }}>
                <LossInfoItem
                  title="Thông tin chung"
                  data={[
                    { label: "Ngày thông báo", value: "28/05/2024" },
                    { label: "Ngày thông báo", value: "28/05/2024" },
                    { label: "Ngày thông báo", value: "28/05/2024" },
                    { label: "Ngày thông báo", value: "28/05/2024" },
                    { label: "Ngày thông báo", value: "28/05/2024" },
                    { label: "Ngày thông báo", value: "28/05/2024" },
                  ]}
                />
              </div>
              <div style={{ padding: "20px 0px" }}>
                <LossInfoItem
                  title="Thông tin chung"
                  data={[
                    { label: "Ngày thông báo", value: "28/05/2024" },
                    { label: "Ngày thông báo", value: "28/05/2024" },
                    { label: "Ngày thông báo", value: "28/05/2024" },
                  ]}
                />
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div style={{ padding: "20px 0px" }}>
                <LossInfoItem
                  title="Thông tin chung"
                  data={[{ label: "Ngày thông báo", value: "28/05/2024" }]}
                />
              </div>
            </CustomTabPanel>
          </Box>
          <Group>
            <ButtonSimple label="In Ấn" />
            <ButtonSimple label="Hồ sơ bồi thường" />
          </Group>
        </div>
      ) : (
        <div
          className={classes.tableRowIconWrapper}
          onClick={() => setIsShowTab(!isShowTab)}
        >
          <TableRowsIcon />
        </div>
      )}
    </>
  );
};

export default LeftContent;

type LossInfoProps = {
  title: string;
  data: any;
};

const InfoItem = styled("div")({
  border: "1px solid",
  borderRadius: "5px",
  fontSize: "14px",
  "& .title": {
    background: "grey",
    color: "#000",
    fontWeight: 700,
    padding: "10px",
  },
  "& .row": {
    display: "flex",
    borderBottom: "1px solid black",
    color: "grey",
    padding: "0px 10px",
    "& .label": {
      width: "50%",
      fontWeight: 700,
    },
  },
});

const LossInfoItem: React.FC<LossInfoProps> = ({ title, data }) => {
  return (
    <InfoItem>
      <div className="title">{title}</div>
      {data.map((item: any) => (
        <div className="row">
          <p className="label">{item.label} :</p>
          <p className="value">{item.value}</p>
        </div>
      ))}
    </InfoItem>
  );
};
