import StringFilter from "./StringFilter";
import SelectFilter from "./SelectFilter";
import DateFilter from "./DateFilter";

export type FilterProps = {
  keyId: string;
} & (
  | {
      filterType: "STRING";
      filterValue: string;
      searchOperator: DataGrid.StringSearchOperator;
      onApplyFilter: (
        value: string,
        searchOperator: DataGrid.StringSearchOperator
      ) => void;
    }
  | {
      filterType: "SELECT";
      filterModel: string[];
      filterValue: string[];
      onApplyFilter: (value: string[]) => void;
    }
  | {
      filterType: "DATE";
      searchOperator: DataGrid.DateSearchOperator;
      filterValue: DataGrid.DateRange;
      onApplyFilter: (
        value: DataGrid.DateRange,
        searchOperator: DataGrid.DateSearchOperator
      ) => void;
    }
  | {
      filterType: "NONE";
    }
);

export default function Filter(props: FilterProps) {
  switch (props.filterType) {
    case "STRING":
      return (
        <StringFilter
          keyId={props.keyId}
          filterValue={props.filterValue}
          searchOperator={props.searchOperator}
          onApplyFilter={props.onApplyFilter}
        />
      );
    case "SELECT":
      return (
        <SelectFilter
          keyId={props.keyId}
          filterValue={props.filterValue}
          filterModel={props.filterModel}
          onApplyFilter={props.onApplyFilter}
        />
      );
    case "DATE":
      return (
        <DateFilter
          keyId={props.keyId}
          filterValue={props.filterValue}
          searchOperator={props.searchOperator}
          onApplyFilter={props.onApplyFilter}
        />
      );
    default:
      return <></>;
  }
}
