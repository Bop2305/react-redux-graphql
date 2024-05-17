import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Divider, Typography } from "@mui/material";

import withTheme from "hoc/withTheme";
import { infoStyles } from './styles';
import convertCurrency from "helper/converts/convertCurrency";

type InfoProps = {
  title: string; data: any;
  isPaymentEndors?: boolean;
  listKeyChanges?: string[]
};

const CarInfo = ({ title, data, isPaymentEndors, listKeyChanges }: InfoProps) => {
  const classes = infoStyles();

  const {
    businessUsingTxt = '',
    vehicleBrand = '',
    vehicleSpec = '',
    vehicleYear = '',
    vehiclePlateNo = '',
    vehicleChassisNo = '',
    vehicleEngineNo = '',
    vehicleValue,
    sumInsurance,
  } = data

  return (
    <div className={classes.wrapper}>
      <Typography component="p" className={classes.title}>
        {title}
      </Typography>
      {businessUsingTxt && <InfoLine label="Mục đích sử dụng:" content={<span className={listKeyChanges && listKeyChanges?.indexOf("businessUsing") > -1 ? classes.contentHighLight : ""}>{businessUsingTxt}</span>} />}
      {(vehicleBrand || vehicleSpec || vehicleYear) &&
        <InfoLine label="Thông tin xe:" content={listKeyChanges?.find(item => ["vehicleBrand", "vehicleSpec", "vehicleYear"].indexOf(item) > -1) ? <span className={classes.contentHighLight}>{`${vehicleBrand} ${vehicleSpec} ${vehicleYear}`}</span> : `${vehicleBrand} ${vehicleSpec} ${vehicleYear}`} />
      }
      {vehiclePlateNo && <InfoLine label="Biển kiểm soát:" content={listKeyChanges && listKeyChanges?.indexOf("vehiclePlateNo") > -1 ? <span className={classes.contentHighLight}>{vehiclePlateNo}</span> : vehiclePlateNo} />}
      {vehicleChassisNo && <InfoLine label="Số khung:" content={listKeyChanges && listKeyChanges?.indexOf("vehicleChassisNo") > -1 ? <span className={classes.contentHighLight}>{vehicleChassisNo}</span> : vehicleChassisNo} />}
      {vehicleEngineNo && <InfoLine label="Số máy:" content={listKeyChanges && listKeyChanges?.indexOf("vehicleEngineNo") > -1 ? <span className={classes.contentHighLight}>{vehicleEngineNo}</span> : vehicleEngineNo} />}
      {
        !!vehicleValue && <InfoLine label="Giá trị xe:" content={<span className={listKeyChanges && listKeyChanges?.indexOf("vehicleValue") > -1 ? classes.contentHighLight : ""}>{`${convertCurrency(vehicleValue)} đ`}</span>} />
      }
      {
        !!sumInsurance && <InfoLine label="Số tiền bảo hiểm:" content={<span className={listKeyChanges && listKeyChanges?.indexOf("sumInsurance") > -1 ? classes.contentHighLight : ""}>{`${convertCurrency(sumInsurance)} đ`}</span>} />

      }
      <Divider style={{ paddingTop: 20 }} />
    </div>
  );
};

const InfoLine = ({ label, content }: any) => {
  const classes = infoStyles();

  return (
    <div className={classes.infoLineWrapper}>
      <Typography className={classes.label}>{label}</Typography>
      <Typography className={classes.content}>{content}</Typography>
    </div>
  );
};

export default withTheme<InfoProps>(CarInfo);
