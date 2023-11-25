import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { createAppSelector, SelectorCreator } from "../../hooks";
import { isEmpty } from "../../utils";

export type FileInfo = {
  name: string;
  data: string;
  type: string;
  status?: "validating" | "valid" | "invalid" | "uploading" | "uploaded";
  errors?: {
    missing: string[];
    invalid: {
      [key: string]: {
        [key: string]: number[];
      };
    };
  };
};

type UploadState = {
  files: FileInfo[];
  isReady: boolean;
  pendingIndices: { [key: number]: boolean };
  fileCount: number;
};

const initialUploadState: UploadState = {
  files: [],
  isReady: false,
  pendingIndices: {},
  fileCount: 0,
};

const uploadSlice = createSlice({
  name: "upload",
  initialState: initialUploadState,
  reducers: {
    selectFile: (state, action: SelectFilePayload) => {
      const pendingIndices = {
        ...state.pendingIndices,
        ...{ [state.fileCount]: true },
      };

      state.pendingIndices = { ...state.pendingIndices, ...pendingIndices };
      state.files = [
        ...state.files,
        {
          name: action.payload.name,
          data: "",
          type: action.payload.type,
          status: "validating" as const,
        },
      ];
      state.isReady = false;
      state.fileCount = state.files.length;
    },
    startUploadFile: (state, action: StartUploadFilePayload) => {
      const fileIndex = action.payload.fileIndex;
      if (state.files[fileIndex].status !== "uploaded") {
        state.files[fileIndex].status = "uploading";
        state.pendingIndices = { ...state.pendingIndices, [fileIndex]: true };
        state.isReady = false;
      }
    },
    updateFile: (state, action: UpdateFilePayload) => {
      const { fileIndex, ...payload } = action.payload;

      if (payload.status === "valid") {
        const pendingIndices = { ...state.pendingIndices };
        delete pendingIndices[fileIndex];
        state.pendingIndices = pendingIndices;

        if (isEmpty(state.pendingIndices)) {
          state.isReady = true;
        }
      }
      state.files = [
        ...state.files.slice(0, fileIndex),
        payload,
        ...state.files.slice(fileIndex + 1),
      ];
    },
    removeFile: (state, action: RemoveFilePayload) => {
      const { fileIndex } = action.payload;
      const pendingIndices = [...Object.keys(state.pendingIndices)].reduce(
        (obj, index) => {
          const nIndex = Number(index);
          if (nIndex < fileIndex) {
            obj[Number(index)] = true;
          } else if (nIndex > fileIndex) {
            obj[Number(index) - 1] = true;
          }
          return obj;
        },
        {} as UploadState["pendingIndices"]
      );

      state.pendingIndices = pendingIndices;
      state.files = [
        ...state.files.slice(0, fileIndex),
        ...state.files.slice(fileIndex + 1),
      ];
      state.fileCount = state.files.length;

      if (isEmpty(state.pendingIndices) && state.fileCount > 0) {
        state.isReady = true;
      }
    },
    uploadDone: (state, action: UploadDonePayload) => {
      const fileIndex = action.payload.fileIndex;
      state.files[fileIndex].status = "uploaded";
      delete state.pendingIndices[fileIndex];
    },
  },
});

export const loadFile = createAction(
  "upload/acceptFile",
  (file: File, type: string, fileIndex: number) => ({
    payload: { file, type, fileIndex },
  })
);

export const uploadFile = createAction(
  "upload/uploadFiles",
  (file: FileInfo, fileIndex: number) => ({ payload: { file, fileIndex } })
);

type SelectFilePayload = PayloadAction<{ name: string; type: string }>;
type StartUploadFilePayload = PayloadAction<{ fileIndex: number }>;
type UpdateFilePayload = PayloadAction<FileInfo & { fileIndex: number }>;
type RemoveFilePayload = PayloadAction<{ fileIndex: number }>;
type UploadDonePayload = PayloadAction<{ fileIndex: number }>;

export const {
  selectFile,
  uploadDone,
  updateFile,
  removeFile,
  startUploadFile,
} = uploadSlice.actions;
export const uploadReducer = uploadSlice.reducer;

const createUploadSelector: SelectorCreator<UploadState> = (k) =>
  createAppSelector((state) => state.upload[k]);

export const selectUpload = {
  files: createUploadSelector("files"),
  fileCount: createUploadSelector("fileCount"),
  pendingIndices: createUploadSelector("pendingIndices"),
  isReady: createUploadSelector("isReady"),
};
