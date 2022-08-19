/* eslint-env node */
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DataGrid from "../../../src/components/DataGrid";
import useDataGrid from "../../../src/hooks/useDataGrid";

import { generateRows, columns } from "./testData";

const rows = generateRows(10000);

export default {
  title: "DataGrid/main",
  component: DataGrid,
  args: {
    height: "100vh",
    columns,
    rows,
  },
} as ComponentMeta<typeof DataGrid>;

const Template: ComponentStory<typeof DataGrid> = (props) => (
  <DataGrid {...props} />
);

export const Basic = Template.bind({});

export const WithOnClick = Template.bind({});
WithOnClick.args = {
  onClickRow: action("onClickRow"),
};

export const NoData = Template.bind({});
NoData.args = {
  rows: [],
  onClickRow: action("onClickRow"),
};

export const Filtered = () => {
  const { filterPropsList, filteredRows } = useDataGrid(
    rows,
    columns,
    new Map()
  );

  return (
    <DataGrid
      height={"100vh"}
      columns={columns}
      rows={filteredRows}
      filterPropsList={filterPropsList}
    />
  );
};

export const FilteredAndOnClick = () => {
  const { filterPropsList, filteredRows } = useDataGrid(
    rows,
    columns,
    new Map()
  );

  return (
    <DataGrid
      height={"100vh"}
      columns={columns}
      rows={filteredRows}
      filterPropsList={filterPropsList}
      onClickRow={action("onClickRow")}
    />
  );
};

export const FilteredAndNoData = () => {
  const { filterPropsList } = useDataGrid([], columns, new Map());

  return (
    <DataGrid
      height={"100vh"}
      columns={columns}
      rows={[]}
      filterPropsList={filterPropsList}
    />
  );
};
