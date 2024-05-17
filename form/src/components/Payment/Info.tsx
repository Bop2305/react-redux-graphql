import { Divider, Typography } from "@mui/material";
import React from "react";
import withTheme from "hoc/withTheme";
import { infoStyles } from './styles';

type InfoProps = {
  title: string;
  data: any;
  isPaymentEndors?: boolean;
  listKeyChanges?: string[]
};

const Info = ({ title, data, listKeyChanges, isPaymentEndors }: InfoProps) => {
  const classes = infoStyles();

  const renderContentPaymentEndors = (key: string) => {
    return <span className={listKeyChanges && listKeyChanges.indexOf(key) > -1 ? classes.contentHighLight : ""}>{data[key]}</span>;
  }
  return (
    <div className={classes.wrapper}>
      <Typography component="p" className={classes.title}>
        {title}
      </Typography>
      {data?.vehicleOwnerName && (
        <InfoLine label="Họ và tên:" content={isPaymentEndors ? renderContentPaymentEndors("vehicleOwnerName") : data?.vehicleOwnerName} />
      )}
      {data?.vehicleOwnerPhone && (
        <InfoLine label="Số điện thoại:" content={isPaymentEndors ? renderContentPaymentEndors("vehicleOwnerPhone") : data?.vehicleOwnerPhone} />
      )}
      {data?.vehicleOwnerEmail && (
        <InfoLine label="Email:" content={isPaymentEndors ? renderContentPaymentEndors("vehicleOwnerEmail") : data?.vehicleOwnerEmail} />
      )}
      <Divider style={{ paddingTop: 15 }} />
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

export default withTheme<InfoProps>(Info);
