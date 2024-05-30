import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputSimple from "../../../components/common/InputSimple";
import ButtonSimple from "../../../components/common/ButtonSimple";
import { styled } from "@mui/material";

/**
 *
 * name
 * phone
 * address
 * birthday
 * gender
 * email
 */

const Group = styled("div")({
    display: "grid",
    gridGap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
});

const BuyerInfo: React.FC = () => {
  const schema = yup.object().shape({
    buyerName: yup.string().required("Không được bỏ trống"),
    buyerPhone: yup.number().required("Không được bỏ trống"),
    buyerAddress: yup.string().required("Không được bỏ trống"),
    buyerBirthday: yup.date().required("Không được bỏ trống"),
    buyerEmail: yup.string().email().required("Không được bỏ trống"),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (values: any) => {
    console.log("[BuyerInfo] [values]", values);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputSimple
          label="Tên người mua"
          name="buyerName"
          {...register}
          helperText={errors?.buyerAddress?.message}
        />
        <br></br>
        <ButtonSimple type="submit" label="Tiếp" />
      </form>
    </div>
  );
};

export default BuyerInfo;
