import { useCallback } from "react";
import { stringify } from "csv-stringify";
import Encoding from "encoding-japanese";
import { toStringValue } from "../lib/stringUtil";

const generateData = <TRow extends DataGrid.TableRow>(
  columns: DataGrid.ColumnDefinition<TRow>[],
  rows: TRow[]
): string[][] => {
  const data = [];
  data.push(columns.map((col) => col.label));
  data.push(
    ...rows.map((row) => columns.map((col) => toStringValue(row[col.key])))
  );
  return data;
};

const generateCsv = (
  data: string[][],
  recordDelimiterType: "windows" | "unix"
): Promise<string> => {
  return new Promise((resolve) => {
    stringify(
      data,
      {
        delimiter: ",",
        quoted: true,
        record_delimiter: recordDelimiterType,
      },
      (err, csv) => {
        if (err) {
          throw err;
        }
        resolve(csv);
      }
    );
  });
};

const convertStringToBlob = (str: string, charset: DataGrid.Charset) => {
  if (charset === "Shift_JIS") {
    const csvAsCharCodeArray = new Array(str.length)
      .fill(0)
      .map((_, i) => str.charCodeAt(i));
    const encodedCsv = Encoding.convert(csvAsCharCodeArray, "SJIS");
    return new Blob([new Uint8Array(encodedCsv)], {
      type: `text/csv; charset=Shift_JIS`,
    });
  }
  return new Blob([str], {
    type: `text/csv; charset=UTF-8`,
  });
};

const download = (blob: Blob, filename: string) => {
  const encodedUri = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = encodedUri;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export default function useCsvDownload<TRow extends DataGrid.TableRow>(
  filename: string,
  columns: DataGrid.ColumnDefinition<TRow>[],
  rows: TRow[]
) {
  const downloadCsv = useCallback(
    async (charset: DataGrid.Charset) => {
      const data = generateData(columns, rows);
      const csv = await generateCsv(
        data,
        charset === "Shift_JIS" ? "windows" : "unix"
      );
      const blob = convertStringToBlob(csv, charset);

      download(blob, filename);
    },
    [filename, columns, rows]
  );

  return downloadCsv;
}
