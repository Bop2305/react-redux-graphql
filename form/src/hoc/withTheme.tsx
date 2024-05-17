import React from "react";

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  Theme,
  // StyledEngineProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import myTheme from "../theme";

declare module "@mui/material/styles" {
  interface CommonColors {
    purple: string;
    whiteFilter: string;
  }

  interface PaletteColor {
    filter: string;
  }

  interface Palette {
    common: CommonColors;
    primary: PaletteColor;
  }
}
declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface (remove this line if you don't have the rule enabled)
  interface DefaultTheme extends Theme {}
}

// create theme
let theme = createTheme(myTheme);
theme = responsiveFontSizes(theme);

export { theme };

function withTheme<T>(Component: React.ComponentType<T>) {
  return React.forwardRef((props: T, ref) => (
    // <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...(props as T)} ref={ref} />
    </ThemeProvider>
    // </StyledEngineProvider>
  ));
}

export default withTheme;
