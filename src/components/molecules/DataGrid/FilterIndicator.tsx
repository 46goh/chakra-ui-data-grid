import { useMemo } from "react";
import {
  Popover,
  PopoverTrigger as OrigPopoverTrigger,
  Button,
  PopoverContent,
  PopoverBody,
  Flex,
  Tag,
  Box,
} from "@chakra-ui/react";
import { Search2Icon, ChevronDownIcon } from "@chakra-ui/icons";
import { dayjs } from "../../../lib/timeUtil";

// chakra-ui issue
// https://github.com/chakra-ui/chakra-ui/issues/5896#issuecomment-1104085557
const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

type Props<T extends DataGrid.TableRow> = {
  columns: DataGrid.ColumnDefinition<T>[];
  filterMap: DataGrid.FilterMap<T>;
};

export default function FilterIndicator<T extends DataGrid.TableRow>({
  columns,
  filterMap,
}: Props<T>) {
  const filters = useMemo(() => {
    return Array.from(filterMap.entries())
      .map(([key, filterValue]) => {
        const columnLabel: string =
          columns.find((column) => column.key === key)?.label || "";
        switch (filterValue.filterType) {
          case "STRING": {
            const { value, searchOperator } = filterValue;
            switch (searchOperator) {
              case "CONTAINS":
                return {
                  title: columnLabel,
                  value: value ? `"${value}"を含む` : "",
                };
              case "EXISTS":
                return {
                  title: columnLabel,
                  value: "値が入っている",
                };
              case "EMPTY":
                return {
                  title: columnLabel,
                  value: "値が空である",
                };
              default:
                return {
                  title: columnLabel,
                  value: "",
                };
            }
          }
          case "SELECT": {
            const { value } = filterValue;
            if (!value.length) {
              return {
                title: columnLabel,
                value: "",
              };
            }
            return {
              title: columnLabel,
              value: value.map((v) => (v === "" ? "(なし)" : v)).join(","),
            };
          }
          case "DATE": {
            const { value, searchOperator } = filterValue;
            switch (searchOperator) {
              case "BETWEEN": {
                if (value[0] instanceof Date || value[1] instanceof Date) {
                  const from =
                    value[0] instanceof Date
                      ? dayjs(value[0]).format("YYYY/MM/DD")
                      : "";
                  const to =
                    value[1] instanceof Date
                      ? dayjs(value[1]).format("YYYY/MM/DD")
                      : "";
                  if (!from && !to) {
                    return {
                      title: columnLabel,
                      value: "",
                    };
                  }
                  return {
                    title: columnLabel,
                    value: `${from}〜${to}`,
                  };
                }
                return {
                  title: columnLabel,
                  value: "",
                };
              }

              case "EXISTS":
                return {
                  title: columnLabel,
                  value: "日付が入っている",
                };
              case "EMPTY":
                return {
                  title: columnLabel,
                  value: "日付が入っていない",
                };
              default:
                return {
                  title: columnLabel,
                  value: "",
                };
            }
          }
          default:
            return {
              title: columnLabel,
              value: "",
            };
        }
      })
      .filter((v) => !!v.value);
  }, [columns, filterMap]);
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button
          size="sm"
          leftIcon={<Search2Icon />}
          rightIcon={<ChevronDownIcon />}
          disabled={filters.length === 0}
        >
          検索条件を見る
          {filters.length > 0 && `(${filters.length})`}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Flex direction="column" gap={2}>
            {filters.map((filter) => (
              <Box key={filter.title}>
                <Tag mr={2}>{filter.title}</Tag>
                {filter.value}
              </Box>
            ))}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
