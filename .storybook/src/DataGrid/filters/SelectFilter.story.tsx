import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import StringFilter from "../../../../src/components/DataGrid/filters/StringFilter";

export default {
  title: "DataGrid/filters/StringFilter",
  component: StringFilter,
  args: {
    keyId: "stringFilterStory",
    filterValue: "",
    searchOperator: "CONTAINS",
    onApplyFilter: action("onApplyFilter"),
  },
} as ComponentMeta<typeof StringFilter>;

const Template: ComponentStory<typeof StringFilter> = (args) => (
  <StringFilter {...args} />
);

export const Basic = Template.bind({});

export const Filtered = Template.bind({});
Filtered.args = {
  searchOperator: "CONTAINS",
  filterValue: "検索文字列",
};
