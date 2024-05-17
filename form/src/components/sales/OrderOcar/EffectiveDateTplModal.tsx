import React from "react";
import DialogForm from "../../DialogForm/DialogForm";
import dayjs from "dayjs";

interface EffectiveDateTplModalProps {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (values: any) => void,
  defaultValues?: any
}

const EffectiveDateTplModal = (props: EffectiveDateTplModalProps) => {

  return <>
    <DialogForm
      title="Nhập ngày hiệu lực cho hợp đồng TNDS"
      submitLabel="Cập nhật"
      open={props.isOpen}
      onClose={props.onClose}
      onSubmit={props.onSubmit}
      loading={false}
      inputsConfig={[
        {
          id: "effectiveDateTpl",
          type: "date",
          label: "Ngày hiệu lực dự kiến",
          validations: ["required", "dateRanger"],
          min: dayjs().toDate(),
          defaultValue: props?.defaultValues?.effectiveDateTpl
        },
      ]}
    />
  </>
}

export default EffectiveDateTplModal;
