import { PayloadAction } from "@reduxjs/toolkit";
import Select, { Props, StylesConfig } from "react-select";
import { css } from "@emotion/react";

import { colors, glyphs } from "../constants";
import { capitalize } from "../utils";

export const Button = (props: ButtonProps) => {
  return (
    <>
      <button type="button" {...props} />
      <style jsx>{`
        button {
          background: ${props.disabled ? colors.midShadow : colors.navy};
          cursor: ${props.disabled ? "initial" : "pointer"};
          color: white;
        }
      `}</style>
    </>
  );
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Glyph = ({ children, ...props }: GlyphProps) => {
  return (
    <a className="glyph" {...props}>
      {children}
    </a>
  );
};

type GlyphProps = React.HTMLAttributes<HTMLElement>;

export const FileGlyph = ({ file, ...props }: FileGlyphProps) => {
  const fileGlyph = (file && glyphs[file]) || glyphs.generic;
  return <Glyph {...props}>{fileGlyph}</Glyph>;
};

type FileGlyphProps = React.HTMLAttributes<HTMLElement> & { file?: string };

export const Dropdown = <T extends string>(props: DropdownProps<T>) => {
  const { choices, dispatch, currentValue, width } = props;
  const options = choices.map((choice) => ({
    value: choice,
    label: capitalize(choice),
  }));
  const currentOption = options.filter(
    (option) => option.value === currentValue
  )[0];

  const height = "24px";
  const defaultStyle = {
    height: height,
    minHeight: "none",
    margin: 0,
    padding: 0,
    color: "black",
  };
  const styles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      ...defaultStyle,
      border: "none",
      boxShadow: state.isFocused ? `0 0 0 1px ${colors.navy}` : "none",
      boxSizing: "border-box",
      background: colors.grey,
      borderRadius: "2px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      ...defaultStyle,
      padding: "0 5px",
      minWidth: width || "61px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      ...defaultStyle,
      display: "flex",
      alignItems: "center",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      margin: "3px 0",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      ...defaultStyle,
      paddingTop: "2px",
      color: colors.midShadow,
    }),
    singleValue: (provided) => ({
      ...provided,
      ...defaultStyle,
    }),
    input: (provided) => ({
      ...provided,
      ...defaultStyle,
    }),
    option: (provided, state) => ({
      ...provided,
      ...defaultStyle,
      background: state.isSelected
        ? colors.midShadow
        : state.isFocused
        ? colors.shadow
        : "none",
      paddingLeft: "5px",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "2px",
      margin: "1px 0",
    }),
    menuList: (provided) => ({
      ...provided,
      flexDirection: "column",
      width: "100%",
    }),
  };

  return (
    <Select
      defaultValue={currentOption}
      onChange={(option: { value: T; lable: string }) =>
        dispatch(option?.value || currentOption.value)
      }
      options={options}
      styles={styles}
    />
  );
};

type DropdownProps<T extends string> = Props & {
  currentValue: T;
  choices: T[];
  dispatch: (choice: T) => PayloadAction<T>;
  width?: string;
};
