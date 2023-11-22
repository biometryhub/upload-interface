import { css } from "@emotion/react";

const splashCss = css({
  background: "white",
  display: "flex",
  height: "100vh",
  width: "100vw",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 667,
  flexFlow: "column",
  margin: "auto",
  img: {
    width: "15vw",
    margin: "0 0 34px",
  },
  ".logo": {
    animation: "loader 2s",
    animationIterationCount: "infinite",
  },
  "@keyframes loader": {
    "0%": {
      opacity: 0.618,
    },
    "50%": {
      opacity: 1,
    },
    "100%": {
      opacity: 0.618,
    },
  },
  "@media screen and (max-width: 768px)": {
    img: {
      margin: "0 0 21px",
    },
  },
  "@media screen and (max-width: 480px)": {
    img: {
      width: "20vw",
    },
  },
});

const Splash = () => {
  return (
    <div css={splashCss}>
      <b className="logo">Some Logo</b>
      {/* <style jsx global>{` */}
      {/*   html, */}
      {/*   body { */}
      {/*     overflow-y: hidden; */}
      {/*     perspective: none; */}
      {/*   } */}
      {/* `}</style> */}
    </div>
  );
};

export default Splash;
