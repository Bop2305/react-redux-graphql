import React from "react";
import { Typography } from "@mui/material";
import withTheme from "hoc/withTheme";
import { infoStyles } from './styles'
import convertDateToString from "helper/converts/convertDateToString";
import convertCurrency from "helper/converts/convertCurrency";
import dayjs from "dayjs";

type InsureProgProps = {
  title: string;
  data: any;
  isPaymentEndors?: boolean;
  isRenew?: boolean;
  listKeyChanges?: string[]
};

const InsureProg = ({ title, data, listKeyChanges, isRenew = false }: InsureProgProps) => {
  const classes = infoStyles();

  const {
    pkgInsure = '',
    insurancePeriod = '',
    deductibleExcess = '',
    polEffectiveDate = '',
    polExpireDate = ''
  } = data;

  let polExpDate = new Date(polEffectiveDate);
  polExpDate?.setMonth(polExpDate?.getMonth() + insurancePeriod);

  const effectiveIsPast = polEffectiveDate ? dayjs(polEffectiveDate).isBefore(dayjs()) : false;

  return (
    <div className={classes.wrapper}>
      <div className={classes.infoLineWrapper}>
        <Typography component="p" className={classes.title}>
          {title}
        </Typography>
        <Typography component="span" className={classes.typeInsure}>
          {<span className={listKeyChanges && listKeyChanges?.findIndex(item => item === "polPkgCode") > -1 ? classes.contentHighLight : ""}>{pkgInsure}</span>}
        </Typography>
      </div>
      <InfoLine
        label="Thời hạn bảo hiểm:"
        content={<span className={listKeyChanges && listKeyChanges?.findIndex(item => ["insurancePeriod", "polEffectiveDate", "polExpireDate"].includes(item)) > -1 ? classes.contentHighLight : ""}>
          {
            `${insurancePeriod} tháng \n`
          }
          {
            !effectiveIsPast ? ((insurancePeriod) ? `Từ ${convertDateToString(polEffectiveDate)} đến ${polExpireDate ? convertDateToString(polExpireDate) : convertDateToString(polExpDate?.toISOString())}` : `Bắt đầu từ ${convertDateToString(polEffectiveDate)}`) : null
          }
        </span>}
      />
      {!!deductibleExcess ?? (<InfoLine className={listKeyChanges && listKeyChanges?.findIndex(item => item === deductibleExcess) > -1 ? classes.contentHighLight : ""} label="Mức khấu trừ:" content={<span>{`${convertCurrency(deductibleExcess)} đ/vụ`}</span>} />)}
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

export default withTheme<InsureProgProps>(InsureProg);
