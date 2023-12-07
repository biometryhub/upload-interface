import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { colors, glyphs } from "../constants";
import {
  loadFile,
  selectFile,
  selectUpload,
  startUploadFile,
  uploadFile,
} from "../feature/upload/slice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getFileType } from "../utils";
import { Button, Glyph } from "./base";
import { ErrorDetailModal, SelectedFile } from "./FileGallery";

const buttonStyle: React.CSSProperties = {
  marginTop: "8px",
};

const dropZoneStyle: React.CSSProperties = {
  display: "flex",
  flexFlow: "column",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  height: "144px",
  flex: 1,
};

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
    <div className="container">
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
        <div {...getRootProps({ style: dropZoneStyle })}>
          <b>Drop files here</b>
          <a>or</a>
          <Button style={buttonStyle}>
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
      <style jsx>{`
        .container {
          display: flex;
          width: 100%;
          flex-flow: column;
        }
        .drop-zone-container {
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          justify-content: flex-start;
          border: thin dashed ${colors.midShadow};
          border-radius: 5px;
          background: ${colors.grey};
          min-height: 233px;
          padding-bottom: 11px;
        }
      `}</style>
    </div>
  );
};

export const UploadButton = (props: UploadButtonProps) => {
  const files = useAppSelector(selectUpload.files);
  const dispatch = useAppDispatch();
  const upload = () => {
    files.map((file, index) => {
      dispatch(startUploadFile({ fileIndex: index }));
      dispatch(uploadFile(file, index));
    });
  };

  return (
    <Button {...props} onClick={() => upload()}>
      <b>Upload</b>
    </Button>
  );
};
type UploadButtonProps = React.ComponentProps<typeof Button>;
