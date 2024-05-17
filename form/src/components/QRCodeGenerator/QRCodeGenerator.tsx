import React from "react";
import QRCode from "qrcode.react";

type QRCodeGeneratorProps = {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  includeMargin?: boolean;
  renderAs?: "canvas" | "svg" | undefined;
  level?: string;
  imageSettings?: any;
};

const QRCodeGenerator = ({
  value,
  size,
  bgColor = "#FFFFFF",
  fgColor = "#000000",
  includeMargin = false,
  renderAs = "canvas",
  level = "L",
  imageSettings = {},
}: QRCodeGeneratorProps) => {
  return (
    <QRCode
      imageSettings={imageSettings}
      value={value}
      renderAs={renderAs}
      size={size}
      bgColor={bgColor}
      fgColor={fgColor}
      includeMargin={includeMargin}
      level={level}
    />
  );
};

export default QRCodeGenerator;
