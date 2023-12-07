import Modal, { Styles as ModalStyle } from "react-modal";

import { colors, glyphs, opacity } from "../constants";
import { FileInfo, removeFile } from "../feature/upload/slice";
import { useAppDispatch } from "../hooks";
import { FileGlyph, Glyph } from "./base";

const fileWidth = 228.5;
const fileNameOffset = 5;

// export const FileGallery = (props: FileGalleryProps) => {
//   return (
//     <div>
//       {props.files.map((file) => (
//         <SelectedFile key={file.name} file={file} />
//       ))}
//       <style jsx>{`
//         div {
//           display: flex;
//           flexflow: row wrap;
//           justifycontent: flex-start;
//           width: 100%;
//         }
//       `}</style>
//     </div>
//   );
// };
// type FileGalleryProps = {
//   files: FileInfo[];
// };

const dummyFunction = () => {};
export const SelectedFile = ({
  file,
  fileIndex,
  onFileError = dummyFunction,
}: SelectedFileProps) => {
  const dispatch = useAppDispatch();
  const { name, type, status, data } = file;

  return (
    <div title={name} className="square">
      {type === "image" && status !== "validating" ? (
        <img alt={name} src={data} />
      ) : (
        <>
          <a className={`file-name ${status}`}>{name}</a>
          <a className={`file-glyph ${status}`}>
            <FileGlyph file={type} />
          </a>
        </>
      )}
      {status === "uploaded" && (
        <div className={`overlay ${status}`}>
          <a title="uploaded">
            <Glyph> </Glyph>
          </a>
        </div>
      )}
      <div
        className={`overlay discard ${status}`}
        onClick={() => status === "invalid" && onFileError()}
      />
      <button
        className="glyph"
        onClick={() => dispatch(removeFile({ fileIndex }))}
      >
        <a>󰅙 </a>
      </button>
      <style jsx>{`
        .square {
          align-items: center;
          display: flex;
          justify-content: center;
          background: ${colors.shadow};
          border: thin solid ${colors.midShadow};
          color: ${colors.midShadow};
          flex-flow: column wrap;
          height: ${fileWidth}px;
          width: ${fileWidth}px;
          margin: 11px 0 0 11px;
          position: relative;
          cursor: default;
        }
        .file-name {
          position: absolute;
          top: 0;
          left: ${fileNameOffset}px;
          width: ${fileWidth - fileNameOffset}px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .file-glyph {
          font-size: 11em;
          margin-top: -21px;
          overflow: hidden;
        }
        .validating {
          color: ${colors.shadow};
        }
        .valid,
        .uploaded {
          color: ${colors.green};
          animation: fade-in 0.5s ease-in;
        }
        .overlay.uploaded {
          display: flex;
          justify-content: flex-end;
          align-items: end;
        }
        .overlay.uploaded a {
          font-size: 2em;
        }
        .invalid {
          color: ${colors.red};
          cursor: pointer;
        }
        .overlay {
          height: ${fileWidth}px;
          width: ${fileWidth}px;
          position: absolute;
          left: 0;
          top: 0;
        }
        .glyph {
          color: black;
          cursor: pointer;
          background: none;
          font-size: 1.5em;
          -webkit-text-stroke: 1px white;
          position: absolute;
          right: -8px;
          top: 3px;
          display: none;
        }
        .glyph:hover {
          display: initial;
        }
        .discard:hover + .glyph {
          display: block;
        }
        .invalid.overlay:hover {
          background: ${colors.red}${opacity.light};
        }
        .uploading {
          animation: fade-in-out 1.5s ease-out infinite 0s;
        }
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
        @keyframes fade-in-out {
          0% {
            opacity: 0.618;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.618;
          }
        }
        @keyframes fade-in {
          0% {
            opacity: 0.618;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
type SelectedFileProps = {
  file: FileInfo;
  fileIndex: number;
  onFileError?: () => void;
};

Modal.setAppElement("body");
if (Modal.defaultStyles.overlay) {
  Modal.defaultStyles.overlay.backgroundColor = colors.midShadow;
}
const modalStyle: ModalStyle = {
  content: {
    display: "flex",
    flexFlow: "column wrap",
    height: "61.8%",
    width: "610px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export const ErrorDetailModal = ({ errorFile, ...props }: InfoModalProps) => {
  return errorFile ? (
    <Modal style={modalStyle} {...props}>
      <b>
        Please follow the steps below to ensure that file{" "}
        {`'${errorFile.name}'`} is valid.
      </b>
      <ul>
        {errorFile.errors?.missing.map((table, i) => (
          <li key={i}>
            <Glyph>{glyphs.missing} </Glyph> Ensure that table {table} exists.
          </li>
        ))}
        {errorFile.errors &&
          Object.entries(errorFile.errors.invalid).map(
            ([table, columns], i) => (
              <li key={i}>
                <Glyph>{glyphs.fileLook} </Glyph> In sheet <b>{table}</b>, have
                a look at
                <ul>
                  {Object.entries(columns).map(([column, errorRows], j) => (
                    <li key={j}>
                      <Glyph>{`  ${glyphs.warning} `}</Glyph>
                      row(s), <b>{errorRows.join(", ")}</b>, in column{" "}
                      <b>{column}</b>.
                    </li>
                  ))}
                </ul>
              </li>
            )
          )}
      </ul>
      <style jsx>{`
        Modal {
          position: absolute;
        }
      `}</style>
    </Modal>
  ) : (
    <></>
  );
};

type InfoModalProps = React.ComponentProps<typeof Modal> & {
  errorFile?: FileInfo;
};
