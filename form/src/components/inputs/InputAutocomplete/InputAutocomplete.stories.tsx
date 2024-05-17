import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";

import InputAutocomplete from "./InputAutocomplete";
import AutocompleteOptionStartIcon from "./autocompleteOptions/AutocompleteOptionStartIcon";

export default {
  title: "components/inputs/InputAutocomplete",
  component: InputAutocomplete,
  argTypes: {
    onChange: {},
  },
} as ComponentMeta<typeof InputAutocomplete>;

const Template: ComponentStory<typeof InputAutocomplete> = (args) => (
  <InputAutocomplete {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "label",
  options: [
    { label: "The Shawshank Redemption", value: 1999 },
    { label: "The Godfather", value: 1972 },
    { label: "The Godfather: Part II", value: 1974 },
    { label: "The Dark Knight", value: 2008 },
    { label: "12 Angry Men", value: 1957 },
    { label: "Schindler's List", value: 1993 },
    { label: "Pulp Fiction", value: 1994 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  defaultValue: 1974,
};

export const FreeSolo = Template.bind({});
FreeSolo.args = {
  id: "label",
  options: [
    { label: "The Shawshank Redemption", value: 1999 },
    { label: "The Godfather", value: 1972 },
    { label: "The Godfather: Part II", value: 1974 },
    { label: "The Dark Knight", value: 2008 },
    { label: "12 Angry Men", value: 1957 },
    { label: "Schindler's List", value: 1993 },
    { label: "Pulp Fiction", value: 1994 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  freeSolo: true,
};

export const Group = Template.bind({});
Group.args = {
  id: "label",
  options: [
    { label: "The Shawshank Redemption", value: 1999 },
    { label: "The Godfather", value: 1972 },
    { label: "The Godfather: Part II", value: 1974 },
    { label: "The Dark Knight", value: 2008 },
    { label: "12 Angry Men", value: 1957 },
    { label: "Schindler's List", value: 1993 },
    { label: "Pulp Fiction", value: 1994 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  group: true,
};

export const Multiple = Template.bind({});
Multiple.args = {
  id: "label",
  options: [
    { label: "The Shawshank Redemption", value: 1999 },
    { label: "The Godfather", value: 1972 },
    { label: "The Godfather: Part II", value: 1974 },
    { label: "The Dark Knight", value: 2008 },
    { label: "12 Angry Men", value: 1957 },
    { label: "Schindler's List", value: 1993 },
    { label: "Pulp Fiction", value: 1994 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  multiple: true,
};

export const MultipleFreeSolo = Template.bind({});
MultipleFreeSolo.args = {
  id: "label",
  options: [
    { label: "The Shawshank Redemption", value: 1999 },
    { label: "The Godfather", value: 1972 },
    { label: "The Godfather: Part II", value: 1974 },
    { label: "The Dark Knight", value: 2008 },
    { label: "12 Angry Men", value: 1957 },
    { label: "Schindler's List", value: 1993 },
    { label: "Pulp Fiction", value: 1994 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  multiple: true,
  freeSolo: true,
};

export const Filter = Template.bind({});
Filter.args = {
  id: "label",
  options: [
    { label: "The Shawshank Redemption", value: 1999 },
    { label: "The Godfather", value: 1972 },
    { label: "The Godfather: Part II", value: 1974 },
    { label: "The Dark Knight", value: 2008 },
    { label: "12 Angry Men", value: 1957 },
    { label: "Schindler's List", value: 1993 },
    { label: "Pulp Fiction", value: 1994 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  multiple: true,
  freeSolo: true,
  filterSelectedOptions: true,
  onClickChip: () => {
    console.log(123);
  },
};

export const Fixed = Template.bind({});
Fixed.args = {
  id: "label",
  options: [
    { label: "The Shawshank Redemption", value: 1999, fixed: true },
    { label: "The Godfather", value: 1972 },
    { label: "The Godfather: Part II", value: 1974 },
    { label: "The Dark Knight", value: 2008 },
    { label: "12 Angry Men", value: 1957 },
    { label: "Schindler's List", value: 1993 },
    { label: "Pulp Fiction", value: 1994 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  multiple: true,
  freeSolo: true,
  filterSelectedOptions: true,
};

export const Checkbox = Template.bind({});
Checkbox.args = {
  id: "label",
  options: [
    { label: "The Shawshank Redemption", value: 1999 },
    { label: "The Godfather", value: 1972 },
    { label: "The Godfather: Part II", value: 1974 },
    { label: "The Dark Knight", value: 2008 },
    { label: "12 Angry Men", value: 1957 },
    { label: "Schindler's List", value: 1993 },
    { label: "Pulp Fiction", value: 1994 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  multiple: true,
  freeSolo: true,
  filterSelectedOptions: false,
  checkbox: true,
  group: true,
};

export const LimitTags = Template.bind({});
LimitTags.args = {
  id: "label",
  options: [
    { label: "The Shawshank Redemption", value: 1999 },
    { label: "The Godfather", value: 1972 },
    { label: "The Godfather: Part II", value: 1974 },
    { label: "The Dark Knight", value: 2008 },
    { label: "12 Angry Men", value: 1957 },
    { label: "Schindler's List", value: 1993 },
    { label: "Pulp Fiction", value: 1994 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  multiple: true,
  freeSolo: true,
  filterSelectedOptions: false,
  checkbox: true,
  group: true,
  limitTags: 2,
};

export const DisabledOption = Template.bind({});
DisabledOption.args = {
  id: "label",
  options: [
    { label: "The Shawshank Redemption", value: 1999 },
    { label: "The Godfather", value: 1972, disabled: true },
    { label: "The Godfather: Part II", value: 1974 },
    { label: "The Dark Knight", value: 2008 },
    { label: "12 Angry Men", value: 1957 },
    { label: "Schindler's List", value: 1993 },
    { label: "Pulp Fiction", value: 1994 },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  defaultValue: 1974,
};

export const OptionStartIcon = Template.bind({});
OptionStartIcon.args = {
  id: "label",
  options: [
    {
      label: "The Shawshank Redemption",
      value: 1994,
      icon: <LocalMoviesIcon />,
    },
    { label: "The Godfather", value: 1972, icon: <LocalMoviesIcon /> },
    { label: "The Godfather: Part II", value: 1974, icon: <LocalMoviesIcon /> },
    { label: "The Dark Knight", value: 2008, icon: <LocalMoviesIcon /> },
    { label: "12 Angry Men", value: 1957, icon: <LocalMoviesIcon /> },
    { label: "Schindler's List", value: 1993, icon: <LocalMoviesIcon /> },
    { label: "Pulp Fiction", value: 1994, icon: <LocalMoviesIcon /> },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  defaultValue: 1974,
  optionCustom: <AutocompleteOptionStartIcon />,
};

export const OptionStartIconGroup = Template.bind({});
OptionStartIconGroup.args = {
  id: "label",
  options: [
    {
      label: "The Shawshank Redemption",
      value: 1994,
      icon: <LocalMoviesIcon />,
    },
    { label: "Ơulp Fiction", value: 1995, icon: <LocalMoviesIcon /> },
    { label: "The Godfather", value: 1972, icon: <LocalMoviesIcon /> },
    { label: "The Godfather: Part II", value: 1974, icon: <LocalMoviesIcon /> },
    { label: "The Dark Knight", value: 2008, icon: <LocalMoviesIcon /> },
    { label: "Ôulp Fiction", value: 1994, icon: <LocalMoviesIcon /> },
    { label: "12 Angry Men", value: 1957, icon: <LocalMoviesIcon /> },
    { label: "Schindler's List", value: 1993, icon: <LocalMoviesIcon /> },
    { label: "Oulp Fiction", value: 1995, icon: <LocalMoviesIcon /> },
  ],
  label: "Label",
  helperText: "Label helper",
  error: false,
  disabled: false,
  optionCustom: <AutocompleteOptionStartIcon />,
  group: true,
};
