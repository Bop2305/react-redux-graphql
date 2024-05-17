import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import vi from "dayjs/locale/vi";

import withTheme from "hoc/withTheme";

import InputWrapper from "../InputWrapper";

const useStyles = makeStyles((theme) => ({
  disabled: {
    backgroundColor: theme.palette.action.disabledBackground,
    borderRadius: theme.spacing(1),
  },
}));

type InputDateTimeProps = {
  id: string;
  label?: string;
  hideLabel?: boolean;
  helperText?: string;
  error?: boolean;
  value: any;
  disabled?: boolean;
  onChange: any;
  minDate: any;
  maxDate: any;
  openTo?: "day" | "year";
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  required?: boolean;
};

function CustomAdapter(options: any) {
  const adapter = new AdapterDayjs(options);

  return {
    ...adapter,
    getWeekdays() {
      // Feel free to replace this with your custom value
      // e.g const customWeekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
      const customWeekdays = adapter.getWeekdays();
      return customWeekdays.map((day) => ({ charAt: () => day }));
    },
  };
}

const InputDateTime = (props: InputDateTimeProps) => {
  const classes = useStyles();
  const [valueState, setValueState] = useState(props.value || null);

  useEffect(() => {
    setValueState(props.value || null);
  }, [props.value, setValueState]);

  return (
    <InputWrapper
      htmlFor={props.id}
      label={props.label}
      hideLabel={props.hideLabel}
      helperText={props.helperText}
      error={props.error}
      required={props.required}
    >
      <LocalizationProvider
        dateAdapter={CustomAdapter as any}
        adapterLocale={vi}
      >
        <DateTimePicker
          label={"Chọn ngày"}
          value={valueState ? dayjs(valueState) : null}
          disabled={props.disabled}
          onChange={(newValue) => {
            setValueState(newValue);
            props.onChange({
              target: {
                name: props.id,
                value: newValue ? dayjs(newValue).toDate() : undefined,
              },
            });
          }}
          closeOnSelect={false}
          openTo={props.openTo || "day"}
          minDate={props.minDate ? dayjs(props.minDate) : undefined}
          maxDate={props.maxDate ? dayjs(props.maxDate) : undefined}
          inputFormat="DD/MM/YYYY HH:mm"
          views={
            props.openTo === "year"
              ? ["year", "month", "day", "hours", "minutes"]
              : ["day", "hours", "minutes"]
          }
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label={""}
              id={props.id}
              name={props.id}
              classes={{ root: props.disabled ? classes.disabled : undefined }}
              fullWidth={true}
              onBlur={props.onBlur}
              onFocus={props.onFocus}
              error={props.error}
            />
          )}
        />
      </LocalizationProvider>
    </InputWrapper>
  );
};

export default withTheme<InputDateTimeProps>(InputDateTime);
