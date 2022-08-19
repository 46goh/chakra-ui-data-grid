import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { columns } from "./testData";

import FilterIndicator from "../../../src/components/DataGrid/FilterIndicator";

export default {
  title: "DataGrid/filters/FilterIndicator",
  component: FilterIndicator,
  args: {
    columns,
    filterMap: new Map()
      .set("name", {
        filterType: "STRING",
        value: "佐藤",
        searchOperator: "CONTAINS",
      })
      .set("remarks", {
        filterType: "STRING",
        value: "備考",
        searchOperator: "EXISTS",
      })
      .set("status", {
        filterType: "SELECT",
        value: ["契約前", "契約処理中"],
      })
      .set("health", {
        filterType: "SELECT",
        value: [""],
      })
      .set("createdAt", {
        filterType: "DATE",
        value: [new Date(2022, 7, 1), undefined],
        searchOperator: "BETWEEN",
      })
      .set("updatedAt", {
        filterType: "DATE",
        value: [undefined, undefined],
        searchOperator: "EMPTY",
      }),
  },
} as ComponentMeta<typeof FilterIndicator>;

const Template: ComponentStory<typeof FilterIndicator> = (args) => (
  <FilterIndicator {...args} />
);

export const Basic = Template.bind({});

export const NotFiltered = Template.bind({});
NotFiltered.args = {
  filterMap: new Map(),
};
