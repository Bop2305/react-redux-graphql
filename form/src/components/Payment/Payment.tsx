import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { useMutation, useQuery } from "@tanstack/react-query";
import withTheme from "hoc/withTheme";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { getPaymentInfoServiceType } from "../sales/types";

import TotalFee from "components/TotalFee/TotalFee";
import FormSimple from "components/forms/FormSimple/FormSimple";
import RadioLabelPaymentMethodLong from "components/inputs/InputRadio/radioLabels/RadioLabelPaymentMethodLong";
import { paymentMethodMapping } from "helper/mapping";
import {
  invoiceIsCompanyOptions,
  paymentMethodLoadingOptions,
} from "helper/options";
import toaster from "helper/toaster";
import CarImg from "./CarImg";
import InsureInfo from "./InsureInfo";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.purple,
    fontWeight: `${theme.typography.fontWeightBold} !important`,
  },
  inputsWrapperClass: {
    display: "grid !important",
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(5),
  },
  classGroupPaymentMethod: {
    display: "grid !important",
    gridTemplateColumns: "1fr",
    columnGap: "5px",
    rowGap: "5px",
  },
  infoWrap: {
    marginTop: 10,
    marginBottom: 20,
  },
  paymentHead: {
    backgroundColor: "#F8F8F8 !important",
  },
  paymentTitle: {
    fontSize: 24,
    textAlign: "center",
    paddingTop: 20,
    marginTop: 0,
    marginBottom: 10,
  },
  paymentStatus: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    fontSize: 18,
    padding: "20px 10px",
  },
  productName: {
    color: "#434345",
    fontWeight: `${theme.typography.fontWeightBold} !important`,
  },
  iconExpand: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: "translateY(-50%)",
  },
  areaFull: {
    gridColumn: "2 span",
  },
}));

type PaymentProps = {
  getPaymentInfoService: getPaymentInfoServiceType;
  getCparamsService: any;
  getProgramListService: any;
  getDetailSumidService: any;
  checkCouponService: any;
  paymentService: any;
  releasePaymentService: any;
  updateInvoiceInfoService: any;
  goodCode: string;
  polSumId: string;
  hideDiscount?: boolean;
  successUrl: string;
  failureUrl: string;
  carUrl: string;
  onPayment: any;
  hideInvoice?: boolean;
};

const Payment = (props: PaymentProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const useFormResult = useForm({ mode: "onTouched" });
  const [discountCodeCheck, setDiscountCodeCheck] = useState();
  const [discountCode, setDiscountCode] = useState("");
  const matchesDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [policies, setPolicies] = useState<any[]>([]);
  const [isOpenCollapse, setIsOpenCollapse] = useState<number | null>(0);

  const paymentInfoQuery = useQuery(
    ["getPaymentInfoService", props.goodCode, discountCode],
    () =>
      props.getPaymentInfoService({
        goodCode: props.goodCode,
        discountCodes: discountCode,
      }),
    {
      enabled: !!props.goodCode,
      refetchOnWindowFocus: false,
      onSuccess: async (data) => {
        let infoDetail = data?.content?.orderInfo?.details;

        (infoDetail || [])?.map(async (item: any) => {
          if (item?.discountCode) {
            setDiscountCode(item?.discountCode);
            setDiscountCodeCheck(item?.discountCode);
            useFormResult?.setValue("discountCode", item?.discountCode);
          }
        });
      },
    }
  );

  useEffect(() => {
    const fetch = async () => {
      let _details = paymentInfoQuery?.data?.content?.orderInfo?.details || [];

      _details = await Promise.all(
        _details?.map(async (d: any) => {
          const _res = await props.getDetailSumidService({
            goodCode: props.goodCode,
            polSumId: d?.polSumId,
          });
          return _res?.content;
        })
      );

      setPolicies(_details);
    };

    fetch();
  }, [paymentInfoQuery?.data?.content?.orderInfo?.details]);

  const orderInfo = useMemo(
    () => paymentInfoQuery?.data?.content?.orderInfo,
    [paymentInfoQuery?.data?.content?.orderInfo]
  );

  const resourceCode = useMemo(
    () =>
      paymentInfoQuery?.data?.content?.orderInfo?.details?.[0]?.resourceCode,
    [paymentInfoQuery?.data?.content?.orderInfo?.details?.[0]?.resourceCode]
  );

  const cparamsQuery = useQuery(
    ["getCparamsService"],
    () =>
      props.getCparamsService({
        goodCode: props.goodCode,
      }),
    {
      enabled: !!props.goodCode,
      refetchOnWindowFocus: false,
    }
  );

  const programListQuery = useQuery(
    ["getProgramListService"],
    () =>
      props.getProgramListService({
        goodCode: props.goodCode,
      }),
    {
      enabled: !!props.goodCode,
      refetchOnWindowFocus: false,
    }
  );

  const programList = useMemo(
    () => programListQuery?.data?.content,
    [programListQuery?.data?.content]
  );

  const cparams = useMemo(
    () => cparamsQuery?.data?.content,
    [cparamsQuery?.data?.content]
  );

  const checkCouponQuery = useQuery(
    ["checkCouponService", discountCodeCheck, resourceCode],
    () =>
      props.checkCouponService({
        goodCode: props.goodCode,
        discountCode: discountCodeCheck,
        resourceCode: resourceCode,
      }),
    {
      enabled: !!props.goodCode && !!discountCodeCheck && !!resourceCode,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (data?.statusCode === 0) {
          setDiscountCode(data?.content?.discountCode);
        } else if (data?.message === "coupon not found") {
          toaster.error("Không tìm thấy mã khuyến mại");
        } else {
          toaster.error("Có lỗi xảy ra");
        }
      },
    }
  );

  const paymentMutation = useMutation((data) => props.paymentService(data), {
    onSuccess: (data: any) => {
      if (data?.statusCode === 0) {
        props.onPayment(data);
      } else {
        toaster.error("Có lỗi xảy ra");
      }
    },
  });
  const releasePaymentMutation = useMutation((data) =>
    props.releasePaymentService(data)
  );
  const updateInvoiceInfoMutation = useMutation((data) =>
    props.updateInvoiceInfoService(data)
  );

  useEffect(() => {
    // set default form
    [
      "invoiceExport",
      "invoiceCompanyName",
      "invoiceTaxCode",
      "invoiceBuyerName",
      "invoiceAddress",
      "invoiceEmail",
      "invoicePhone",
      "invoiceIsCompany",
    ].forEach((k) => {
      if (
        [null, undefined, ""].includes(useFormResult.getValues(k) as any) &&
        ![null, undefined, ""].includes(
          paymentInfoQuery?.data?.content?.orderInfo?.invoice?.[k]
        )
      ) {
        useFormResult.setValue(
          k,
          paymentInfoQuery?.data?.content?.orderInfo?.invoice?.[k]
        );
      } else {
        if (
          k === "invoiceIsCompany" &&
          paymentInfoQuery?.data?.statusCode == 0
        ) {
          useFormResult.setValue(k, false);
        }
      }
    });
  }, [
    paymentInfoQuery?.data?.content?.orderInfo?.invoice,
    paymentInfoQuery?.data?.statusCode,
  ]);

  /**
   *
   * Lấy title Thanh toán
   * @author VanBui
   */
  const getPaymentTitle = (paymentCode: any) => {
    switch (paymentCode) {
      case "POL_ENDORS_PREMIUM":
        return "Thanh toán phí bổ sung";
      case "POL_PREMIUM":
        return "Thanh toán phí";
      case "POL_PREMIUM_RENEWAL":
        return "TÁI TỤC";
      default:
        return "Thanh toán phí bảo hiểm";
    }
  };

  const handleOpen = (clickedIndex: any) => {
    if (isOpenCollapse === clickedIndex) {
      setIsOpenCollapse(null);
    } else {
      setIsOpenCollapse(clickedIndex);
    }
  };

  console.log(paymentInfoQuery?.data?.content?.orderInfo?.status);

  return (
    <div>
      <h2 className={classes.paymentTitle}>
        {paymentInfoQuery
          ? getPaymentTitle(
              paymentInfoQuery?.data?.content?.orderInfo?.paymentType
            )
          : ""}
      </h2>
      {policies?.map((policy: any, idx: number) => {
        let proResource = programList?.find(
          (val: any) => val?.resourceCode === policy?.saleResourceCode
        )?.content;
        if (proResource) {
          try {
            proResource = JSON.parse(proResource);
          } catch {
            proResource = {};
          }
        }

        // if payment for endorsement, replace policy data to change data to show
        let listKeyChanges: string[] = [];
        if (
          paymentInfoQuery?.data?.content?.orderInfo?.paymentType ===
          "POL_ENDORS_PREMIUM"
        ) {
          let findChange =
            policy?.polCheckChanges && policy.polCheckChanges.length > 0
              ? policy.polCheckChanges.find(
                  (item: any) => item.changeStatus === "INITIAL"
                )
              : null;
          if (findChange && findChange.values && findChange.values.length > 0) {
            let changeValueNews = findChange.values.reduce(
              (acc: any, curr: any) => {
                acc[curr.fieldName] = curr.newValue;
                return acc;
              },
              {}
            );
            policy = { ...policy, ...changeValueNews };
            listKeyChanges = Object.keys(changeValueNews);
          }
          // console.log(`policy POL_ENDORS_PREMIUM ${idx}: `, policy)
        }

        let businessUsingTxt = cparams?.businessUsing?.find(
          (it: { value: string; name: string }) =>
            it.value === policy?.businessUsing
        )?.name;
        let pkgInsure = cparams?.pkgName?.find(
          (it: { value: string; name: string }) =>
            it.value === policy?.polPkgCode
        )?.name;

        const dataInfo = {
          ...policy,
          businessUsingTxt,
          pkgInsure,
        };

        return (
          <div key={idx} className={classes.infoWrap}>
            <Typography component="div" className={classes.paymentHead}>
              <div className={classes.paymentStatus}>
                {proResource?.websiteName && (
                  <span className={classes.productName}>
                    {proResource?.websiteName}
                  </span>
                )}
                <div className={classes.iconExpand}>
                  {(policy?.polProgCode === "PROG_OPES_CAR" ||
                    policy?.polProgCode === "PROG_OPES_TPL") && (
                    <IconButton onClick={() => handleOpen(idx)}>
                      {isOpenCollapse === idx ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  )}
                </div>
              </div>
            </Typography>
            <Collapse in={isOpenCollapse === idx} timeout="auto" unmountOnExit>
              <InsureInfo
                data={dataInfo}
                isPaymentEndors={
                  paymentInfoQuery?.data?.content?.orderInfo?.paymentType ===
                  "POL_ENDORS_PREMIUM"
                }
                isRenew={
                  paymentInfoQuery?.data?.content?.orderInfo?.paymentType ===
                  "POL_PREMIUM_RENEWAL"
                }
                listKeyChanges={listKeyChanges}
              />
              {policy?.inspections && (
                <CarImg
                  title="Hình ảnh xe"
                  carUrl={props?.carUrl}
                  data={policy?.inspections}
                />
              )}
            </Collapse>
          </div>
        );
      })}
      <FormSimple
        useFormResult={useFormResult}
        inputsWrapperClass={classes.inputsWrapperClass}
        submitLabel="Thanh toán"
        loading={
          paymentInfoQuery.isInitialLoading ||
          checkCouponQuery.isInitialLoading ||
          paymentMutation.isLoading
        }
        disabledSubmitButton={
          ["LOCKED", "SUCCESS"].includes(orderInfo?.status) ||
          !paymentInfoQuery?.data?.content
        }
        inputsConfig={[
          {
            id: "discountCode",
            type: "action",
            label: "Mã khuyến mại",
            labelAction: "Áp dụng",
            onClick: (e: any) => {
              setDiscountCodeCheck(e?.target?.value);
            },
            loading:
              paymentInfoQuery.isInitialLoading ||
              checkCouponQuery.isInitialLoading,
            hide: props.hideDiscount,
            className: classes.areaFull,
          },
          {
            id: "paymentFee",
            type: "custom",
            custom: (
              <div>
                <TotalFee
                  fee={
                    orderInfo?.discountAmount > 0
                      ? orderInfo?.chargeAmount
                      : orderInfo?.totalAmount
                  }
                  oldFee={
                    orderInfo?.discountAmount > 0 ? orderInfo?.totalAmount : 0
                  }
                  title={"Tổng phí bảo hiểm"}
                  description={"(Đã bao gồm VAT)"}
                />
                <br />
                <Divider />
              </div>
            ),
            className: classes.areaFull,
          },
          {
            id: "invoiceExport",
            type: "switch",
            switchLabel: "YÊU CẦU XUẤT HOÁ ĐƠN",
            helperText:
              "Hóa đơn điện tử sẽ chỉ được xuất trong ngày và gửi về email của bạn vào ngày tiếp theo.",
            checkedValue: true,
            unCheckedValue: false,
            className: classes.areaFull,
            hide: !!props.hideInvoice,
          },
          {
            id: "invoiceIsCompany",
            type: "radio",
            options: invoiceIsCompanyOptions,
            row: true,
            className: classes.areaFull,
            hide: !useFormResult?.watch("invoiceExport") || !!props.hideInvoice,
          },
          {
            id: "invoiceCompanyName",
            type: "text",
            label: "Tên công ty",
            validations: ["required"],
            className: matchesDownSm ? classes.areaFull : "",
            hide:
              !useFormResult?.watch("invoiceExport") ||
              !useFormResult?.watch("invoiceIsCompany") ||
              !!props.hideInvoice,
          },
          {
            id: "invoiceBuyerName",
            type: "text",
            label: "Họ và tên",
            validations: ["required"],
            className: matchesDownSm ? classes.areaFull : "",
            hide: !useFormResult?.watch("invoiceExport") || !!props.hideInvoice,
          },
          {
            id: "invoiceTaxCode",
            type: "text",
            label: "Mã số thuế",
            className: matchesDownSm ? classes.areaFull : "",
            validations: ["required", "taxCode"],
            hide:
              !useFormResult?.watch("invoiceExport") ||
              !useFormResult?.watch("invoiceIsCompany") ||
              !!props.hideInvoice,
          },
          {
            id: "invoiceEmail",
            type: "text",
            label: "Email",
            className: matchesDownSm ? classes.areaFull : "",
            validations: ["required", "email"],
            hide: !useFormResult?.watch("invoiceExport") || !!props.hideInvoice,
          },
          {
            id: "invoiceAddress",
            type: "text",
            label: "Địa chỉ",
            className: classes.areaFull,
            validations: ["required"],
            hide: !useFormResult?.watch("invoiceExport") || !!props.hideInvoice,
          },
          {
            id: "titlePaymentMethod",
            type: "custom",
            custom: (
              <Typography className={classes.title}>
                Phương thức thanh toán
              </Typography>
            ),
            className: classes.areaFull,
          },
          {
            id: "paymentMethod",
            type: "radio",
            row: true,
            label: "Phương thức thanh toán",
            hideLabel: true,
            validations: ["required"],
            classGroup: classes.classGroupPaymentMethod,
            options: paymentInfoQuery?.isInitialLoading
              ? paymentMethodLoadingOptions?.slice(0, 1)
              : paymentInfoQuery?.data?.content?.paymentMethods?.map(
                  (it: any) => ({
                    value: it?.method,
                    label: (
                      <RadioLabelPaymentMethodLong
                        label={
                          (paymentMethodMapping as any)?.[it?.method]?.label ||
                          it?.name
                        }
                        icon={(paymentMethodMapping as any)?.[it?.method]?.icon}
                      />
                    ),
                  })
                ),
            className: classes.areaFull,
          },
        ]}
        onSubmit={async (data) => {
          let isPayment = true;

          if (data?.invoiceExport) {
            const resultUpdateInvoice =
              await updateInvoiceInfoMutation.mutateAsync({
                goodCode: props.goodCode,
                invoiceCompanyName: data?.invoiceCompanyName,
                invoiceTaxCode: data?.invoiceTaxCode,
                invoiceBuyerName: data?.invoiceBuyerName,
                invoiceAddress: data?.invoiceAddress,
                invoiceEmail: data?.invoiceEmail,
                invoicePhone: data?.invoicePhone,
                invoiceIsCompany: data?.invoiceIsCompany,
                invoiceExport: data?.invoiceExport,
              } as any);

            if (!(resultUpdateInvoice as any)?.content?.id) {
              isPayment = false;
            }
          }

          if (isPayment) {
            if (
              paymentInfoQuery?.data?.content?.orderInfo?.status ===
                "WAITING" &&
              paymentInfoQuery?.data?.content?.orderInfo?.paymentChannel ===
                "VACC_VPBANK" &&
              data?.paymentMethod === "VACC_VPBANK"
            ) {
              props.onPayment(paymentInfoQuery?.data?.content);
            } else {
              if (
                orderInfo?.paymentChannel === "VACC_VPBANK" &&
                !!props.releasePaymentService
              ) {
                await releasePaymentMutation.mutateAsync({
                  goodCode: props.goodCode,
                } as any);
              }

              paymentMutation.mutate({
                goodCode: props.goodCode,
                discountCodes: discountCode,
                paymentMethod: data?.paymentMethod,
                failureUrl: props.failureUrl,
                successUrl: props.successUrl,
              } as any);
            }
          }
        }}
      />
    </div>
  );
};

export default withTheme<PaymentProps>(Payment);
