import { useState, useMemo, useCallback } from "react";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from "@chakra-ui/react";
import { CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";

type Props = {
  keyId: string;
  filterModel: string[];
  filterValue?: string[];
  onApplyFilter: (value: string[]) => void;
};

export default function SelectFilter({
  keyId,
  filterModel,
  filterValue,
  onApplyFilter,
}: Props) {
  const [values, setValues] = useState(filterValue || []);

  const isFiltered = useMemo(
    () => filterValue && filterValue.length > 0,
    [filterValue]
  );

  // 選択中のときはまだ検索実行しない
  const onChange = useCallback((val: string | string[]) => {
    setValues(typeof val === "string" ? [val] : val);
  }, []);

  // 選択欄を閉じたときに検索実行
  const onClose = useCallback(
    () => onApplyFilter(values),
    [onApplyFilter, values]
  );

  return (
    <Menu closeOnSelect={false} onClose={onClose}>
      <MenuButton
        id={`selectFilter-button-${keyId}`}
        as={Button}
        colorScheme={isFiltered ? "blue" : undefined}
        rightIcon={isFiltered ? <CheckIcon /> : <ChevronDownIcon />}
      >
        検索
      </MenuButton>
      <MenuList fontSize="sm">
        <MenuOptionGroup
          id={`selectFilter-option-group-${keyId}`}
          type="checkbox"
          onChange={onChange}
          value={values}
        >
          {filterModel.map((mod) => (
            <MenuItemOption
              id={`selectFilter-option-${keyId}-${mod}`}
              key={mod}
              type="checkbox"
              value={mod}
            >
              {mod === "" ? "(なし)" : mod}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
