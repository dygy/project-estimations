import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import "./Body.css";
import Chip from "../chip/Chip";
import ListItem from "../listItem/ListItem";
import Storage from "../../util/storage";
import Form from "../form/Form";
import { estimation, selectedEstimation } from "../../types/estimations";

declare type props = {
  appState: string;
  setAppState: Dispatch<SetStateAction<string>>;
};

const Body = ({ appState, setAppState }: props): JSX.Element => {
  const [estimation, setEstimation] = useState<
    selectedEstimation | undefined
  >();

  const moveToEstimation = (estimation: estimation, index: number) => {
    setEstimation({
      estimation,
      index,
    });
    setAppState("add");
  };

  const list = useMemo(() => {
    return Storage.getItems().map((item, index) => (
      <button
        key={item.client + index}
        className={"invisible"}
        onClick={moveToEstimation.bind(this, item, index)}
      >
        <ListItem {...item} />
      </button>
    ));
  }, [appState, moveToEstimation]);

  const layout = useMemo(() => {
    switch (appState) {
      case "add":
        return (
          <Form
            estimation={estimation}
            setAppState={setAppState}
            setEstimation={setEstimation}
          />
        );
      case "home":
      default:
        return (
          <>
            <div className="App-control">
              <span>Project Estimations</span>
              <Chip text={"Add New"} onClick={() => setAppState("add")} />
            </div>
            <div className={"App-list"}>{list}</div>
          </>
        );
    }
  }, [appState, estimation, list, setAppState]);

  return <div className="App-body">{layout}</div>;
};

export default Body;
