import * as XLSX from "xlsx";
import { Constraint, constraints, ObjectConstraint } from "../config";
import { FileInfo } from "../feature/upload/slice";

export type Row = { [key: string]: string | number };
export type ExcelContent = { [key: string]: Row[] };

export const validate = (excel_binary: ArrayBuffer) => {
  // TODO: configurable or auto detect
  const startRow = 0;
  const wb = XLSX.read(excel_binary, { type: "buffer", cellDates: true });

  const result = {
    isValid: true,
    errors: {
      missing: [] as string[],
      invalid: {},
    } as Required<FileInfo>["errors"],
    content: {} as ExcelContent,
  };
  Object.entries(constraints).forEach(([sheetName, columns]) => {
    const sheet = wb.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<Row>(sheet, {
      range: startRow,
    });

    if (!isSheetValid(rows)) {
      result.isValid = false;
      result.errors.missing = [...result.errors.missing, sheetName];
      return;
    }

    console.log(rows);
    result.content[sheetName] = rows;

    Object.entries(columns).forEach(
      ([column, constraint]: [string, Constraint]) => {
        let validator = validators.string;
        if (typeof constraint === "string") {
          validator = validators[constraint];
        } else {
          validator = objectValidator(constraint);
        }
        rows.forEach((row, rowNumber) => {
          const value = row[column];
          if (!validator(value)) {
            result.isValid = false;
            if (!result.errors.invalid[sheetName]) {
              result.errors.invalid[sheetName] = {};
            }

            result.errors.invalid[sheetName][column] = [
              ...(result.errors.invalid[sheetName]?.[column] || []),
              rowNumber + 2 + startRow,
            ];
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
  string: (v: any) => typeof v === "string" || v == null,
  number: (v: any) => typeof v === "number" || v == null,
  date: (v: any) => v instanceof Date,
};

const objectValidator = (constraint: ObjectConstraint) => {
  if (Array.isArray(constraint)) {
    return listValidator(constraint);
  }

  if (constraint instanceof RegExp) {
    return regExpValidator(constraint);
  }

  throw new Error(`${constraint} is not a valid constraint.`);
};

const listValidator = (valid_values: (string | number)[]) => (v: any) =>
  valid_values.includes(v);

const regExpValidator = (regExp: RegExp) => (v: any) => v.match(regExp) != null;
