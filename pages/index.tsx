import { NextPage } from "next";

import { DropZone, UploadButton } from "../src/components/DropZone";
import Page from "../src/components/Page";
import { useAppSelector } from "../src/hooks";
import { selectUpload } from "../src/feature/upload/slice";

const uploadButtonStyle: React.CSSProperties = {
  marginBottom: "5px",
};

const Home: NextPage = () => {
  const isReady = useAppSelector(selectUpload.isReady);

  return (
    <Page title="Research Client" header="Upload Files">
      <div>
        <UploadButton style={uploadButtonStyle} disabled={!isReady} />
        <DropZone />
      </div>
      <style jsx>{`
        div {
          display: flex;
          flex-flow: column;
          align-items: flex-end;
        }
      `}</style>
    </Page>
  );
};

export default Home;
