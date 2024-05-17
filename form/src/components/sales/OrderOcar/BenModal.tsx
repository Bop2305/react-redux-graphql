import React, { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import DialogForm from "../../DialogForm/DialogForm";

type BenModalDefaultValues = {
  benBankName: string;
  benBankBranchName: string;
  benBankBranchEmail: string;
  benBankBranchAddress: string;
  benBankEmail: string;
  benLossAmount: number;
};

interface BenModalProps {
  banks: any;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  defaultValues?: BenModalDefaultValues;
}

const BenModal = (props: BenModalProps) => {
  const useFormResult = useForm({
    mode: "onTouched",
    defaultValues: { ...props.defaultValues, benLossAmount: 30000000 },
  });

  const isVPBank = useMemo(
    () =>
      useFormResult.getValues("benBankName") ===
      "Ngân hàng TMCP Việt Nam Thịnh Vượng",
    [useFormResult.watch("benBankName")]
  );

  useEffect(() => {
    useFormResult.reset(props.defaultValues);
  }, [props.defaultValues]);

  return (
    <>
      <DialogForm
        useFormResult={useFormResult as any}
        title="Người thụ hưởng là Tổ chức tín dụng"
        submitLabel="Xác nhận"
        open={props.isOpen}
        onClose={props.onClose}
        onSubmit={props.onSubmit}
        loading={false}
        inputsConfig={[
          {
            id: "benBankName",
            type: "autocomplete",
            label: "Người thụ hưởng",
            validations: ["required"],
            // defaultValue: props.defaultValues?.benBankName,
            options: props.banks,
          },
          {
            id: "benBankBranchName",
            type: "text",
            label: "Chi nhánh/PGD",
            validations: ["required"],
            hide: !isVPBank,
            // defaultValue: props.defaultValues?.benBankBranchName,
          },
          {
            id: "benBankBranchEmail",
            type: "text",
            label: "Email Chi nhánh/PGD",
            validations: ["required", "email"],
            hide: !isVPBank,
            // defaultValue: props.defaultValues?.benBankBranchEmail,
          },
          {
            id: "benBankBranchAddress",
            type: "text",
            label: "Địa chỉ Chi nhánh/PGD",
            validations: ["required"],
            hide: !isVPBank,
            // defaultValue: props.defaultValues?.benBankBranchAddress,
          },
          {
            id: "benBankEmail",
            type: "text",
            label: "Email Hội sở",
            validations: ["required", "email"],
            hide: !isVPBank,
            // defaultValue: props.defaultValues?.benBankEmail,
          },
          {
            id: "benLossAmount",
            type: "currency",
            label: "Số tiền tổn thất",
            validations: ["required"],
            hide: !isVPBank,
            disabled: true,
            // defaultValue: props.defaultValues?.benLossAmount,
          },
        ]}
      />
    </>
  );
};

export default BenModal;
