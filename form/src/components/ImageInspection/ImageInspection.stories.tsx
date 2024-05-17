import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ImageInspection from "./ImageInspection";

const queryClient = new QueryClient();

type ImageInspectionWrapperProps = {
  id: string;
  label: string;
  helperText: string;
  error: boolean;
  poolId: string;
  orderId: string;
  tag: string;
  takePhotoIconSrc: string;
  takePhotoIconComponent: React.ReactNode;
  bgSrc: string;
  onChange: any;
  width: string | number;
  height: string | number;
  value: string;
  carInspectionSubmitImage: any;
  getCarInspectionResult: any;
  domainLinkFile: String;
};

const ImageInspectionWrapper = (props: ImageInspectionWrapperProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ImageInspection {...props} />
    </QueryClientProvider>
  );
};

export default {
  title: "components/ImageInspection",
  component: ImageInspectionWrapper,
  argTypes: {
    onChange: {},
    onClick: {},
  },
} as ComponentMeta<typeof ImageInspectionWrapper>;

const Template: ComponentStory<typeof ImageInspectionWrapper> = (args) => (
  <ImageInspectionWrapper {...args} />
);

export const Default = Template.bind({});
Default.args = {
  id: "label",
  label: "Label",
  helperText: "Label helper",
  error: false,
};
