import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CircularProgress, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

import withTheme from "hoc/withTheme";
import {
  carInspectionErrorMapping,
  carInspectionStatusMapping,
} from "helper/mapping";
import toaster from "helper/toaster";
import { compressImage } from "helper/imageCompresser";
import ImageView from "components/ImageView";

import InputWrapper from "../inputs/InputWrapper";

const useStyles = makeStyles((theme) => ({
  container: {
    border: "1px solid",
    borderColor: "#C4C4C4",
    borderRadius: "2px",
    textAlign: "center",
    position: "relative",
    padding: 0,
    margin: "auto",
  },
  img: {
    opacity: 0.5,
    maxWidth: "100%",
  },
  error: {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.main,
  },
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 2,
    marginLeft: "auto",
    marginRight: "auto",
  },
  headerText: {
    fontWeight: `${theme.typography.fontWeightBold} !important`,
    fontSize: "1rem !important",
    textTransform: "uppercase",
    backgroundColor: theme.palette.common.white,
  },
  contentContainer: {
    height: "fit-content",
    padding: theme.spacing(0, 1),
    paddingTop: "60px",
    paddingBottom: "45px",
  },
  icon: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
    maxWidth: "50px",
    maxHeight: "50px",
  },
  centerAll: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
  },
  loadingWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2px",
  },
  removeIcon: {
    position: "absolute",
    top: 2,
    right: 2,
    zIndex: 3,
    width: "20px",
    height: "20px",
    "& svg": {
      color: theme.palette.common.white,
      cursor: "pointer",
    },
  },
}));

const INTERVAL_CHECK_INSPECTION_STATUS_MS = 3000; //ms
const MAX_CALL_INSPECTION_RESULT_TIMES = 20;

type ImageInspectionProps = {
  id?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
  poolId?: string;
  orderId?: string;
  tag?: string;
  takePhotoIconSrc?: string;
  takePhotoIconComponent?: React.ReactNode;
  bgSrc?: string;
  onChange?: any;
  width?: string | number;
  height?: string | number;
  value?: string;
  submitCarInspectionImageService?: any;
  getCarInspectionResultService?: any;
  domainLinkFile: String;
  onUploadSuccess?: any;
};

const ImageInspection = (props: ImageInspectionProps) => {
  const classes = useStyles();

  const [handlingImage, setHandlingImage] = useState(false);
  const [callTimes, setCallTimes] = useState(0);

  const {
    mutate: upload,
    isLoading: uploading,
    data: uploadedResponseData,
    reset: resetUploadedData,
  } = useMutation((options) => props.submitCarInspectionImageService(options), {
    onSuccess: (res: any) => {
      if (res?.statusCode !== 0 || !res?.content?.imageId) {
        setHandlingImage(false);
        toaster.error("Đã xảy ra lỗi khi xử lý ảnh");
      }
      // if (props?.onUploadSuccess) {
      //   props?.onUploadSuccess(res?.content)
      // }
    },
    onError: (err) => {
      toaster.error("Đã xảy ra lỗi");
      setHandlingImage(false);
    },
  });

  const {
    data: inspectionResult,
    refetch: refetchInspectionResult,
    remove: removeInspectionData,
    error: getInspectionResultErr,
  } = useQuery(
    ["imageInspection", uploadedResponseData?.content?.imageId],
    () =>
      props.getCarInspectionResultService({
        poolId: props.poolId,
        imageId: uploadedResponseData?.content?.imageId,
      }),
    { enabled: false }
  );

  useEffect(() => {
    if (getInspectionResultErr) {
      toaster.error("Đã xảy ra lỗi");
      removeInspectionData();
      resetUploadedData();
      setHandlingImage(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getInspectionResultErr]);

  const handleRemoveImg = useCallback(() => {
    resetUploadedData();
    removeInspectionData();
    setCallTimes(0);
    props.onChange({
      target: {
        name: props.id,
        value: null,
      },
    });
  }, [props.id, props.onChange, removeInspectionData, resetUploadedData]);

  useEffect(() => {
    let interval: any;
    const status = inspectionResult?.content?.status;

    if (
      uploadedResponseData?.content?.imageId &&
      uploadedResponseData?.content?.imageFCode &&
      (status === "PROCESSING" || !status)
    ) {
      interval = setInterval(() => {
        refetchInspectionResult();
        setCallTimes((pre) => pre + 1);
      }, INTERVAL_CHECK_INSPECTION_STATUS_MS);
    }

    if (
      callTimes >= MAX_CALL_INSPECTION_RESULT_TIMES ||
      inspectionResult?.message?.indexOf(
        "BIND_ERROR Reason: there are no poolId"
      ) > -1
    ) {
      clearInterval(interval);
      setHandlingImage(false);
      setCallTimes(0);
      removeInspectionData();
      resetUploadedData();
      return toaster.error("Đã xảy ra lỗi khi xử lý ảnh, vui lòng thử lại");
    }

    if (status && status !== carInspectionStatusMapping.PROCESSING) {
      setHandlingImage(false);
      setCallTimes(0);
      clearInterval(interval);
      if (inspectionResult?.content && props?.onUploadSuccess) {
        props?.onUploadSuccess(inspectionResult?.content)
      }
    }
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    inspectionResult?.message,
    inspectionResult?.content?.status,
    refetchInspectionResult,
    uploadedResponseData?.content?.imageId,
    uploadedResponseData?.content?.imageFCode,
    callTimes,
  ]);

  const isDoneInspection = useMemo(() => {
    return (
      inspectionResult?.content?.status === carInspectionStatusMapping.DONE ||
      props.value
    );
  }, [inspectionResult?.content?.status, props.value]);

  const isErrorInspection = useMemo(() => {
    return (
      inspectionResult?.content?.status === carInspectionStatusMapping.ERROR &&
      !handlingImage
    );
  }, [handlingImage, inspectionResult?.content?.status]);

  const handleInspecImage = useCallback(
    async (file) => {
      setHandlingImage(true);
      const compressedFile = await compressImage(file);

      upload({
        poolId: props.poolId,
        orderId: props.orderId,
        tag: props.tag,
        fileName: compressedFile.name,
        file: compressedFile,
      } as any);
    },
    [props.orderId, props.poolId, props.tag, upload]
  );

  const isTakePhotoMode = useMemo(() => {
    return !isErrorInspection && !isDoneInspection && !handlingImage;
  }, [handlingImage, isDoneInspection, isErrorInspection]);

  useEffect(() => {
    if (isErrorInspection) {
      const message = inspectionResult?.content?.errorMessage;
      const msg =
        (carInspectionErrorMapping as any)[message] || message ||
        "Gặp lỗi trong quá trình xử lí hình ảnh, bạn vui lòng chụp lại hình ảnh nhé.";
      toaster.error(msg);
      removeInspectionData();
    }
  }, [
    inspectionResult?.content?.errorMessage,
    isErrorInspection,
    removeInspectionData,
  ]);

  useEffect(() => {
    if (isDoneInspection && uploadedResponseData) {
      props.onChange({
        target: {
          name: props.id,
          value: uploadedResponseData?.content?.imageFCode,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDoneInspection, uploadedResponseData]);

  // console.log(uploading , handlingImage)
  return (
    <InputWrapper
      htmlFor={props.id as string}
      label={props.label as string}
      helperText={props.helperText as string}
      error={props.error as boolean}
      hideLabel={true}
      fullWidth={true}
    >
      <div
        className={`${classes.container} ${isErrorInspection ? classes.error : ""
          }`}
        style={{
          width: props.width || 180,
          height: props.height || 180,
        }}
      >
        {isDoneInspection && (
          <div onClick={handleRemoveImg} className={classes.removeIcon}>
            <CloseIcon fontSize="small" />
          </div>
        )}
        <div className={classes.header}>
          <Typography
            variant="h5"
            component="span"
            className={`${classes.headerText} ${isErrorInspection ? classes.error : ""
              }`}
          >
            {props.label}
          </Typography>
        </div>
        {isTakePhotoMode && (
          <div className={classes.contentContainer}>
            <img
              className={classes.img}
              src={
                props.bgSrc || "https://opes.com.vn/images/car_front_right.png"
              }
            />
          </div>
        )}

        {(uploading || handlingImage) && (
          <div className={classes.loadingWrapper}>
            <CircularProgress />
            <Typography component="p">Đang xử lý</Typography>
          </div>
        )}
        {isDoneInspection && props.value && (
          <ImageView src={`${props.domainLinkFile}/${props.value}`} />
        )}
        <>
          {isTakePhotoMode && (
            <label htmlFor={props?.id}>
              {props?.takePhotoIconComponent ? (
                <div className={classes.icon}>
                  {props?.takePhotoIconComponent}
                </div>
              ) : (
                <img
                  className={classes.icon}
                  src={
                    props?.takePhotoIconSrc ||
                    "https://opes.com.vn/images/take-photo-icon.png"
                  }
                />
              )}
            </label>
          )}
          {isErrorInspection && (
            <label htmlFor={props.id}>
              <div className={classes.loadingWrapper}>
                <CloseIcon color="error" />
                <Typography component="p">Chụp lại ảnh</Typography>
              </div>
            </label>
          )}
          <input
            id={props.id}
            onClick={(event) => {
              ((event.target as HTMLInputElement).value as string | null) =
                null;
            }}
            onChange={(e) => {
              if (e?.target?.files?.[0]) {
                handleInspecImage(e.target.files[0]);
              }
            }}
            className={classes.icon}
            hidden={true}
            type="file"
            accept="image/*"
            capture="environment"
          />
        </>
      </div>
    </InputWrapper>
  );
};

export default withTheme<ImageInspectionProps>(ImageInspection);
