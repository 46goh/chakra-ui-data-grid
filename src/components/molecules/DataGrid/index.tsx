import { forwardRef } from "react";
import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Button,
  BoxProps,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { TableVirtuoso } from "react-virtuoso";

import Filter, { FilterProps } from "./filters";

import { toStringValue } from "../../../lib/stringUtil";

type Props<T extends DataGrid.TableRow> = {
  columns: DataGrid.ColumnDefinition<T>[];
  rows: T[];
  filterPropsList?: FilterProps[];
  height: BoxProps["height"]; // heightの指定は必須
  onClickRow?: (row: T) => void;
} & Omit<BoxProps, "height">;

export default function DataGrid<TRow extends DataGrid.TableRow>({
  columns,
  rows,
  filterPropsList,
  height,
  onClickRow,
  ...boxProps
}: Props<TRow>) {
  return (
    <Box {...boxProps} height={height}>
      <TableVirtuoso<TRow>
        data={rows}
        style={{ height: "100%" }}
        totalCount={rows.length}
        components={{
          Table: (props) => <Table {...props} size="sm" />,
          TableHead: forwardRef(function TableHead(props, ref) {
            return <Thead {...props} backgroundColor="white" ref={ref} />;
          }),
          TableRow: Tr,
          TableBody: Tbody,
        }}
        fixedHeaderContent={() => (
          <>
            <Tr>
              {onClickRow && (
                <Th
                  w="100px"
                  borderBottomWidth={0}
                  position="sticky"
                  left={0}
                  backgroundColor="white"
                >
                  詳細
                </Th>
              )}
              {columns.map((column) => (
                // borderBottomの隙間からテーブルが透けて見えるのを防止するため、borderBottomをなくす
                <Th key={column.key} borderBottomWidth={0}>
                  <Text>{column.label}</Text>
                </Th>
              ))}
            </Tr>
            {filterPropsList && (
              <Tr>
                {onClickRow && (
                  <Th
                    position="sticky"
                    left={0}
                    backgroundColor="white"
                    zIndex="sticky"
                  ></Th>
                )}
                {filterPropsList.map((filterProps) => (
                  <Th key={filterProps.keyId}>
                    <Filter {...filterProps} />
                  </Th>
                ))}
              </Tr>
            )}
            {rows.length === 0 && (
              <Tr>
                <Td
                  position="sticky"
                  left={0}
                  backgroundColor="white"
                  colSpan={columns.length + (onClickRow ? 1 : 0)}
                >
                  <Text position="sticky" left={4} as="i">
                    データがありません
                  </Text>
                </Td>
              </Tr>
            )}
          </>
        )}
        itemContent={(_index, row) => {
          return (
            <>
              {onClickRow && (
                <Td
                  position="sticky"
                  w="100px"
                  left={0}
                  backgroundColor="white"
                >
                  <Button
                    size="sm"
                    bgColor="white"
                    variant="outline"
                    onClick={() => onClickRow(row)}
                    rightIcon={<ChevronRightIcon />}
                  >
                    詳細
                  </Button>
                </Td>
              )}
              {columns.map((column) => (
                <Td key={column.key} w={column.width}>
                  <Text w={column.width}>{toStringValue(row[column.key])}</Text>
                </Td>
              ))}
            </>
          );
        }}
      />
    </Box>
  );
}
