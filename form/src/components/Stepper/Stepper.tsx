import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { animated, useSpring } from "react-spring";
import { makeStyles } from "@mui/styles";
import { Step, Stepper as StepperMaterial } from "@mui/material";

import withTheme from "hoc/withTheme";

import StepLabel from "./StepLabel";
import StepForm from "./StepForm";

const useStyles = makeStyles((theme) => ({
  wrapper: {},
  stepper: {
    position: "relative",
  },
  stepRoot: {
    position: "unset !important" as any,
  },
  stepAnimate: {
    position: "absolute",
    height: 7,
    backgroundColor: theme.palette.primary.main,
    zIndex: 1,
    borderRadius: 7,
    left: 8,
  },
  formWrapper: {
    marginTop: theme.spacing(20),
  },
}));

type StepperProps = {
  steps: any;
  refStepper?: any;
  defaultStepIndex?: number;
  defaultScreenIndexOfStep?: number;
  inputsWrapperClass?: string;
  useFormResult: any;
  autoNext?: boolean;
  autoBack?: boolean;
  showBackInFirstScreen?: boolean;
  loading?: boolean;
  onNext?: (
    data: any,
    currentStepIndex: number,
    currentScreenIndexOfStep: number,
    next: () => void
  ) => void;
  onBack?: (
    data: any,
    currentStepIndex: number,
    currentScreenIndexOfStep: number,
    back: () => void
  ) => void;
  seconds?: number;
  onComplete?: any;
};

const Stepper = (props: StepperProps) => {
  // props default
  const {
    defaultStepIndex = 1,
    defaultScreenIndexOfStep = 1,
    autoNext = true,
    autoBack = true,
  } = props;
  // css
  const classes = useStyles();
  // animation
  const stepRef = useRef(null);
  const [x, setX] = useState({ form: 0, to: 0 });
  const styles = useSpring({
    from: { x: x?.form || 0 },
    config: { duration: 200 },
    loop: {
      x: x?.to || 0,
    },
  });
  const [stepWidth, setStepWidth] = useState(0);
  // state step
  const [currentStepIndex, setCurrentStepIndex] = useState(defaultStepIndex);
  const [currentScreenIndexOfStep, setCurrentScreenIndexOfStep] = useState(
    defaultScreenIndexOfStep
  );

  useEffect(() => {
    setCurrentStepIndex(defaultStepIndex);
  }, [defaultStepIndex]);

  useEffect(() => {
    setStepWidth((prev) => prev || (stepRef?.current as any)?.offsetWidth);
  }, [(stepRef?.current as any)?.offsetWidth, setStepWidth]);

  useEffect(() => {
    setX({
      form: 0,
      to: (stepWidth + 16) * (defaultStepIndex - 1),
    });
  }, [setX, stepWidth, defaultStepIndex]);

  const listSteps = useMemo(
    () =>
      props.steps
        ?.filter(
          (s: any) =>
            !s?.hide && s?.screens?.filter((sc: any) => !sc?.hide)?.length > 0
        )
        ?.map((s: any) => ({
          ...s,
          screens: s?.screens?.filter((sc: any) => !sc?.hide),
        })),
    [props.steps]
  );

  const currentStep = useMemo(() => {
    return listSteps?.find((s: any, i: number) => i + 1 === currentStepIndex);
  }, [listSteps, currentStepIndex]);

  const currentListScreensOfStep = useMemo(() => {
    return currentStep?.screens;
  }, [currentStep]);

  const currentScreenOfStep = useMemo(() => {
    return currentListScreensOfStep?.find(
      (sc: any, i: number) => i + 1 === currentScreenIndexOfStep
    );
  }, [currentListScreensOfStep, currentScreenIndexOfStep]);

  const handleNext = useCallback(() => {
    let _currentStepIndex = currentStepIndex;
    let _currentScreenIndexOfStep = currentScreenIndexOfStep;

    if (currentListScreensOfStep?.length > _currentScreenIndexOfStep) {
      _currentScreenIndexOfStep = _currentScreenIndexOfStep + 1;
      setCurrentScreenIndexOfStep(_currentScreenIndexOfStep);
    } else if (listSteps?.length > _currentStepIndex) {
      _currentStepIndex = _currentStepIndex + 1;
      _currentScreenIndexOfStep = 1;
      setCurrentStepIndex(_currentStepIndex);
      setCurrentScreenIndexOfStep(_currentScreenIndexOfStep);

      setX((prev) => ({
        form: prev?.to,
        to: prev?.to + stepWidth + 16,
      }));
    }

    return {
      currentStepIndex: _currentStepIndex,
      currentScreenIndexOfStep: _currentScreenIndexOfStep,
    };
  }, [
    currentListScreensOfStep,
    currentScreenIndexOfStep,
    currentStepIndex,
    listSteps,
    setCurrentScreenIndexOfStep,
    setCurrentStepIndex,
  ]);

  const handleBack = useCallback(() => {
    let _currentStepIndex = currentStepIndex;
    let _currentScreenIndexOfStep = currentScreenIndexOfStep;

    if (
      currentListScreensOfStep?.length >= currentScreenIndexOfStep &&
      currentScreenIndexOfStep > 1
    ) {
      _currentScreenIndexOfStep = _currentScreenIndexOfStep - 1;
      setCurrentScreenIndexOfStep(_currentScreenIndexOfStep);
    } else if (listSteps?.length >= currentStepIndex && currentStepIndex > 1) {
      _currentStepIndex = _currentStepIndex - 1;
      _currentScreenIndexOfStep = listSteps?.find(
        (s: any, i: number) => i + 1 === _currentStepIndex
      )?.screens?.length;

      setCurrentStepIndex(_currentStepIndex);
      setCurrentScreenIndexOfStep(_currentScreenIndexOfStep);

      setX((prev) => ({
        form: prev?.to,
        to: prev?.to - (stepWidth + 16),
      }));
    }
  }, [
    currentListScreensOfStep,
    currentScreenIndexOfStep,
    currentStepIndex,
    listSteps,
    setCurrentScreenIndexOfStep,
    setCurrentStepIndex,
  ]);

  if (props.refStepper) {
    props.refStepper.next = handleNext;
    props.refStepper.back = handleBack;
    props.refStepper.currentStepIndex = currentStepIndex;
  }

  return (
    <div className={classes.wrapper}>
      {!!currentStep?.hideStepper &&
        !!currentStep?.customStepTitle &&
        !currentScreenOfStep?.hideStepper &&
        currentStep?.customStepTitle}
      <div style={{ position: "relative" }}>
        {!currentStep?.hideStepper && (
          <animated.div
            className={classes.stepAnimate}
            style={{
              width: stepWidth,
              ...styles,
            }}
          ></animated.div>
        )}
        <StepperMaterial
          className={classes.stepper}
          activeStep={currentStepIndex}
          alternativeLabel
          connector={<div></div>}
        >
          {listSteps?.map(
            (step: any, i: number) =>
              !step?.hideStepper &&
              !currentStep?.hideStepper && (
                <Step
                  key={`${step?.title}${i}`}
                  classes={{ root: classes.stepRoot }}
                >
                  <StepLabel
                    classes={step.classes}
                    ref={stepRef}
                    active={currentStepIndex === i + 1}
                    title={currentScreenOfStep?.title || currentStep?.title}
                  />
                </Step>
              )
          )}
        </StepperMaterial>
      </div>

      <div
        className={!currentStep?.hideStepper ? classes.formWrapper : undefined}
      >
        <StepForm
          btnBackLabel={
            currentScreenOfStep?.btnBackLabel || currentStep?.btnBackLabel
          }
          btnsWrapperClasses={
            currentStep?.btnsWrapperClasses ||
            currentScreenOfStep?.btnsWrapperClasses
          }
          inputsConfig={currentScreenOfStep?.inputsConfig}
          inputsWrapperClass={props.inputsWrapperClass}
          useFormResult={props.useFormResult}
          btnBackHide={
            props.showBackInFirstScreen ? false : currentStepIndex === 1
          }
          btnNextHide={currentScreenOfStep?.btnNextHide}
          loading={props.loading}
          onBack={(data) => {
            if (typeof props.onBack === "function") {
              props.onBack(
                data,
                currentStepIndex,
                currentScreenIndexOfStep,
                handleBack
              );
            }

            if (autoBack) {
              handleBack();
            }
          }}
          onComplete={props.onComplete}
          btnNextLabel={currentScreenOfStep?.btnNextLabel}
          seconds={props.seconds}
          onNext={(data) => {
            if (typeof props.onNext === "function") {
              props.onNext(
                data,
                currentStepIndex,
                currentScreenIndexOfStep,
                handleNext
              );
            }

            if (autoNext) {
              handleNext();
            }
          }}
        // btnBackDisabled: boolean;

        // btnNextDisbled: boolean;

        // fieldWrapperClasses={fieldWrapperClasses}
        // isLoading={isLoading}
        // setValue={setValue}
        // currentStepIndex={currentStepIndex}
        // labelNext={currentScreenOfStep?.labelNext}
        // onBack={(formik, fields) => {
        //   handleBack();

        //   if (typeof onBack === "function") {
        //     onBack(formik, fields);
        //   }
        // }}
        // nextDisabled={nextDisabled}
        // hideNext={currentScreenOfStep?.hideNext}
        // onNext={(formik, fields) => {
        //   const _errors = validate({
        //     fields,
        //     values: formik?.values,
        //   });

        //   if (Object.keys(_errors)?.length > 0) {
        //     formik?.setTouched(_errors);
        //   } else {
        //     let _currentIndex;
        //     if (autoNext) {
        //       _currentIndex = handleNext();
        //     }

        //     if (typeof onNext === "function") {
        //       onNext(
        //         formik,
        //         fields,
        //         currentStepIndex,
        //         currentScreenOfStep,
        //         handleNext
        //       );
        //     }

        //     if (
        //       currentStepIndex === listSteps?.length &&
        //       (currentStep?.screens?.length || 1) === currentScreenIndexOfStep
        //     ) {
        //       formik?.handleSubmit();
        //     }
        //   }
        // }}
        />
      </div>
    </div>
  );
};

export default withTheme<StepperProps>(Stepper);
