import {
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Table,
  Tbody,
  Td,
  Th,
  Tr,
  Heading,
} from "@chakra-ui/react";

import { toStringValue } from "../../../lib/stringUtil";

type Props<T extends DataGrid.TableRow> = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subTitleKey: DataGrid.KeyOf<T>;
  columns: DataGrid.ColumnDefinition<T>[];
  selectedRow: T | undefined;
};

export default function DetailDrawer<T extends DataGrid.TableRow>({
  isOpen,
  onClose,
  title,
  subTitleKey,
  columns,
  selectedRow,
}: Props<T>) {
  return (
    <Drawer isOpen={isOpen} placement="right" size="md" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title || "詳細"}</DrawerHeader>
        <DrawerBody>
          <Heading as="h3">{toStringValue(selectedRow?.[subTitleKey])}</Heading>
          <Table>
            <Tbody>
              {columns.map((column) => (
                <Tr key={column.key}>
                  <Th>{column.label}</Th>
                  <Td>{toStringValue(selectedRow?.[column.key])}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
