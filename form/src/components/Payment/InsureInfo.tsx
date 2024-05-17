import withTheme from 'hoc/withTheme';
import React, { Fragment } from "react";
import InsureProg from './InsureProg';
import CarInfo from './CarInfo';
import Info from './Info';

type InsureInfoProps = {
  className?: string;
  data: any;
  isPaymentEndors?: boolean;
  isRenew?: boolean;
  listKeyChanges?: string[]
}

const InsureInfo = (props: InsureInfoProps) => {
  const { className, data } = props;

  return (
    <div className={className}>
      {
        <Fragment>
          {
            (data?.vehicleOwnerName || data?.vehicleOwnerPhone || data?.vehicleOwnerId || data?.vehicleOwnerEmail) && (
              <Info
                title="Thông tin chủ xe"
                data={data}
                isPaymentEndors={props.isPaymentEndors}
                listKeyChanges={props.listKeyChanges}
              />)
          }
          <CarInfo
            title="Thông tin xe được bảo hiểm"
            data={data}
            isPaymentEndors={props.isPaymentEndors}
            listKeyChanges={props.listKeyChanges}
          />
          <InsureProg
            title="Chương trình bảo hiểm"
            data={data}
            isRenew={props.isRenew}
            isPaymentEndors={props.isPaymentEndors}
            listKeyChanges={props.listKeyChanges}
          />
        </Fragment>
      }
    </div>
  )
}
export default withTheme<InsureInfoProps>(InsureInfo);