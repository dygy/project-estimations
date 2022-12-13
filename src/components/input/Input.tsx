import React, { ChangeEventHandler } from "react";
import "./Input.css";
import { Color } from "../../types/color";

declare type props = {
  label?: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  defaultValue: string | number;
  classNames?: string;
  color?: Color;
};

const Input = ({
  color,
  label,
  onChange,
  defaultValue,
  classNames,
}: props): JSX.Element => {
  return (
    <div className={"input-wrapper"}>
      {label && <span style={color ? { color } : undefined}>{label}</span>}
      <input
        type={Number.isInteger(defaultValue) ? "number" : "text"}
        defaultValue={defaultValue}
        onChange={onChange}
        className={classNames}
      />
    </div>
  );
};

export default Input;
