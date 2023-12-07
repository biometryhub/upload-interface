import { colors, glyphs } from "../constants";

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
