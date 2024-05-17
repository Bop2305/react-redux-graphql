import React from "react";
import { Skeleton } from "@mui/material";
import { CAR, MOTO, ONEWAY, RETURN } from "./const";

const SkeletonPaymentMethod = () => {
  return (
    <Skeleton
      style={{
        minHeight: 56,
        transform: "none",
        borderRadius: 0,
      }}
    />
  );
};

export const paymentMethodLoadingOptions = [
  {
    value: "",
    label: <SkeletonPaymentMethod />,
  },
  {
    value: "",
    label: <SkeletonPaymentMethod />,
  },
  {
    value: "",
    label: <SkeletonPaymentMethod />,
  },
  {
    value: "",
    label: <SkeletonPaymentMethod />,
  },
  {
    value: "",
    label: <SkeletonPaymentMethod />,
  },
  {
    value: "",
    label: <SkeletonPaymentMethod />,
  },
];

export const invoiceIsCompanyOptions = [
  {
    label: "Doanh nghiệp",
    value: true,
  },
  {
    label: "Cá nhân",
    value: false,
  },
];

export const buyerIsCompanyOptions = [
  {
    label: "Doanh nghiệp",
    value: true,
  },
  {
    label: "Cá nhân",
    value: false,
  },
];

export const isCollateralOptions = [
  { value: true, label: "Xe là tài sản đảm bảo" },
  { value: false, label: "Xe không là tài sản đảm bảo" },
];

export const ownerIsCompanyOptions = [
  {
    label: "Chủ xe là doanh nghiệp",
    value: true,
  },
  {
    label: "Chủ xe là cá nhân",
    value: false,
  },
];

export const typeFlowTplOptions = [
  {
    label: "Ô tô",
    value: CAR,
  },
  {
    label: "Xe máy",
    value: MOTO,
  },
];

export const typeFlowFdcOptions = [
  {
    label: "Một chiều",
    value: ONEWAY,
  },
  {
    label: "Khứ hồi",
    value: RETURN,
  },
];

export const vehicleRegisterOptions = [
  {
    label: "Đã đăng ký",
    value: true,
  },
  {
    label: "Chưa đăng ký",
    value: false,
  },
];

export const genderOptions = [
  {
    label: "Nam",
    value: "M",
  },
  {
    label: "Nữ",
    value: "F",
  },
];

export const hasBankLoanHomeOptions = [
  {
    label: "Nhà là tài sản đảm bảo",
    value: true,
  },
  {
    label: "Nhà không là tài sản đảm bảo",
    value: false,
  },
];

export const homeDurationsOptions = [
  {
    label: "1 Năm",
    value: 1,
  },
  {
    label: "2 Năm",
    value: 2,
  },
  {
    label: "3 Năm",
    value: 3,
  },
];

export const homeAddOn2Options = [
  {
    label: "Có",
    value: 1,
  },
  {
    label: "Không",
    value: 0,
  },
];

export const isInsuredOptions = [
  {
    label: "Có",
    value: 1,
  },
  {
    label: "Không",
    value: 0,
  },
];
