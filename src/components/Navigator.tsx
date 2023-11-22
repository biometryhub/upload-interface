import { css } from "@emotion/react";

import { colors, styles } from "../constants";
import ActiveLink from "./ActiveLink";

// TODO: convert all emotion to style-jsx
const navigationBarCss = css({
  background: colors.navy,
  display: "flex",
  position: "fixed",
  alignItems: "center",
  height: styles.navigationBar.height,
  width: styles.layout.width,
  padding: `0 ${styles.layout.sidePadding}`,
  zIndex: 13,
  ".link": {
    color: "white",
  },
  ".active": {
    textDecoration: "underline",
  },
});

export const NavigationBar = () => {
  return (
    <div css={navigationBarCss}>
      <ActiveLink href="/" activeClassName="active" className="link">
        Home
      </ActiveLink>
    </div>
  );
};
