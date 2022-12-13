import React from "react";
import "./Avatar.css";

declare type props = {
  url: string;
};

const mockURL =
  "https://upload.wikimedia.org/wikipedia/commons/e/e7/Aleksandar_Vu%C4%8Di%C4%87_2019_%28cropped%29.jpg";
const Avatar = ({ url }: props): JSX.Element => {
  return <img src={mockURL} className="avatar" alt={"avatar"} />;
};

export default Avatar;
