import React, { useState, useRef, useCallback } from "react";
import { makeStyles } from "@mui/styles";
import { Typography, IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Webcam from "react-webcam";
import CameraIcon from "@mui/icons-material/Camera";
import ImageIcon from "@mui/icons-material/Image";

import DialogForm from "components/DialogForm";
import Button from "components/Button";
import toaster from "helper/toaster";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "grid",
    gridTemplateColumns: "15% 85%",
    alignItems: "center",
    gap: theme.spacing(2),
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: theme.spacing(1),
    cursor: "pointer",
  },
  imgWrapper: {
    padding: theme.spacing(3),
    display: "flex",
    alignItem: "center",
    "& img": {
      width: "100%",
    },
  },
  actionWrapper: {
    width: 350,
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    margin: "auto",
  },
}));

const videoConstraints = {
  height: 350,
  width: 250,
  facingMode: { exact: "environment" },
};

function dataURLtoFile(dataUrl: any, filename: any) {
  var arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

type OcrType = {
  id?: string;
  onChange?: any;
  ocrService: any;
};

const Ocr = (props: OcrType) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState();
  const webcamRef = useRef(null);
  const inputRef = useRef(null);

  const ocrMutation = useMutation((file) => props.ocrService({ file }), {
    onSuccess: (data) => {
      if ((data as any)?.statusCode === 0) {
        props.onChange({
          target: {
            name: props.id,
            value: data,
          },
        });
        setOpen(false);
      } else {
        toaster.error("Có lỗi xảy ra");
      }
    },
    onError: (err) => {
      toaster.error("Có lỗi xảy ra");
    },
  });

  const ocrHandle = useCallback((image) => {
    let file = image?.file;

    if (image?.type === "capture") {
      file = dataURLtoFile(image?.src, "ocr.png");
    }

    ocrMutation?.mutate(file as any);
  }, []);

  const capture = useCallback(() => {
    const _imageSrc = (webcamRef as any).current.getScreenshot();
    setImageSrc({ src: _imageSrc, type: "capture" } as any);
  }, [webcamRef]);

  const handleClick = useCallback(() => {
    // 👇️ open file input box on click of another element
    (inputRef as any)?.current?.click();
  }, []);

  const handleFileChange = useCallback((event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      var image = document.createElement("img");
      setImageSrc({
        src: (e as any)?.target.result,
        type: "file",
        file: fileObj,
      } as any);
    };
    reader.readAsDataURL(fileObj);

    console.log("fileObj is", fileObj);

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
  }, []);

  return (
    <>
      <div className={classes.wrapper} onClick={() => setOpen(true)}>
        <div className={classes.imgWrapper}>
          <img
            src="https://url.opes.com.vn/231102154729817ZSLEL.png"
            alt="https://url.opes.com.vn/231102154729817ZSLEL.png"
          />
        </div>
        <div>
          <Typography fontWeight="bold">Chụp ảnh đăng ký xe (OCR)</Typography>
          <Typography>
            Giúp bạn điền thông tin dưới đây nhanh và chính xác hơn
          </Typography>
        </div>
      </div>
      <DialogForm
        submitLabel="Xác nhận"
        title="Chụp ảnh đăng ký xe"
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={true}
        loading={ocrMutation?.isLoading}
        inputsConfig={[
          {
            id: "label",
            type: "custom",
            custom: (
              <Typography textAlign="center">
                Bạn vui lòng đặt Đăng ký xe trên mặt phẳng, đảm bảo hình ảnh
                không bị mờ, tối hoặc chói sáng. Sau đó bấm nút chụp ảnh.
              </Typography>
            ),
          },
          {
            id: "camera",
            type: "custom",
            hide: !!(imageSrc as any)?.src,
            custom: (
              <Webcam
                ref={webcamRef}
                audio={false}
                // screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints as any}
                forceScreenshotSourceSize={true}
                width="100%"
                height={250}
              />
            ),
          },
          {
            id: "image",
            type: "custom",
            custom: (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 7,
                }}
              >
                <img style={{ width: 350 }} src={(imageSrc as any)?.src} />
              </div>
            ),
            hide: !(imageSrc as any)?.src,
          },
          {
            id: "action",
            type: "custom",
            custom: (
              <div className={classes.actionWrapper}>
                <Button
                  variant="text"
                  color="inherit"
                  onClick={() => {
                    setImageSrc(null as any);
                  }}
                >
                  Chụp lại
                </Button>
                <IconButton onClick={capture}>
                  <CameraIcon fontSize="large" />
                </IconButton>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={handleClick}>
                    <input
                      style={{ display: "none" }}
                      ref={inputRef}
                      type="file"
                      hidden={true}
                      onChange={handleFileChange}
                    />
                    <ImageIcon fontSize="large" />
                  </IconButton>
                </div>
              </div>
            ),
          },
        ]}
        onSubmit={() => {
          if ((imageSrc as any)?.src) {
            ocrHandle(imageSrc);
          }
        }}
      />
    </>
  );
};

export default Ocr;
