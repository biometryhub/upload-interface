import { colors, styles } from "../constants";
import ActiveLink from "./ActiveLink";

export const NavigationBar = () => {
  return (
    <div>
      <ActiveLink href="/" activeClassName="active" className="link">
        Home
      </ActiveLink>
      <style jsx>{`
        div {
          background: ${colors.navy};
          display: flex;
          position: fixed;
          align-items: center;
          height: ${styles.navigationBar.height};
          width: ${styles.layout.width};
          padding: 0 ${styles.layout.sidePadding};
          z-index: 13;
        }
        .link {
          color: white;
        }
        .active {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
