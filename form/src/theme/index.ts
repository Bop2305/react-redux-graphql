import palette from "./palette";
import typography from "./typography";
import MontserratRegular from "./fonts/Montserrat-Regular.ttf";
import MontserratBold from "./fonts/Montserrat-Bold.ttf";

const theme = {
  palette,
  typography,
  spacing: 4,
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'MontserratOPES';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('MontserratOPES'), local('MontserratOPES-Regular'), url(${MontserratRegular}) format('truetype');
        }
        @font-face {
          font-family: 'MontserratOPES';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('MontserratOPES'), local('MontserratOPES-Bold'), url(${MontserratBold}) format('truetype');
        }

        .Toastify__toast-icon {
          display: none !important;
        }

        .Toastify__toast-body > div {
          width: 100%;
        }
      `,
    },
  },
};

export default theme;
