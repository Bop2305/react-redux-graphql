import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

import { CAR, MOTO, MOTO_ZUTTO } from "helper/const";
import SummaryInfo from "components/SummaryInfo";
import Line from "components/Line";

import Dialog from "components/Dialog";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(5),
  },
  dialogContentTitle: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightBold,
  },
  dialogContentSub: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

type ConfirmInfoType = {
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  vehicleUsing: string;
  vehicleType: string;
  vehicleSeatCount: string;
  vehicleWeight: string;
  vehiclePlateNo: string;
  vehicleChassisNo: string;
  vehicleEngineNo: string;
  durations: string;
  effectiveDate: string;
  expireDate: string;
  typeFlow: string;
  pkgCode: string;
};

const ConfirmInfo = (props: ConfirmInfoType) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const vehicleInfo = useMemo(() => {
    let _vehicleInfo = "";

    if (props.vehicleType) {
      _vehicleInfo += props.vehicleType;
    }
    if (props.vehicleSeatCount) {
      _vehicleInfo += ` - ${props.vehicleSeatCount}`;
    }
    if (props.vehicleWeight) {
      _vehicleInfo += ` - ${props.vehicleWeight}`;
    }

    return _vehicleInfo;
  }, [props?.vehicleType, props.vehicleSeatCount, props.vehicleWeight]);

  const dialogContent = useMemo(() => {
    if (props.typeFlow === CAR) {
      return (
        <div>
          <Typography className={classes.dialogContentTitle}>
            BẮT BUỘC TNDS Ô TÔ
          </Typography>
          <Typography className={classes.dialogContentSub}>
            Quyền lợi bảo hiểm TNDS bắt buộc đối với Bên thứ ba:
          </Typography>
          <table>
            <tr>
              <td style={{ padding: 12, paddingLeft: 0 }}>
                Bảo hiểm cho các tổn thất về người cho bên thứ ba do xe cơ giới
                gây ra/người/vụ tai nạn
              </td>
              <td style={{ display: "block", padding: 12 }}>150.000.000đ</td>
            </tr>
            <tr>
              <td style={{ padding: 12, paddingLeft: 0 }}>
                Bảo hiểm cho các tổn thất về tài sản cho bên thứ ba do xe cơ
                giới gây ra/vụ tai nạn
              </td>
              <td style={{ display: "block", padding: 12 }}>100.000.000đ</td>
            </tr>
          </table>
        </div>
      );
    } else if (props.pkgCode) {
      return (
        <div>
          <Typography className={classes.dialogContentTitle}>
            Bảo hiểm xe máy OBIKE Plus
          </Typography>
          <Typography className={classes.dialogContentSub}>
            Yên tâm chạy xe với trải nghiệm 2 trong 1 duy nhất trên thị trường!
          </Typography>
          <br />
          <Typography className={classes.dialogContentSub}>
            Quyền lợi bảo hiểm bắt buộc TNDS chủ xe máy:
          </Typography>
          <ul>
            <li>
              Bồi thường các thiệt hại về sức khỏe, tính mạng lên tới 150 triệu
              đồng/ 1 người cho mỗi vụ tai nạn
            </li>
            <li>
              Bồi thường tài sản của bên thứ ba do xe mô tô gây ra: 50 triệu
              đồng/ vụ tai nạn
            </li>
          </ul>
          <Typography className={classes.dialogContentSub}>
            Đặc quyền cứu hộ 24/7, trên toàn quốc:
          </Typography>
          <ul>
            <li>
              Hỗ trợ bạn khắc phục tạm thời và tại chỗ các hư hỏng do tai nạn
              hoặc hỏng hóc như xịt lốp, nổ lốp, mất chìa khóa, chết máy hoặc
              các sự cố kỹ thuật khác.
            </li>
            <li>
              Vận chuyển xe miễn phí đến địa điểm sửa chữa hoặc nhà bạn khi xe
              gặp sự cố (trong phạm vi 50 km).
            </li>
            <li>
              Không còn nỗi lo hết xăng giữa đường với dịch vụ giao xăng tại
              chỗ.
            </li>
          </ul>
        </div>
      );
    } else if ([MOTO, MOTO_ZUTTO].includes(props.typeFlow)) {
      return (
        <div>
          <Typography className={classes.dialogContentTitle}>
            BẮT BUỘC TNDS XE MÁY
          </Typography>
          <Typography className={classes.dialogContentSub}>
            Quyền lợi bảo hiểm TNDS bắt buộc đối với Bên thứ ba:
          </Typography>
          <table>
            <tr>
              <td style={{ padding: 12, paddingLeft: 0 }}>
                Bảo hiểm cho các tổn thất về người cho bên thứ ba do xe cơ giới
                gây ra/người/vụ tai nạn
              </td>
              <td style={{ display: "block", padding: 12 }}>150.000.000đ</td>
            </tr>
            <tr>
              <td style={{ padding: 12, paddingLeft: 0 }}>
                Bảo hiểm cho các tổn thất về tài sản cho bên thứ ba do xe cơ
                giới gây ra/vụ tai nạn
              </td>
              <td style={{ display: "block", padding: 12 }}>50.000.000đ</td>
            </tr>
          </table>
        </div>
      );
    }
  }, [props.typeFlow, props.pkgCode]);

  return (
    <div className={classes.wrapper}>
      <SummaryInfo
        title="Thông tin chủ xe"
        rowsData={[
          {
            label: "Họ và tên",
            value: props.ownerName,
          },
          {
            label: "Số điện thoại",
            value: props.ownerPhone,
          },
          {
            label: "Email",
            value: props.ownerEmail,
          },
        ]}
      />
      <Line />
      <SummaryInfo
        title="Thông tin xe được bảo hiểm"
        rowsData={[
          {
            label: "Mục đích sử dụng",
            value: props.vehicleUsing,
          },
          {
            label: "Thông tin xe",
            value: vehicleInfo,
          },
          {
            label: "Biển kiểm soát",
            value: props.vehiclePlateNo,
          },
          {
            label: "Số khung",
            value: props.vehicleChassisNo,
          },
          {
            label: "Số máy",
            value: props.vehicleEngineNo,
          },
        ]}
      />
      <Line />
      <SummaryInfo
        title="Chương trình bảo hiểm"
        rightTitle={
          props.typeFlow === CAR
            ? "TNDS Ô TÔ"
            : props.pkgCode
            ? "OBIKE PLUS"
            : "TNDS XE MÁY"
        }
        onClickRightTitle={() => {
          setOpen(true);
        }}
        rowsData={[
          {
            label: "Thời hạn bảo hiểm",
            value: (
              <span>
                {props.durations}
                <br />
                Từ {props.effectiveDate}
                <br />
                đến {props.expireDate}
              </span>
            ),
          },
        ]}
      />

      <Dialog
        open={open}
        title="Chương trình bảo hiểm"
        onClose={() => setOpen(false)}
        fullScreen={false}
      >
        {dialogContent}
      </Dialog>
    </div>
  );
};

export default ConfirmInfo;
