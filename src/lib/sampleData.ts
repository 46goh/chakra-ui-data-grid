// DataGridのテストに使うデータ

export type SampleObject = {
  id: string;
  name: string;
  status: string;
  health: string;
  createdAt: Date;
  updatedAt: Date;
  remarks: string;
};

const LAST_NAME_EXAMPLES = [
  "佐藤",
  "鈴木",
  "高橋",
  "田中",
  "伊藤",
  "渡辺",
  "山本",
  "中村",
  "小林",
  "加藤",
  "吉田",
  "山田",
  "佐々木",
  "山口",
  "松本",
  "井上",
  "木村",
]; // 17件
const FIRST_NAME_EXAMPLES = [
  "蓮",
  "陽翔",
  "蒼",
  "湊",
  "樹",
  "朝陽",
  "大和",
  "悠真",
  "颯真",
  "陽向",
  "伊織",
  "結愛",
  "陽菜",
  "杏",
  "紬希",
  "莉子",
  "花",
  "結月",
  "結菜",
]; // 19件
const STATUS_EXAMPLES = [
  "ステータス1",
  "ステータス2",
  "ステータス3",
  "ステータス4",
  "ステータス5",
  "ステータス6",
  "ステータス7",
]; // 7件
const HEALTH_EXAMPLES = [
  "健康状態1",
  "健康状態2",
  "健康状態3",
  "健康状態4",
  "健康状態5",
  "健康状態6",
  "健康状態7",
  "健康状態8",
  "健康状態9",
]; // 9件

export const generateRows = (max: number): SampleObject[] => {
  return new Array(max).fill(0).map((_, i) => ({
    id: i.toString().padStart(9, "0"),
    name: `${LAST_NAME_EXAMPLES[i % LAST_NAME_EXAMPLES.length]} ${
      FIRST_NAME_EXAMPLES[i % FIRST_NAME_EXAMPLES.length]
    }`,
    status: STATUS_EXAMPLES[i % STATUS_EXAMPLES.length],
    health: HEALTH_EXAMPLES[i % HEALTH_EXAMPLES.length],
    createdAt: new Date(2022, 5, 1 + i),
    updatedAt: new Date(2022, 10, 1 + i),
    remarks: `備考${i}`,
  }));
};

export const columns: DataGrid.ColumnDefinition<SampleObject>[] = [
  {
    key: "id",
    label: "ID",
    filterType: "NONE",
    width: "100px",
  },
  {
    key: "name",
    label: "氏名",
    filterType: "STRING",
    width: "100px",
  },
  {
    key: "status",
    label: "ステータス",
    filterType: "SELECT",
    filterModel: STATUS_EXAMPLES,
    width: "100px",
  },
  {
    key: "health",
    label: "健康状態",
    filterType: "SELECT",
    filterModel: HEALTH_EXAMPLES,
    width: "100px",
  },
  {
    key: "createdAt",
    label: "作成日",
    filterType: "DATE",
    width: "100px",
  },
  {
    key: "updatedAt",
    label: "更新日",
    filterType: "DATE",
    width: "100px",
  },
  {
    key: "remarks",
    label: "備考",
    filterType: "STRING",
    width: "100px",
  },
];
