// src/components/game/display/InputCell.tsx
import React, { useEffect, useRef, useState } from 'react';

import { GameAction } from '@/types';

export const InputCell: React.FC<{
  challengeIndex: number;
  correct?: boolean;
  attempt?: number;
  dispatch: React.Dispatch<GameAction>;
  isCurrent?: boolean;
}> = ({ challengeIndex, dispatch, correct, attempt, isCurrent }) => {
  const [inputValue, setInputValue] = useState<number | undefined>(attempt);

  useEffect(() => {
    setInputValue(attempt);
  }, [attempt]);

  const inputRef = useRef<HTMLInputElement | null>(null); // Create a ref

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newValue = parseInt(event.target.value);
      // check if newValue is a number
      if (newValue >= 0 && newValue <= 9) {
        setInputValue(newValue);
        dispatch({
          type: 'ATTEMPT',
          payload: { index: challengeIndex, attempt: newValue },
        });
        dispatch({ type: 'RESUME' });
      } else {
        setInputValue(0);
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };

  useEffect(() => {
    if (isCurrent && inputRef.current) {
      inputRef.current.focus(); // Enforce focus if isCurrent is true
    }
  }, [isCurrent]); // Dependency array ensures this effect runs when isCurrent changes

  const classname =
    ' sm:mx-2 border border-gray-300 h-full w-full text-center px-2 py-1 ';

  if (correct === false) {
    return <div className={`${classname} text-red-500`}>{attempt}</div>;
  } else if (correct === true) {
    return <div className={`${classname} text-green-500`}>{attempt}</div>;
  } else if (isCurrent) {
    return (
      <input
        ref={inputRef} // Attach the ref
        type='tel'
        pattern='[0-9]'
        maxLength={1}
        inputMode='numeric'
        className={`${classname} text-gray-700`}
        // clear current input on focus
        onFocus={(event) => event.target.select()}
        onChange={handleInputChange}
        value={inputValue}
      />
    );
  } else {
    return (
      <div className={`${classname} bg-slate-100 text-gray-700`}>{attempt}</div>
    );
  }
};

export default InputCell;
