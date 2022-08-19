declare namespace DataGrid {
  /**
   * 素直に keyof Record<string, string> を使ってもRecordのKeyが取得できないので作った型
   * KeyOf<{key1: string; key2: string}> // これは "key1" | "key2" と判定される
   */
  declare type KeyOf<T extends Record<string, unknown>> = Extract<
    keyof T,
    string
  >;

  // 現時点でDataGridが受け取れる型
  type Column = string | Date | null | undefined;

  type TableRow = Record<string, Column>;

  type ColumnDefinition<T extends TableRow> =
    | {
        label: string;
        width?: string | number;
        key: KeyOf<T>;
        filterType: "STRING" | "DATE" | "NONE";
      }
    | {
        label: string;
        width?: string | number;
        key: KeyOf<T>;
        filterType: "SELECT";
        filterModel: string[];
      };

  type FilterType = "STRING" | "DATE" | "SELECT" | "NONE";

  type StringSearchOperator = "CONTAINS" | "EXISTS" | "EMPTY";
  type DateRange = [Date | undefined, Date | undefined];
  type DateSearchOperator = "BETWEEN" | "EXISTS" | "EMPTY";

  type FilterMap<T extends TableRow> = Map<
    KeyOf<T>,
    | {
        filterType: "STRING";
        value: string;
        searchOperator: StringSearchOperator;
      }
    | {
        filterType: "SELECT";
        value: string[];
        searchOperator?: void;
      }
    | {
        filterType: "DATE";
        value: DateRange;
        searchOperator: DateSearchOperator;
      }
  >;

  export type Charset = "UTF-8" | "Shift_JIS";
}
