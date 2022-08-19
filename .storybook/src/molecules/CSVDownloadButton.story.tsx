import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import CSVDownloadButton from "../../../src/components/molecules/CSVDownloadButton";

export default {
  title: "molecules/CSVDownloadButton",
  component: CSVDownloadButton,
  args: {
    onCsvDownload: async (...args) => action("onCsvDownload")(args),
  },
} as ComponentMeta<typeof CSVDownloadButton>;

const Template: ComponentStory<typeof CSVDownloadButton> = (args) => (
  <CSVDownloadButton {...args} />
);

export const Basic = Template.bind({});
