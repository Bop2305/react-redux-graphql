import React from "react";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/styles";

import withTheme from "hoc/withTheme";

type LabelFrameProps = {
  content: string;
};

const LabelFrame = (props: LabelFrameProps) => {
  const theme = useTheme();

  return (
    <Typography
      textAlign="center"
      fontWeight="500"
      sx={{
        color: theme.palette.grey[500],
      }}
    >
      {props.content}
    </Typography>
  );
};

export default withTheme<LabelFrameProps>(LabelFrame);
