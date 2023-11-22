import { ReactNode } from "react";

import { colors, styles } from "../constants";

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      {children}
      <style jsx>{`
        div {
          position: relative;
          background: white;
          display: flex;
          height: 100vh;
          width: ${styles.layout.width};
          padding: ${styles.navigationBar.height} ${styles.layout.sidePadding} 0;
        }
      `}</style>
    </div>
  );
};

type LayoutProps = {
  children: ReactNode;
};

export const GlobalStyle = () => {
  return (
    <style jsx global>{`
      @font-face {
        font-family: Kanit;
        src: url("/static/fonts/Kanit.ttf");
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: Kanit;
        src: url("/static/fonts/Kanit_Bold.ttf");
        font-weight: bold;
        font-style: normal;
      }
      @font-face {
        font-family: FiraCodeNerdFont;
        src: url("/static/fonts/FiraCodeNerdFont-Regular.ttf");
        font-weight: normal;
        font-style: normal;
      }
      * {
        list-style: none;
        margin: 0;
        padding: 0;
        text-decoration: none;
        white-space: pre-wrap;
        -webkit-appearance: none;
        -webkit-overflow-scrolling: touch;
      }
      html,
      body {
        font-family: Kanit;
      }
      body {
        background: white;
      }
      input,
      textarea,
      button {
        font-family: "Kanit";
        font-size: 1em;
      }
      button {
        border: none;
        border-radius: 2px;
        padding: 0 5px;
      }
      *:focus {
        outline: none;
      }
      input {
        background: ${colors.grey};
        border: none;
        border-radius: 2px;
        box-sizing: border-box;
        height: 24px;
        padding: 0 5px;
      }
      input:focus {
        border: thin solid ${colors.navy};
        padding: 0 4px;
      }
      h1,
      h2,
      h3,
      h4 {
        font-family: Kanit;
        margin: 0;
      }
      h1 {
        font-size: 1.17em;
      }
      h2 {
        font-size: 1.5em;
      }
      h3 {
        font-size: 1.1em;
      }
      img {
        image-orientation: from-image;
      }
      p {
        word-wrap: break-word;
      }
      .black {
        color: black;
      }
      .bold {
        font-weight: bold;
      }
      .glyph {
        font-family: FiraCodeNerdFont;
      }
      .hide {
        display: none;
      }
      .overflow-container {
        displat: flex;
        align-items: flex-end;
        width: 0px;
        height: 24px;
        overflow: visible;
      }
      .overflow {
        position: absolute;
      }
      .link {
        color: ${colors.navy};
        cursor: pointer;
        font-weight: bold;
      }
      .loading-wrapper {
        display: flex;
        flex-flow: column;
        overflow-y: scroll;
        padding: 0 5px;
      }
      .logo {
        color: ${colors.navy};
        font-weight: bold;
      }
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: none;
      }
      ::-webkit-scrollbar-thumb {
        background: ${colors.shadow};
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${colors.midShadow};
      }
      @media screen and (max-width: 1440px) {
      }
      @media screen and (max-width: 768px) {
        ::-webkit-scrollbar {
          display: none;
        }
      }
      @media screen and (max-width: 480px) {
        h1,
        h2,
        h3,
        h4 {
          margin: 0 0 13px;
        }
      }
    `}</style>
  );
};
