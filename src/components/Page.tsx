import Head from "next/head";
import { ReactNode } from "react";
import { css } from "@emotion/react";

const pageCss = css({
  display: "flex",
  flexFlow: "column",
  width: "100%",
});

const Page = (props: PageProps) => {
  return (
    <div css={pageCss}>
      <Head>
        <title>{props.title}</title>
      </Head>
      <h2>{props.header}</h2>
      {props.children}
    </div>
  );
};
type PageProps = {
  title: string;
  header: string;
  children: ReactNode;
};

export default Page;
