import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { colors, glyphs } from "../constants";
import {
  loadFile,
  selectFile,
  selectUpload,
  uploadFile,
} from "../feature/upload/slice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getFileType } from "../utils";
import { Button, Glyph } from "./base";
import { ErrorDetailModal, SelectedFile } from "./FileGallery";

const dropZoneCss = css({
  display: "flex",
  width: "100%",
  flexFlow: "column",
  ".drop-zone-container": {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    border: `thin dashed ${colors.midShadow}`,
    borderRadius: "5px",
    background: colors.grey,
    minHeight: "233px",
    paddingBottom: "11px",
  },
  ".drop-zone": {
    display: "flex",
    flexFlow: "column",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    height: "144px",
    flex: 1,
  },
  Button: {
    marginTop: "8px",
  },
});

export const DropZone = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [errorIndex, setErrorIndex] = useState(-1);
  const files = useAppSelector(selectUpload.files);
  const fileCount = useAppSelector(selectUpload.fileCount);
  const dispatch = useAppDispatch();

  const errorFile = files[errorIndex];
  useEffect(() => {
    acceptedFiles.forEach((file, index) => {
      const fileType = getFileType(file);
      dispatch(selectFile({ name: file.name, type: fileType }));
      dispatch(loadFile(file, fileType, index + fileCount));
    });
  }, [acceptedFiles]);

  return (
    <div css={dropZoneCss}>
      <div className="drop-zone-container">
        <input {...getInputProps()} />
        {files.map((file, index) => (
          <SelectedFile
            key={file.name}
            file={file}
            fileIndex={index}
            onFileError={() => setErrorIndex(index)}
          />
        ))}
        <div {...getRootProps({ className: "drop-zone" })}>
          <b>Drop files here</b>
          <a>or</a>
          <Button>
            <Glyph>{glyphs.openedFolder}</Glyph>
            <b>Browse</b>
          </Button>
        </div>
      </div>
      <ErrorDetailModal
        isOpen={errorIndex >= 0}
        onRequestClose={() => setErrorIndex(-1)}
        errorFile={errorFile}
      />
    </div>
  );
};

export const UploadButton = (props: UploadButtonProps) => {
  const files = useAppSelector(selectUpload.files);
  const dispatch = useAppDispatch();
  return (
    <Button
      {...props}
      onClick={() => files.map((file) => dispatch(uploadFile(file)))}
    >
      <b>Upload</b>
    </Button>
  );
};
type UploadButtonProps = React.ComponentProps<typeof Button>;
