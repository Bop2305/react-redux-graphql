import { makeStyles } from "@mui/styles";

import { theme } from "hoc/withTheme";

const useStylesInputRadio = makeStyles(() => ({
  classRadioGroupRadius: {
    display: "flex !important",
    border: `1px solid ${theme.palette.grey[300]}`,
    padding: theme.spacing(1),
    borderRadius: 100,
  },
  classRadioRadius: {
    flex: 1,
  },
}));

export default useStylesInputRadio;
