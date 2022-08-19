import { useState, useMemo, useCallback } from "react";
import { dayjs } from "../lib/timeUtil";
import { FilterProps } from "../components/DataGrid/filters";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^=!:${}()|[\]\\/]/g, "\\$&");
}

export default function useDataGrid<TRow extends DataGrid.TableRow>(
  rows: TRow[],
  columns: DataGrid.ColumnDefinition<TRow>[],
  defaultFilter?: DataGrid.FilterMap<TRow>
) {
  const [filterMap, setFilterMap] = useState<DataGrid.FilterMap<TRow>>(
    defaultFilter || new Map()
  );

  // Filterコンポーネントに渡すProps
  const filterPropsList: FilterProps[] = useMemo(() => {
    return columns.map((column) => {
      switch (column.filterType) {
        case "STRING":
          return {
            keyId: column.key,
            filterType: "STRING",
            filterValue:
              (filterMap.get(column.key)?.value as string | undefined) || "",
            searchOperator:
              (filterMap.get(column.key)?.searchOperator as
                | DataGrid.StringSearchOperator
                | undefined) || "CONTAINS",
            onApplyFilter: (
              value: string,
              searchOperator: DataGrid.StringSearchOperator
            ) =>
              setFilterMap(
                new Map(filterMap).set(column.key, {
                  filterType: "STRING",
                  value,
                  searchOperator,
                })
              ),
          };
        case "SELECT":
          return {
            keyId: column.key,
            filterType: "SELECT",
            filterModel: column.filterModel,
            filterValue:
              (filterMap.get(column.key)?.value as string[] | undefined) || [],
            onApplyFilter: (value: string[]) =>
              setFilterMap(
                new Map(filterMap).set(column.key, {
                  filterType: "SELECT",
                  value,
                })
              ),
          };
        case "DATE":
          return {
            keyId: column.key,
            filterType: "DATE",
            filterValue: (filterMap.get(column.key)?.value as
              | DataGrid.DateRange
              | undefined) || [undefined, undefined],
            searchOperator:
              (filterMap.get(column.key)?.searchOperator as
                | DataGrid.DateSearchOperator
                | undefined) || "BETWEEN",
            onApplyFilter: (
              value: DataGrid.DateRange,
              searchOperator: DataGrid.DateSearchOperator
            ) =>
              setFilterMap(
                new Map(filterMap).set(column.key, {
                  filterType: "DATE",
                  value,
                  searchOperator,
                })
              ),
          };
        case "NONE":
        default:
          return {
            keyId: column.key,
            filterType: "NONE",
          };
      }
    });
  }, [columns, filterMap, setFilterMap]);

  // 実際に検索を行う関数
  const filterFunction = useCallback(
    (row: TRow) => {
      return Array.from(filterMap.entries()).every(([key, filterValue]) => {
        switch (filterValue.filterType) {
          // 文字列検索
          case "STRING": {
            const { value, searchOperator } = filterValue;
            switch (searchOperator) {
              case "CONTAINS":
                return new RegExp(escapeRegExp(value)).test(row[key] as string);
              case "EXISTS":
                return !!row[key];
              case "EMPTY":
                return !row[key];
              default:
                return true;
            }
          }
          // 選択検索
          case "SELECT": {
            const { value } = filterValue;
            if (!value.length) {
              return true;
            }
            return value.includes(row[key] as string);
          }

          // 日付検索
          case "DATE": {
            const { value, searchOperator } = filterValue;
            switch (searchOperator) {
              case "BETWEEN": {
                if (value[0] instanceof Date || value[1] instanceof Date) {
                  const isFrom =
                    value[0] instanceof Date
                      ? dayjs(value[0]).isSameOrBefore(
                          dayjs(row[key] as Date),
                          "day"
                        )
                      : true;
                  const isTo =
                    value[1] instanceof Date
                      ? dayjs(value[1]).isSameOrAfter(
                          dayjs(row[key] as Date),
                          "day"
                        )
                      : true;
                  return isFrom && isTo;
                }
                return true;
              }

              case "EXISTS":
                return !!row[key];
              case "EMPTY":
                return !row[key];
              default:
                return true;
            }
          }
          default:
            return true;
        }
      });
    },
    [filterMap]
  );

  const filteredRows = useMemo(() => {
    return rows.filter((row) => filterFunction(row));
  }, [rows, filterFunction]);

  return {
    filterPropsList,
    filteredRows,
    filterMap,
  };
}
