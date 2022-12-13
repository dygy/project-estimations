import React from "react";
import "./ListItem.css";
import Avatar from "../avatar/Avatar";
import Chip from "../chip/Chip";
import { estimation } from "../../types/estimations";

const ListItem = ({
  project,
  avatarUrl,
  client,
  time,
}: estimation): JSX.Element => {
  return (
    <div className={"listItem"}>
      <div className={"listItem-row"}>
        <Avatar url={avatarUrl} />
        <Chip text={time} />
      </div>
      <div className={"listItem-column"}>
        <span>{project}</span>
        <span>{client}</span>
      </div>
    </div>
  );
};

export default ListItem;
