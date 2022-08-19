import { useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

import DataGrid from "../molecules/DataGrid";
import FilterCount from "../molecules/DataGrid/FilterCount";
import FilterIndicator from "../molecules/DataGrid/FilterIndicator";
import CSVDownloadButton from "../molecules/CSVDownloadButton";
import DetailDrawer from "../molecules/DataGrid/DetailDrawer";

import useDataGrid from "../../hooks/useDataGrid";
import useCsvDownload from "../../hooks/useCsvDownload";

import { SampleObject, columns } from "../../lib/sampleData";

type Props = {
  records: SampleObject[];
};

export default function DataGridSample({ records }: Props) {
  const [selectedData, setSelectedData] = useState<SampleObject | undefined>(
    undefined
  );
  const { filterPropsList, filteredRows, filterMap } = useDataGrid(
    records,
    columns
  );
  const downloadCsv = useCsvDownload("userlist", columns, filteredRows);
  return (
    <Flex direction="column" gap={4}>
      <Heading as="h2">ユーザ一覧</Heading>
      <Flex direction="row" justifyContent="space-between">
        <FilterCount
          currentLength={filteredRows.length}
          maxLength={records.length}
        />
        <Flex flexGrow={1} justifyContent="flex-end" gap={4}>
          <FilterIndicator columns={columns} filterMap={filterMap} />
          <CSVDownloadButton
            onCsvDownload={downloadCsv}
            disabled={!filteredRows.length}
          />
        </Flex>
      </Flex>

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
