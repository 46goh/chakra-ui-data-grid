import {
  useState,
  useMemo,
  useCallback,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import {
  Popover,
  PopoverTrigger as OrigPopoverTrigger,
  Button,
  PopoverContent,
  PopoverBody,
  FormControl,
  Flex,
  Input,
  InputGroup,
  Radio,
  RadioGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { CheckIcon, ChevronDownIcon, Search2Icon } from "@chakra-ui/icons";

type Props = {
  keyId: string;
  filterValue: string;
  searchOperator: DataGrid.StringSearchOperator;
  onApplyFilter: (
    value: string,
    searchOperator: DataGrid.StringSearchOperator
  ) => void;
};

// chakra-ui issue
// https://github.com/chakra-ui/chakra-ui/issues/5896#issuecomment-1104085557
const PopoverTrigger: React.FC<{ children: React.ReactNode }> =
  OrigPopoverTrigger;

export default function StringFilter({
  keyId,
  filterValue,
  searchOperator,
  onApplyFilter,
}: Props) {
  // コンポーネント自身が持つStateは、検索実行時までonApplyFilterに渡さない
  const [value, setValue] = useState<string>(filterValue);
  const [operator, setOperator] =
    useState<DataGrid.StringSearchOperator>(searchOperator);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isFiltered = useMemo(() => {
    if (!filterValue && searchOperator === "CONTAINS") {
      return false;
    }
    return true;
  }, [filterValue, searchOperator]);

  const inputDisabled = useMemo(() => operator !== "CONTAINS", [operator]);
  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
    [setValue]
  );

  const onChangeOperator = useCallback(
    (op: DataGrid.StringSearchOperator) => () => {
      setOperator(op);
    },
    [setOperator]
  );

  const onReset = useCallback(() => {
    setValue("");
    setOperator("CONTAINS");
    onApplyFilter("", "CONTAINS");
    onClose();
  }, [setValue, setOperator, onApplyFilter, onClose]);

  const onApply = useCallback(() => {
    onApplyFilter(value, operator);
    onClose();
  }, [onApplyFilter, value, operator, onClose]);

  // 検索欄でエンターキーを押すと検索を実行する(漢字変換時のエンターキーは除く)
  const onKeyDownInput = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code !== "Enter" || e.nativeEvent.isComposing) return;
      onApply();
    },
    [onApply]
  );

  return (
    <Popover placement="bottom" isOpen={isOpen} onClose={onApply}>
      <PopoverTrigger>
        <Button
          id={`stringFilter-button-${keyId}`}
          colorScheme={isFiltered ? "blue" : undefined}
          rightIcon={isFiltered ? <CheckIcon /> : <ChevronDownIcon />}
          onClick={onOpen}
        >
          検索
        </Button>
      </PopoverTrigger>
      <PopoverContent width="260px">
        <PopoverBody p={4} fontWeight="normal">
          <FormControl>
            <RadioGroup value={operator}>
              <Flex direction="column" gap={3}>
                <Radio value="CONTAINS" onChange={onChangeOperator("CONTAINS")}>
                  〜を含む
                </Radio>
                <Flex my={1} ml={6} direction="column">
                  <InputGroup>
                    <Input
                      id={`stringFilter-input-${keyId}`}
                      type="string"
                      borderColor={
                        value && operator === "CONTAINS"
                          ? "blue.400"
                          : undefined
                      }
                      value={value}
                      disabled={inputDisabled}
                      onChange={onChangeInput}
                      onKeyDown={onKeyDownInput}
                      placeholder="検索文字列を入力"
                    />
                    <InputRightElement>
                      <Search2Icon
                        color={
                          value && operator === "CONTAINS"
                            ? "blue.600"
                            : inputDisabled
                            ? "gray.400"
                            : undefined
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                </Flex>
                <Radio
                  id={`stringFilter-radio-exists-${keyId}`}
                  value="EXISTS"
                  onChange={onChangeOperator("EXISTS")}
                >
                  値が入っている
                </Radio>
                <Radio
                  id={`stringFilter-radio-empty-${keyId}`}
                  value="EMPTY"
                  onChange={onChangeOperator("EMPTY")}
                >
                  値が空である
                </Radio>
                <Flex mt={4} direction="row" justifyContent="space-between">
                  <Button
                    id={`stringFilter-button-reset-${keyId}`}
                    onClick={onReset}
                  >
                    リセット
                  </Button>
                  <Button
                    id={`stringFilter-button-search-${keyId}`}
                    colorScheme="blue"
                    onClick={onApply}
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
