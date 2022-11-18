import { useState } from "react";

type TodoRowItemProps = {
  text: string;
  updateState: (text: string) => void;
};

export default function TodoRowItem({ text, updateState }: TodoRowItemProps) {
  const [inputIsVisible, setInputVisible] = useState(false);
  const [inputState, setInputState] = useState(text);

  const onBlur = () => {
    updateState(inputState);
    setInputVisible(false);
  };


  return (
    <td onDoubleClick={() => setInputVisible(true)} scope="row">
      {inputIsVisible ? (
        <input
          onBlur={onBlur}
          onInput={(event) => setInputState(event.currentTarget.value)}
          value={inputState}
          type="text"
        />
      ) : (
        inputState
      )}
    </td>
  );
}
