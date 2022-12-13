import React, { FormEventHandler } from "react";
import "./Textarea.css";
import { Color } from "../../types/color";

declare type props = {
  onChange: FormEventHandler<HTMLTextAreaElement>;
  defaultValue: string;
  label?: string;
  color?: Color;
};

const Textarea = ({
  color,
  label,
  onChange,
  defaultValue,
}: props): JSX.Element => {
  return (
    <div className={"textarea-wrapper"}>
      {label && <span style={color ? { color } : undefined}>{label}</span>}
      <textarea defaultValue={defaultValue} onInput={onChange} />
    </div>
  );
};

export default Textarea;
