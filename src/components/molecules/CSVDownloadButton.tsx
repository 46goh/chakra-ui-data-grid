import { useCallback } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ButtonProps,
  Portal,
} from "@chakra-ui/react";
import { ChevronDownIcon, DownloadIcon } from "@chakra-ui/icons";

type Props = {
  onCsvDownload: (charset: DataGrid.Charset) => Promise<void>;
} & ButtonProps;

export default function CSVDownloadButton({
  onCsvDownload,
  ...buttonProps
}: Props) {
  const onClickDownloadShiftJisCsv = useCallback(
    () => onCsvDownload("Shift_JIS"),
    [onCsvDownload]
  );
  const onClickDownloadUtf8Csv = useCallback(
    async () => await onCsvDownload("UTF-8"),
    [onCsvDownload]
  );
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        size="sm"
        colorScheme="blue"
        {...buttonProps}
      >
        CSVダウンロード
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem onClick={onClickDownloadShiftJisCsv}>
            <DownloadIcon />
            Windows用(Shift_JIS)
          </MenuItem>
          <MenuItem onClick={onClickDownloadUtf8Csv}>
            <DownloadIcon />
            mac用(UTF-8)
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
}
