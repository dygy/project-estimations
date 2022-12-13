import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import "./Form.css";
import Input from "../input/Input";
import Chip from "../chip/Chip";
import { estimation, selectedEstimation } from "../../types/estimations";
import Textarea from "../textarea/Textarea";
import Storage from "../../util/storage";
import { createPdf } from "../../util/pdf";

const topColor = "#93969E";

declare type props = {
  setAppState: Dispatch<SetStateAction<string>>;
  estimation?: selectedEstimation;
  setEstimation: Dispatch<SetStateAction<selectedEstimation | undefined>>;
};
const Form = ({
  setAppState,
  estimation,
  setEstimation,
}: props): JSX.Element => {
  const [formState, setFormState] = useState<estimation>(
    estimation?.estimation || {
      project: "",
      client: "",
      time: "0 days",
      avatarUrl: "",
      requirements: [],
    }
  );

  const calculateTime = useCallback(() => {
    const sumWithInitial = formState.requirements.reduce(
      (accumulator, currentValue) =>
        accumulator + parseInt(String(currentValue.hours)),
      0
    );
    setFormState({
      ...formState,
      time: `${Math.ceil(sumWithInitial / 8)} days`,
    });
  }, [formState]);

  const validateState = useCallback(() => {
    if (formState.project.length === 0) {
      alert("pleas fill project name");
    } else if (formState.client.length === 0) {
      alert("pleas fill client name");
    } else if (formState.time === "0 days") {
      alert("pleas fill predict time for requirements");
    } else if (formState.requirements.length === 0) {
      alert("pleas add some requirements");
    } else if (!estimation?.estimation) {
      Storage.pushItem(formState);
      setFormState({
        project: "",
        client: "",
        time: "0 days",
        avatarUrl: "",
        requirements: [],
      });
      setAppState("home");
    } else {
      Storage.changeItem(formState, estimation.index);
      setFormState({
        project: "",
        client: "",
        time: "0 days",
        avatarUrl: "",
        requirements: [],
      });
      setEstimation(undefined);
      setAppState("home");
    }
  }, [estimation, formState, setAppState, setEstimation]);

  const setProjectName = useCallback(
    (event: ChangeEvent) => {
      // @ts-ignore
      const { value } = event.target;
      if (value.length > 0) {
        setFormState({
          ...formState,
          project: value,
        });
      }
    },
    [formState]
  );

  const setCompanyName = useCallback(
    (event: ChangeEvent) => {
      // @ts-ignore
      const { value } = event.target;
      if (value.length > 0) {
        setFormState({
          ...formState,
          client: value,
        });
      }
    },
    [formState]
  );

  const addNewRequirement = useCallback(() => {
    setFormState({
      ...formState,
      requirements: [...formState.requirements, { text: "", hours: 0 }],
    });
  }, [formState]);

  return (
    <>
      <div className="App-control separated">
        <span>New Estimation</span>
        <Chip text={"Save"} onClick={validateState} />
      </div>
      <div className={"App-add"}>
        <div className={"form-wrapper"}>
          <div className={"first-form"}>
            <div className={"row"}>
              <Input
                color={topColor}
                label={"Project Name"}
                onChange={setProjectName}
                defaultValue={formState.project}
              />
              <Input
                color={topColor}
                label={"Company Name"}
                onChange={setCompanyName}
                defaultValue={formState.client}
              />
              <Chip color={topColor} label={"Total"} text={formState.time} />
            </div>
            <div className={"row withMargin"}>
              <Chip
                text={"Export as PDF"}
                onClick={createPdf.bind(window, formState)}
              />
            </div>
          </div>
          <div className={"second-form"}>
            <div>
              <div className={"row left big"}>
                <span>Requirements</span>
                <Chip text={"Add"} onClick={addNewRequirement} />
              </div>
              <div className={"container"}>
                {formState.requirements.map((elem, index) => {
                  const changeEstimate = (event: ChangeEvent) => {
                    const newArr = [...formState.requirements];
                    // @ts-ignore
                    newArr[index].hours = event.target.value || 0;
                    setFormState({
                      ...formState,
                      requirements: newArr,
                    });
                    calculateTime();
                  };

                  const changeRequirement = (event: FormEvent) => {
                    const newArr = [...formState.requirements];
                    // @ts-ignore
                    newArr[index].text = event.target.value;
                    setFormState({
                      ...formState,
                      requirements: newArr,
                    });
                  };

                  if (index === 0) {
                    return (
                      <div className={"row"} key={index}>
                        <Chip label={"BRD #"} text={`BRD ${index + 1}`} />
                        <Textarea
                          label={"Requirement"}
                          onChange={changeRequirement}
                          defaultValue={elem.text}
                        />
                        <Input
                          onChange={changeEstimate}
                          defaultValue={elem.hours}
                          classNames={"short"}
                          label={"Estimate (hours)"}
                        />
                      </div>
                    );
                  }
                  return (
                    <div className={"row"} key={index}>
                      <Chip text={`BRD ${index + 1}`} />
                      <Textarea
                        onChange={changeRequirement}
                        defaultValue={elem.text}
                      />
                      <Input
                        onChange={changeEstimate}
                        defaultValue={elem.hours}
                        classNames={"short"}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
