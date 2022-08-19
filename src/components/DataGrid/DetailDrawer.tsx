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
} from "@chakra-ui/react";

import { toStringValue } from "../../lib/stringUtil";

type Props<T extends DataGrid.TableRow> = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  columns: DataGrid.ColumnDefinition<T>[];
  selectedRow?: T;
};

export default function DetailDrawer<T extends DataGrid.TableRow>({
  isOpen,
  onClose,
  title,
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
