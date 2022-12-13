import React, { MouseEventHandler } from "react";
import "./Chip.css";
import { Color } from "../../types/color";

declare type props = {
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  label?: string;
  color?: Color;
};

const Chip = ({ color, text, onClick, label }: props): JSX.Element => {
  return (
    <div className={"chipWrapper"}>
      {label && <span style={color ? { color } : undefined}>{label}</span>}
      {onClick ? (
        <button onClick={onClick} className={"buttonChip"}>
          {text}
        </button>
      ) : (
        <div className={"labelChip"}>{text}</div>
      )}
    </div>
  );
};

export default Chip;
