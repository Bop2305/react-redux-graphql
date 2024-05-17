import React, { useCallback, useEffect, useMemo } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";

import useStyles from "../useStyles";
import TakePhotoGuide from "../../TakePhotoGuide";
import fields from "../../help/fields";
import ImageInspection from "components/ImageInspection";
import {
  FRONT_LEFT_VIEW,
  FRONT_RIGHT_VIEW,
  REAR_LEFT_VIEW,
  REAR_RIGHT_VIEW,
} from "helper/const";
type useStepsProps = {
  useFormResult: UseFormReturn<FieldValues, any>;
  pendingOrderData: any;
  submitCarInspectionImageService: any;
  getCarInspectionResultService: any;
  poolId: string;
  domainLinkFile: string;
  orderContentJson: any;
};

const useSteps = (props: useStepsProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const getInitValues = useCallback(async () => {
    return {
      [fields.carCaptureFrontLeft]: props.orderContentJson?.carCaptureFrontLeft,
      [fields.carCaptureFrontRight]:
        props.orderContentJson?.carCaptureFrontRight,
      [fields.carCaptureRearLeft]: props.orderContentJson?.carCaptureRearLeft,
      [fields.carCaptureRearRight]: props.orderContentJson?.carCaptureRearRight,
      [fields.carPlateNo]: props.orderContentJson?.carPlateNo,
      [fields.saleCode]: props.orderContentJson?.saleCode,
      [fields.saleName]: props.orderContentJson?.saleName,
    };
  }, [props.orderContentJson]);

  const getDefaultValues = useCallback(async () => {
    const _initValues = await getInitValues();

    return { ..._initValues };
  }, [
    // init values
    getInitValues,
  ]);

  useEffect(() => {
    const fetch = async () =>
      props.useFormResult.reset(await getDefaultValues());

    fetch();
  }, [getDefaultValues]);

  return useMemo(
    () => [
      {
        title: "Chụp ảnh xe",
        screens: [
          {
            inputsConfig: [
              {
                id: "takePhotoGuide",
                type: "custom",
                custom: <TakePhotoGuide />,
                className: classes.areaFull,
              },
            ],
          },
          {
            btnNextLabel: "Hoàn thành",
            inputsConfig: [
              {
                id: fields.carCaptureFrontLeft,
                label: "TRƯỚC - LÁI",
                type: "custom",
                validations: ["required"],
                custom: (
                  <ImageInspection
                    bgSrc="https://opes.com.vn/images/car_front_left.png"
                    orderId={props.pendingOrderData?.orderId}
                    poolId={props.poolId}
                    tag={FRONT_LEFT_VIEW}
                    width="100%"
                    height="180px"
                    domainLinkFile={props.domainLinkFile}
                    submitCarInspectionImageService={
                      props.submitCarInspectionImageService
                    }
                    getCarInspectionResultService={
                      props.getCarInspectionResultService
                    }
                  />
                ),
              },
              {
                id: fields.carCaptureFrontRight,
                label: "TRƯỚC - PHỤ",
                type: "custom",
                validations: ["required"],
                custom: (
                  <ImageInspection
                    bgSrc="https://opes.com.vn/images/car_front_right.png"
                    orderId={props.pendingOrderData?.orderId}
                    poolId={props.poolId}
                    tag={FRONT_RIGHT_VIEW}
                    width="100%"
                    height="180px"
                    domainLinkFile={props.domainLinkFile}
                    submitCarInspectionImageService={
                      props.submitCarInspectionImageService
                    }
                    getCarInspectionResultService={
                      props.getCarInspectionResultService
                    }
                  />
                ),
              },
              {
                id: fields.carCaptureRearLeft,
                label: "SAU - LÁI",
                type: "custom",
                validations: ["required"],
                custom: (
                  <ImageInspection
                    bgSrc="https://opes.com.vn/images/car_rear_left.png"
                    orderId={props.pendingOrderData?.orderId}
                    poolId={props.poolId}
                    tag={REAR_LEFT_VIEW}
                    width="100%"
                    height="180px"
                    domainLinkFile={props.domainLinkFile}
                    submitCarInspectionImageService={
                      props.submitCarInspectionImageService
                    }
                    getCarInspectionResultService={
                      props.getCarInspectionResultService
                    }
                  />
                ),
              },
              {
                id: fields.carCaptureRearRight,
                label: "SAU - PHỤ",
                type: "custom",
                validations: ["required"],
                custom: (
                  <ImageInspection
                    bgSrc="https://opes.com.vn/images/car_rear_right.png"
                    orderId={props.pendingOrderData?.orderId}
                    poolId={props.poolId}
                    tag={REAR_RIGHT_VIEW}
                    width="100%"
                    height="180px"
                    domainLinkFile={props.domainLinkFile}
                    submitCarInspectionImageService={
                      props.submitCarInspectionImageService
                    }
                    getCarInspectionResultService={
                      props.getCarInspectionResultService
                    }
                  />
                ),
              },
              {
                id: fields.carPlateNo,
                type: "text",
                label: "Biển kiểm soát",
                className: classes.areaFull,
                validations: ["required", "plateNoCar"],
                uppercase: true,
              },
              {
                id: fields.saleCode,
                type: "text",
                label: "Mã cán bộ bán",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required"],
              },
              {
                id: fields.saleName,
                type: "text",
                label: "Tên cán bộ bán",
                className: matchesDownSm ? classes.areaFull : null,
                validations: ["required"],
              },
            ],
          },
        ],
      },
    ],
    [
      props.pendingOrderData?.orderId,
      props.poolId,
      props.domainLinkFile,
      matchesDownSm,
    ]
  );
};

export default useSteps;
