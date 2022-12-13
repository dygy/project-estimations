import React, { useMemo } from "react";
import Avatar from "../avatar/Avatar";
import "./Header.css";

declare type props = {
  appState: string;
};

const Header = ({ appState }: props): JSX.Element => {
  const title = useMemo(() => {
    switch (appState) {
      case "home":
      default:
        return "Quantox";
      case "add":
        return "Quantox Estimate Tool";
    }
  }, [appState]);
  return (
    <header className="App-header">
      {title}
      <Avatar url={""} />
    </header>
  );
};

export default Header;
