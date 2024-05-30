import { BaseSelectProps, MenuItem, Select, styled } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ErrorOption, RegisterOptions } from "react-hook-form";

/**
 * props
 * select
 * style
 */

type Props = {
  icon?: React.ReactNode;
  options: any[];
  size?: string;
  label: string;
  register?: RegisterOptions;
  errors?: Record<string, ErrorOption>;
} & BaseSelectProps;

const SelectWrapper = styled("div")({
  position: "relative",
  "& .label": {
    position: "absolute",
    top: "-15px",
    left: "5px",
    background: "white",
    zIndex: 10,
  },
  "& .option": {
    left: "0px",
  },
});

const SelectSimple: React.FC<Props> = ({
  icon = <KeyboardArrowDownIcon />,
  size = "small",
  options,
  label,
  register,
  errors,
  ...props
}) => {
  return (
    <SelectWrapper>
      <label className="label">{label}</label>
      <Select size={size} className="select" fullWidth {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} className="option">
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </SelectWrapper>
  );
};

export default SelectSimple;
