import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import DataGridSample from "../../../src/components/organisms/DataGridSample";

import { generateRows } from "../../../src/lib/sampleData";

export default {
  title: "organisms/DataGridSample",
  component: DataGridSample,
  args: {
    records: generateRows(1000),
  },
} as ComponentMeta<typeof DataGridSample>;

const Template: ComponentStory<typeof DataGridSample> = (args) => (
  <DataGridSample {...args} />
);

export const Basic = Template.bind({});
