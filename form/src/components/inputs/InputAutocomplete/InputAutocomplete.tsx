import React, { useMemo } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { makeStyles } from "@mui/styles";
import {
  Autocomplete,
  TextField,
  Chip,
  Checkbox,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import withTheme from "hoc/withTheme";

import InputWrapper from "../InputWrapper";

const useStyles = makeStyles((theme) => ({
  disabled: {
    backgroundColor: theme.palette.action.disabledBackground,
    borderRadius: theme.spacing(1),
  },
}));

type InputAutocompleteProps = {
  id: string;
  label?: string;
  hideLabel?: boolean;
  helperText?: string;
  error?: boolean;
  options: {
    group?: string;
    label: string;
    value: string | number;
    disabled?: boolean;
    fixed?: boolean;
    [key: string]: any;
  }[];
  limitTags?: number;
  freeSolo?: boolean;
  disabled?: boolean;
  value: string | number | Array<string | number>;
  defaultValue: string | number | Array<string | number>;
  onChange: any;
  optionCustom?: React.ReactElement;
  group?: boolean;
  multiple?: boolean;
  filterSelectedOptions?: boolean;
  checkbox?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  required?: boolean;
  loading?: boolean;
  onClickChip?: any;
};

const InputAutocomplete = (props: InputAutocompleteProps) => {
  const classes = useStyles();

  const options = useMemo(
    () =>
      !props.group
        ? props.options
        : props.options
            ?.map((op) => {
              const group = op.label[0].toUpperCase();
              return {
                group: /[0-9]/.test(group) ? "0-9" : group,
                ...op,
              };
            })
            ?.sort((a, b) => -b.group.localeCompare(a.group)),
    [props.group, props.options]
  );

  return (
    <InputWrapper
      htmlFor={props.id}
      label={props.label}
      hideLabel={props.hideLabel}
      helperText={props.helperText}
      error={props.error}
      required={props.required}
    >
      <Autocomplete
        id={props.id}
        loading={props.loading}
        filterSelectedOptions={props.filterSelectedOptions}
        options={options}
        limitTags={props.limitTags}
        groupBy={(op: any) => op.group}
        getOptionLabel={(op: any) =>
          typeof op === "object" ? op?.label?.toString() : op
        }
        value={(() => {
          if (props.multiple) {
            const _optionsSelected = Array.isArray(props.value)
              ? (props.value as Array<string | number>)?.map((v) =>
                  options?.find((op) => op?.value === v && !op?.fixed)
                )
              : undefined;

            return _optionsSelected
              ? [...options?.filter((op) => op?.fixed), ..._optionsSelected]
              : undefined;
          } else {
            return options?.find((op) => op?.value === props.value) || null;
          }
        })()}
        defaultValue={(() => {
          if (props.multiple) {
            const _optionsSelected = Array.isArray(props.defaultValue)
              ? (props.defaultValue as Array<string | number>)?.map((v) =>
                  options?.find((op) => op?.value === v && !op?.fixed)
                )
              : undefined;

            return _optionsSelected
              ? [...options?.filter((op) => op?.fixed), ..._optionsSelected]
              : undefined;
          } else {
            return options?.find((op) => op?.value === props.defaultValue);
          }
        })()}
        multiple={props.multiple}
        isOptionEqualToValue={(op: any, v) => {
          const opLabel = typeof op === "object" ? op?.value : op;
          const vLabel = typeof v === "object" ? v?.value : v;
          return opLabel === vLabel;
        }}
        renderTags={(value: readonly string[], getTagProps) => {
          return value.map((op: any, index: number) => {
            return (
              <Chip
                onClick={() => props.onClickChip(op)}
                style={{ margin: 2 }}
                size="small"
                label={typeof op === "object" ? op?.label : op}
                {...getTagProps({ index })}
                disabled={
                  props.disabled
                    ? true
                    : typeof op === "object"
                    ? op?.fixed
                    : false
                  //
                }
              />
            );
          });
        }}
        onChange={(e, v) => {
          let _value;

          if (props.multiple) {
            _value = v?.map((v: any) => (typeof v === "object" ? v?.value : v));
          } else {
            _value = typeof v === "object" ? v?.value : v;
          }

          props.onChange({
            target: {
              name: props.id,
              value: _value,
            },
          });
        }}
        freeSolo={props.freeSolo}
        disabled={props.disabled}
        getOptionDisabled={(op) => op?.disabled as boolean}
        ListboxProps={{
          style: {
            maxHeight: 300,
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            id={props.id}
            name={props.id}
            classes={{ root: props.disabled ? classes.disabled : undefined }}
            fullWidth={true}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            error={props.error}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {props.loading ? (
                    <CircularProgress
                      color="primary"
                      size={20}
                      sx={{ marginRight: 1 }}
                    />
                  ) : (
                    params.InputProps.endAdornment
                  )}
                </React.Fragment>
              ),
            }}
          />
        )}
        disableCloseOnSelect={props.checkbox}
        renderOption={(_props, option, { inputValue, selected }) => {
          const matches = match(option?.label, inputValue, {
            insideWords: true,
          });
          const parts = parse(option?.label, matches);

          return (
            <li {..._props}>
              {props.checkbox && (
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
              )}
              {React.isValidElement(props.optionCustom) ? (
                React.cloneElement(props.optionCustom, {
                  option: option,
                  label: (
                    <div>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{
                            fontWeight: part.highlight ? 500 : 400,
                          }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  ),
                } as { label: JSX.Element })
              ) : (
                <div>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 500 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              )}
            </li>
          );
        }}
      />
    </InputWrapper>
  );
};

export default withTheme<InputAutocompleteProps>(InputAutocomplete);
