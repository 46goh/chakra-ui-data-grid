import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DateFilter from "../../../../src/components/DataGrid/filters/DateFilter";
import { dayjs } from "../../../../src/lib/timeUtil";

export default {
  title: "DataGrid/filters/DateFilter",
  component: DateFilter,
  args: {
    keyId: "dateFilterStory",
    filterValue: [undefined, undefined],
    searchOperator: "BETWEEN",
    onApplyFilter: action("onApplyFilter"),
  },
} as ComponentMeta<typeof DateFilter>;

const Template: ComponentStory<typeof DateFilter> = (args) => (
  <DateFilter {...args} />
);

export const Basic = Template.bind({});

export const Filtered = Template.bind({});
Filtered.args = {
  searchOperator: "BETWEEN",
  filterValue: [dayjs("2022-07-01").toDate(), dayjs("2022-07-31").toDate()],
};
