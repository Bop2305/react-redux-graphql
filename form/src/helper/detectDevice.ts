export const deviceDetect = () => ({
  isIos: /iPhone|iPad|iPod/i.test(navigator?.userAgent),
  isAndroid: /Android/i.test(navigator?.userAgent),
  isMobile: /iPhone|iPad|iPod|Android/i.test(navigator?.userAgent),
});

export const getBrowserName = () => {
  let userAgent = navigator?.userAgent;
  let browserName;

  if (userAgent?.match(/chrome|chromium|crios/i)) {
    browserName = "chrome";
  } else if (userAgent?.match(/firefox|fxios/i)) {
    browserName = "firefox";
  } else if (userAgent?.match(/safari/i)) {
    browserName = "safari";
  } else if (userAgent?.match(/opr\//i)) {
    browserName = "opera";
  } else if (userAgent?.match(/edg/i)) {
    browserName = "edge";
  } else {
    browserName = "No browser detection";
  }
  return browserName;
};
