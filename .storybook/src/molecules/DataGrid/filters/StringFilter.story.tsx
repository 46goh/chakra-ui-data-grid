import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import SelectFilter from "../../../../../src/components/molecules/DataGrid/filters/SelectFilter";

export default {
  title: "molecules/DataGrid/filters/SelectFilter",
  component: SelectFilter,
  args: {
    keyId: "selectFilterStory",
    filterModel: ["選択肢1", "選択肢2", "選択肢3", "選択肢4", "選択肢5", ""],
    filterValue: [],
    onApplyFilter: action("onApplyFilter"),
  },
} as ComponentMeta<typeof SelectFilter>;

const Template: ComponentStory<typeof SelectFilter> = (args) => (
  <SelectFilter {...args} />
);

export const Basic = Template.bind({});

export const Filtered = Template.bind({});
Filtered.args = {
  filterValue: ["選択肢1", "選択肢2"],
};
