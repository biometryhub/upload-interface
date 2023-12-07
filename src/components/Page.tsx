import Head from "next/head";
import { ReactNode } from "react";

const Page = (props: PageProps) => {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
      </Head>
      <h2>{props.header}</h2>
      {props.children}
      <style jsx>{`
        div {
          display: flex;
          flex-flow: column;
          width: 100%;
        }
      `}</style>
    </div>
  );
};
type PageProps = {
  title: string;
  header: string;
  children: ReactNode;
};

export default Page;
