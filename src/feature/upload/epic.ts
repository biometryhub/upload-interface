import { Action } from "@reduxjs/toolkit";
import { combineEpics } from "redux-observable";
import { filter, map, mergeMap, Observable } from "rxjs";
import { endpoints } from "../../constants";
import { req } from "../../services/request";
import { dataUrlToBuffer } from "../../utils";

import { validate } from "../../utils/excel";
import {
  loadFile,
  updateFile,
  FileInfo,
  uploadDone,
  uploadFile,
} from "./slice";

const selectFileEpic = (action$: Observable<Action>) => {
  return action$.pipe(
    filter(loadFile.match),
    mergeMap((action) => {
      const { file, type, fileIndex } = action.payload;
      return readFile(file, type).pipe(
        map((readAction) =>
          updateFile({
            name: file.name,
            data: readAction.data,
            type,
            status: readAction.status,
            fileIndex,
            errors: readAction.errors,
          })
        )
      );
    })
  );
};

const uploadFileEpic = (action$: Observable<Action>) => {
  return action$.pipe(
    filter(uploadFile.match),
    mergeMap((action) =>
      req(
        "POST",
        new URL(endpoints.post.uploadFile, process.env.NEXT_PUBLIC_API).href,
        {
          name: action.payload.file.name,
          body: action.payload.file.data,
        }
      ).pipe(map((_) => uploadDone({ fileIndex: action.payload.fileIndex })))
    )
  );
};
export const uploadEpics = combineEpics(selectFileEpic, uploadFileEpic);

type ReadFileRes = Omit<FileInfo, "name">;
const readFile = (file: File, fileType: string) =>
  new Observable<ReadFileRes>((observer$) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const data = <string>reader.result;

      const res: ReadFileRes = {
        data,
        type: fileType,
        status: "valid",
      };

      if (fileType === "xlsx") {
        const buffer = dataUrlToBuffer(data);
        const { isValid, errors } = validate(buffer);
        res.errors = errors;
        res.status = isValid ? "valid" : "invalid";
      }

      observer$.next(res);
      observer$.complete();
    };

    reader.onerror = () => observer$.error(reader.error);
    reader.onabort = () => observer$.error(reader.error);
    reader.onloadend = () => observer$.complete();

    return () => reader.abort(); // cancel function in case you unsubscribe from the obs
  });
