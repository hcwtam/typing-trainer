import React, { ReactElement, useState, useEffect } from 'react';

import styled from 'styled-components';

interface Props {
  disabled: boolean;
  started: boolean;
  setFinished: () => void;
  reset: () => void;
}

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80%;
`;

const Display = styled.div`
  margin: 8px auto;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
`;

const MAX_TIME = 300;
const MIN_TIME = 60;

export default function Timer({
  disabled,
  started,
  setFinished,
  reset
}: Props): ReactElement {
  const [time, setTime] = useState(60);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (timerStarted) {
      const countdown = setInterval(() => {
        if (time > 0) setTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timerStarted, time]);

  useEffect(() => {
    if (started) setTimerStarted(true);
    if (time === 0) {
      setTimerStarted(false);
      setFinished();
    }
  }, [started, time, setFinished]);

  const MinusOneMinute = () => {
    if (time > MIN_TIME) setTime((prev) => prev - 60);
  };
  const addOneMinute = () => {
    if (time < MAX_TIME) setTime((prev) => prev + 60);
  };

  const formatTime = (time: number) => {
    const minute = Math.floor(time / 60);
    const second = time - minute * 60;
    const digit = second < 10 ? '0' : '';
    return `${minute}:${digit}${second}`;
  };

  const resetHandler = () => {
    setTime(60);
    reset();
  };

  //JSX components
  const resetButton = (
    <i
      style={{ width: '100%', textAlign: 'center', fontSize: '3rem' }}
      className="fa fa-undo"
      onClick={resetHandler}
    />
  );

  const timer = (
    <>
      <button
        disabled={time === MIN_TIME || timerStarted}
        onClick={MinusOneMinute}
      >
        ◄
      </button>
      <Display>{formatTime(time)}</Display>
      <button
        disabled={time === MAX_TIME || timerStarted}
        onClick={addOneMinute}
      >
        ►
      </button>
    </>
  );

  return (
    <>
      <h6>Timer</h6>
      <FlexContainer>{disabled ? resetButton : timer}</FlexContainer>
    </>
  );
}
