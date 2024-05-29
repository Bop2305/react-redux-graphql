import { BaseSelectProps, MenuItem, Select, styled } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/**
 * props
 * select
 * style
 */

type Props = {
  icon?: React.ReactNode;
  options: any[];
  size?: string
} & BaseSelectProps;

const SelectWrapper = styled("div")({
  "& .options": {
    left: "0px",
  }
});

const SelectSimple: React.FC<Props> = ({
  icon = <KeyboardArrowDownIcon />,
  size ="small",
  options,
  ...props
}) => {
  return (
    <SelectWrapper>
      <Select size={size} className="select" fullWidth {...props}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} className="options">
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </SelectWrapper>
  );
};

export default SelectSimple;
