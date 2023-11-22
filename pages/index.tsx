import { NextPage } from "next";
import { css } from "@emotion/react";

import { DropZone, UploadButton } from "../src/components/DropZone";
import Page from "../src/components/Page";
import { useAppSelector } from "../src/hooks";
import { selectUpload } from "../src/feature/upload/slice";

const homeContainerCss = css({
  display: "flex",
  flexFlow: "column",
  alignItems: "flex-end",
  ".upload-button": {
    marginBottom: "5px",
  },
});

const Home: NextPage = () => {
  const isReady = useAppSelector(selectUpload.isReady);

  return (
    <Page title="Research Client" header="Upload Files">
      <div css={homeContainerCss}>
        <UploadButton className="upload-button" disabled={!isReady} />
        <DropZone />
      </div>
    </Page>
  );
};

export default Home;
