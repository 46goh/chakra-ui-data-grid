import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { columns } from "../../../../src/lib/sampleData";

import FilterCount from "../../../../src/components/molecules/DataGrid/FilterCount";

export default {
  title: "molecules/DataGrid/FilterCount",
  component: FilterCount,
  args: {
    currentLength: 15,
    maxLength: 120,
  },
} as ComponentMeta<typeof FilterCount>;

const Template: ComponentStory<typeof FilterCount> = (args) => (
  <FilterCount {...args} />
);

export const Basic = Template.bind({});
