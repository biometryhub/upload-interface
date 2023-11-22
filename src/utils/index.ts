import path from "path";

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const isEmpty = (obj: {}) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
};

export const getFileType = (f: File) => {
  return f.type.startsWith("image") ? "image" : path.extname(f.name).slice(1);
};

export const dataUrlToBuffer = (data: string) => {
  return Buffer.from(
    data.replace(/^data:\w+\/[\w\.\-]+;base64,/, ""),
    "base64"
  );
};
