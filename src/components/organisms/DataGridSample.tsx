import { useMemo, useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

import DataGrid from "../molecules/DataGrid";
import FilterIndicator from "../molecules/DataGrid/FilterIndicator";
import { SampleObject, generateRows, columns } from "../../lib/sampleData";
import useDataGrid from "../../hooks/useDataGrid";
import DetailDrawer from "../molecules/DataGrid/DetailDrawer";

export default function DataGridSample() {
  const rows = useMemo(() => generateRows(1000), []);
  const [selectedData, setSelectedData] = useState<SampleObject | undefined>(
    undefined
  );
  const { filterPropsList, filteredRows, filterMap } = useDataGrid(
    rows,
    columns
  );
  return (
    <Flex direction="column" gap={4} alignItems="flex-start">
      <Heading as="h2">ユーザ一覧</Heading>
      <FilterIndicator columns={columns} filterMap={filterMap} />
      <Box width="full" overflowX="scroll" wordBreak="keep-all">
        <DataGrid<SampleObject>
          height="calc(100vh - 200px)"
          rows={filteredRows}
          columns={columns}
          filterPropsList={filterPropsList}
          onClickRow={(row) => setSelectedData(row)}
        />
        <DetailDrawer
          isOpen={!!selectedData}
          onClose={() => setSelectedData(undefined)}
          columns={columns}
          title="ユーザ詳細"
          subTitleKey="name"
          selectedRow={selectedData}
        />
      </Box>
    </Flex>
  );
}
