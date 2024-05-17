import React from "react";
import ATMCardIcon from "components/icons/ATMCardIcon";
import CreditCardIcon from "components/icons/CreditCardIcon";
import TransferIcon from "components/icons/TransferIcon";
import ViettelMoneyIcon from "components/icons/ViettelMoneyIcon";
import QRCodeIcon from "components/icons/QRCodeIcon";
import WalletIcon from "components/icons/WalletIcon";

export const carInspectionStatusMapping = {
  DONE: "DONE",
  PROCESSING: "PROCESSING",
  ERROR: "ERROR",
};

export const carInspectionErrorMapping = {
  "not a car":
    "Hình ảnh bạn chụp không phải là hình ảnh xe. Bạn vui lòng chụp lại ảnh nhé.",
  "insufficient contrast":
    "Hình ảnh chưa rõ nét, chưa đủ chất lượng. Bạn vui lòng chụp lại ảnh nhé.",
  "incorrect car angle":
    "Hình ảnh chụp không đúng góc chụp xe. Bạn vui lòng chụp lại ảnh nhé.",
  rear: "Hình ảnh chụp không đúng góc chụp xe. Bạn vui lòng chụp lại ảnh nhé.",
  side: "Hình ảnh chụp không đúng góc chụp xe. Bạn vui lòng chụp lại ảnh nhé.",
  "TYPE_MISMATCH Reason: image is not qualify": "Hình ảnh không đủ tiêu chuẩn",
};

export const carUsingMapping = {
  non_commercial: "Không kinh doanh",
  commercial: "Kinh doanh",
};

export const buyForMapping = {
  personal: "Cá nhân",
  family: "Gia đình",
};

export const genderMapping = {
  M: "Anh",
  F: "Chị",
};

export const packageIconMapping = {
  PKG_CAR_SIL_1: "https://opes.com.vn//images/silver.png",
  PKG_OPES_PA1: "https://opes.com.vn//images/silver.png",
  PKG_CAR_GOL_1: "https://opes.com.vn//images/gold.png",
  PKG_OPES_PA2: "https://opes.com.vn//images/gold.png",
  PKG_CAR_DIAMOND_1: "https://opes.com.vn//images/diamond.png",
  PKG_OPES_PA3: "https://opes.com.vn//images/diamond.png",
};

export const paymentMethodIconMapping = {
  ATM_CARD: <ATMCardIcon />,
  CREDIT_CARD: <CreditCardIcon />,
  VACC_VPBANK: <TransferIcon />,
  VIETTEL_PAY: <ViettelMoneyIcon />,
  SMART_PAY: <div></div>,
  VIETTEL_QR: <QRCodeIcon />,
  TIKI_PAY: <div></div>,
  VIETTEL_WALLET: <WalletIcon />,
  ONE_PAY: (
    <img
      style={{ height: 24 }}
      src="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/onepay.png"
      alt="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/onepay.png"
    />
  ),
};

export const paymentMethodMapping = {
  ATM_CARD: { icon: <ATMCardIcon /> },
  CREDIT_CARD: { icon: <CreditCardIcon /> },
  VACC_VPBANK: {
    icon: (
      <img
        style={{ height: 24 }}
        src="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/payment-method-trans.png"
        alt="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/payment-method-trans.png"
      />
    ),
  },
  VIETTEL_PAY: { icon: <ViettelMoneyIcon /> },
  SMART_PAY: { icon: <div></div> },
  VIETTEL_QR: { icon: <QRCodeIcon /> },
  TIKI_PAY: { icon: <div></div> },
  VIETTEL_WALLET: { icon: <WalletIcon /> },
  ONE_PAY: {
    icon: (
      <img
        style={{ height: 24 }}
        src="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/onepay.png"
        alt="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/onepay.png"
      />
    ),
  },
  ONE_PAY_DOMESTIC: {
    label: "Thẻ ATM/ Tài khoản ngân hàng",
    icon: (
      <img
        style={{ height: 24 }}
        src="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/payment-method-atm.png"
        alt="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/payment-method-atm.png"
      />
    ),
  },
  ONE_PAY_INTERNATIONAL: {
    label: "Thẻ tín dụng/ Ghi nợ",
    icon: (
      <img
        style={{ height: 24 }}
        src="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/payment-method-visa.png"
        alt="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/payment-method-visa.png"
      />
    ),
  },
  ONE_PAY_QR: {
    label: "Thanh toán bằng Mã QR",
    icon: (
      <img
        style={{ height: 24 }}
        src="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/payment-method-qr.png"
        alt="https://n-file.opes.com.vn/of/d/opp/pub/mails/marcom/miniweb/payment-method-qr.png"
      />
    ),
  },
};

export const carUsingMappingCore = {
  "Non-commercial": "Không kinh doanh",
  "Commercial": "Kinh doanh",
};
