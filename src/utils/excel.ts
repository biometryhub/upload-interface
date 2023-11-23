import * as XLSX from "xlsx";
import { Constraint, constraints } from "../config";
import { FileInfo } from "../feature/upload/slice";

type Row = (string | number)[];

export const validate = (excel_binary: ArrayBuffer) => {
  const wb = XLSX.read(excel_binary, { type: "buffer" });

  const result = {
    isValid: true,
    errors: {
      missing: [] as string[],
      invalid: {},
    } as Required<FileInfo>["errors"],
  };
  Object.entries(constraints).forEach(([table, columns]) => {
    const sheet = wb.Sheets[table];
    const rows = XLSX.utils.sheet_to_json<Row>(sheet, { header: 1 });

    if (!isSheetValid(rows)) {
      result.isValid = false;
      result.errors.missing = [...result.errors.missing, table];
      return;
    }

    Object.entries(columns).forEach(
      ([column, constraint]: [string, Constraint]) => {
        const column_index = rows[0].indexOf(column);
        let validator = validators.string;
        if (typeof constraint === "string") {
          validator = validators[constraint];
        } else {
          validator = validators.list(constraint);
        }
        rows.slice(1).forEach((row, rowNumber) => {
          const value = row[column_index];
          if (!validator(value)) {
            result.isValid = false;
            if (!result.errors.invalid[table]) {
              result.errors.invalid[table] = {};
            }

            result.errors.invalid[table][column] = [
              ...(result.errors.invalid[table]?.[column] || []),
              rowNumber,
            ];
            // return;
          }
        });
      }
    );
  });

  return result;
};

const isSheetValid = (rows: any) => {
  if (!rows || rows.constructor !== Array || rows.length === 0) {
    return false;
  }
  return true;
};

const validators = {
  string: (v: any) => typeof v === "string",
  number: (v: any) => typeof v === "number",
  date: (v: any) => {
    if (typeof v === "string") {
      // match valid dd-mm-yyyy
      return v.match(/\d{4}-(0[1-9]|1[012])-([012][1-9]|[123][01])/) != null;
    }
    return false;
  },
  list: (valid_values: (string | number)[]) => (v: any) =>
    valid_values.includes(v),
};
