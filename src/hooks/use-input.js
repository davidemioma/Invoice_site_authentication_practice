import { useState } from "react";

function useInput(validate) {
  const [enteredInput, setEnteredInput] = useState("");

  const [isTouched, setIsTouched] = useState(false);

  const inputIsValid = validate(enteredInput);

  const InputIsInvalid = !inputIsValid && isTouched;

  const onChangeHandler = (e) => {
    setEnteredInput(e.target.value);
  };

  const onBlurHandler = (e) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredInput("");

    setIsTouched(false);
  };

  return {
    value: enteredInput,
    isValid: inputIsValid,
    isInvalid: InputIsInvalid,
    onChangeHandler: onChangeHandler,
    onBlurHandler: onBlurHandler,
    reset: reset,
  };
}

export default useInput;
