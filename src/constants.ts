export const colors = {
  gold: "#dea01e",
  navy: "#003a61",
  green: "#1EB384",
  red: "#F57B54",
  border: "#ddd",
  grey: "#eeeeee",
  greyDis: "#808285",
  greyIcon: "#939598",
  heavyShadow: "rgba(0, 0, 0, 0.618)",
  lightGrey: "#f8f8f8",
  midShadow: "rgba(0, 0, 0, 0.3)",
  overlay: "#c1c1c1",
  shadow: "rgba(0, 0, 0, 0.1)",
};

export const opacity = {
  light: "1a",
  mid: "4d",
  heavy: "9e",
};

type Glyphs = {
  fileLook: "󰷊";
  warning: "";
  missing: "󰘓";
  openedFolder: "󰝰 ";
  generic: "󰈔";
  csv: "󰱾";
  xlsx: "󰱾";
  image: "󰈟";
  [key: string]: string;
};

export const glyphs: Glyphs = {
  fileLook: "󰷊",
  warning: "",
  missing: "󰘓",
  openedFolder: "󰝰 ",
  generic: "󰈔",
  csv: "󰱾",
  xlsx: "󰱾",
  image: "󰈟",
};

const layoutWidth = "979px";
export const styles = {
  navigationBar: {
    height: "34px",
  },
  layout: {
    width: layoutWidth,
    sidePadding: `calc((100% - ${layoutWidth}) / 2)`,
  },
};

const namespace = process.env.NEXT_PUBLIC_NAMESPACE;
const bucket = process.env.NEXT_PUBLIC_BUCKET;
export const endpoints = {
  post: { uploadFile: "/api/upload" },
};
