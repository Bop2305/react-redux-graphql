import React from "react";
import { toast } from "react-toastify";

import { Alert } from "@mui/material";

const success = (message: any) => {
  toast.success(() => <Alert severity="success">{message}</Alert>);
};

const error = (message: any) => {
  toast.error(() => <Alert severity="error">{message}</Alert>);
};

const warning = (message: any) => {
  toast.warning(() => <Alert severity="warning">{message}</Alert>);
};

const info = (message: any) => {
  toast.info(() => <Alert severity="info">{message}</Alert>);
};

const toaster = { success, error, warning, info };
export default toaster;
