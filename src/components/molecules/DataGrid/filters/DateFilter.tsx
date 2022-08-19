import React, { useState, useMemo, useCallback } from "react";
import {
  Popover,
  PopoverTrigger as OrigPopoverTrigger,
  PopoverBody,
  Button,
  PopoverContent,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Flex,
  IconButton,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckIcon, ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import { dayjs } from "../../../../lib/timeUtil";

type DateRangeString = [string, string];

type Props = {
  keyId: string;
  filterValue: DataGrid.DateRange;
  searchOperator: DataGrid.DateSearchOperator;
  onApplyFilter: (
    value: DataGrid.DateRange,
    searchOperator: DataGrid.DateSearchOperator
  ) => void;
};

// chakra-ui issue
// https://github.com/chakra-ui/chakra-ui/issues/5896#issuecomment-1104085557
const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

const convertDateRangeToString = (
  filterValue?: DataGrid.DateRange
): DateRangeString => {
  if (!filterValue) {
    return ["", ""];
  }
  return [
    filterValue[0] ? dayjs(filterValue[0]).format("YYYY-MM-DD") : "",
    filterValue[1] ? dayjs(filterValue[1]).format("YYYY-MM-DD") : "",
  ];
};

const convertDateRangeStringToDate = (
  filterValue: DateRangeString
): DataGrid.DateRange => {
  return [
    filterValue[0] ? dayjs(filterValue[0]).toDate() : undefined,
    filterValue[1] ? dayjs(filterValue[1]).toDate() : undefined,
  ];
};

export default function DateFilter({
  keyId,
  filterValue,
  searchOperator,
  onApplyFilter,
}: Props) {
  const [values, setValues] = useState<DateRangeString>(
    convertDateRangeToString(filterValue)
  );
  const [operator, setOperator] =
    useState<DataGrid.DateSearchOperator>(searchOperator);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isFiltered = useMemo(() => {
    switch (searchOperator) {
      case "BETWEEN":
        return !!filterValue[0] || !!filterValue[1];
      case "EXISTS":
      case "EMPTY":
      default:
        return true;
    }
  }, [searchOperator, filterValue]);

  const hasError = useMemo(() => {
    if (!values[0] || !values[1]) return false;
    return dayjs(values[0]).isAfter(dayjs(values[1]), "day");
  }, [values]);

  const inputDisabled = useMemo(() => operator !== "BETWEEN", [operator]);

  const onChangeOperator = useCallback(
    (op: DataGrid.DateSearchOperator) => () => {
      setOperator(op);
    },
    [setOperator]
  );

  const onChangeFieldValue = useCallback(
    (dateString: string, index: 0 | 1) => {
      if (!/\d{4}-\d{2}-\d{2}/.test(dateString)) return;
      if (index === 0) {
        setValues([dateString, values[1]]);
      } else {
        setValues([values[0], dateString]);
      }
    },
    [values, setValues]
  );

  const onClearFrom = useCallback(() => {
    setValues(["", values[1]]);
  }, [values, setValues]);

  const onClearTo = useCallback(() => {
    setValues([values[0], ""]);
  }, [values, setValues]);

  const onReset = useCallback(() => {
    setValues(["", ""]);
    setOperator("BETWEEN");
    onApplyFilter(convertDateRangeStringToDate(["", ""]), "BETWEEN");
    onClose();
  }, [setValues, setOperator, onApplyFilter, onClose]);

  const onApply = useCallback(() => {
    onApplyFilter(convertDateRangeStringToDate(values), operator);
    onClose();
  }, [onApplyFilter, values, operator, onClose]);

  return (
    <Popover placement="bottom" isOpen={isOpen} onClose={onApply}>
      <PopoverTrigger>
        <Button
          id={`dateFilter-button-${keyId}`}
          colorScheme={isFiltered ? "blue" : undefined}
          rightIcon={isFiltered ? <CheckIcon /> : <ChevronDownIcon />}
          onClick={onOpen}
        >
          検索
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody p={4} fontWeight="normal">
          <FormControl>
            <RadioGroup value={operator}>
              <Flex direction="column" gap={3}>
                <Radio value="BETWEEN" onChange={onChangeOperator("BETWEEN")}>
                  日付範囲で検索
                </Radio>
                <Flex
                  ml={7}
                  pl={3}
                  direction="column"
                  borderLeftWidth={3}
                  borderLeftStyle="solid"
                  borderLeftColor={inputDisabled ? "gray.200" : "gray.400"}
                >
                  <FormLabel
                    fontSize="sm"
                    htmlFor={`dateFilter-input-0-${keyId}`}
                  >
                    開始日
                  </FormLabel>
                  <InputGroup>
                    <Input
                      id={`dateFilter-input-0-${keyId}`}
                      type="date"
                      value={values[0]}
                      disabled={inputDisabled}
                      onChange={(e) => onChangeFieldValue(e.target.value, 0)}
                    />
                    <InputRightElement>
                      <IconButton
                        id={`dateFilter-button-clear-0-${keyId}`}
                        icon={<CloseIcon />}
                        onClick={onClearFrom}
                        aria-label="クリア"
                        disabled={inputDisabled}
                      />
                    </InputRightElement>
                  </InputGroup>

                  <FormLabel
                    fontSize="sm"
                    htmlFor={`dateFilter-input-1-${keyId}`}
                    mt={2}
                  >
                    終了日
                  </FormLabel>
                  <InputGroup>
                    <Input
                      id={`dateFilter-input-1-${keyId}`}
                      type="date"
                      value={values[1]}
                      isInvalid={hasError}
                      disabled={inputDisabled}
                      onChange={(e) => onChangeFieldValue(e.target.value, 1)}
                    />
                    <InputRightElement>
                      <IconButton
                        id={`dateFilter-button-clear-1-${keyId}`}
                        icon={<CloseIcon />}
                        onClick={onClearTo}
                        aria-label="クリア"
                        disabled={inputDisabled}
                      />
                    </InputRightElement>
                  </InputGroup>
                </Flex>
                <Radio
                  value="EXISTS"
                  id={`dateFilter-radio-exists-${keyId}`}
                  onChange={onChangeOperator("EXISTS")}
                >
                  日付が入っている
                </Radio>
                <Radio
                  value="EMPTY"
                  id={`dateFilter-radio-exists-${keyId}`}
                  onChange={onChangeOperator("EMPTY")}
                >
                  日付が入っていない
                </Radio>
                <Flex mt={4} direction="row" justifyContent="space-between">
                  <Button
                    id={`dateFilter-button-reset-${keyId}`}
                    onClick={onReset}
                  >
                    リセット
                  </Button>
                  <Button
                    id={`dateFilter-button-search-${keyId}`}
                    onClick={onApply}
                    colorScheme="blue"
                  >
                    検索
                  </Button>
                </Flex>
              </Flex>
            </RadioGroup>
          </FormControl>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
