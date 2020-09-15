import React, { ReactElement, useState, useEffect, useCallback } from 'react';

import styled from 'styled-components';
import Gauge from './Gauge/Gauge';
import Stat from './Stat/Stat';
import Timer from './Timer/Timer';

interface Props {
  disabled: boolean;
  startTime: number;
  setFinished: () => void;
  sessionData: { total: number; mistakes: number; index: number };
  reset: () => void;
}

type WrapperProps = {
  width?: string;
  height?: string;
  padding?: string;
};

const Board = styled.div`
  width: 800px;
  height: 200px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: ${(props: WrapperProps) => (props.width ? props.width : 'auto')};
  height: ${(props: WrapperProps) => (props.height ? props.height : '200px')};
  padding: ${(props: WrapperProps) =>
    props.padding ? props.padding : '8px 15px'};
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow: 10px 10px 20px #292e47, -5px -5px 20px #505884;
`;

export default function Dashboard({
  disabled,
  startTime,
  setFinished,
  sessionData,
  reset
}: Props): ReactElement {
  const { total, mistakes, index } = sessionData;
  const [CPM, setCPM] = useState(0);

  const calcCPM = useCallback(() => {
    const currentTime = Date.now();
    const timeDiff = currentTime - startTime;
    const newCPM = Math.round((total * 60 * 1000) / timeDiff);
    setCPM(newCPM);
  }, [startTime, total]);

  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => calcCPM(), 100);
      return () => clearInterval(timer);
    }
  }, [startTime, calcCPM]);

  const calcAccuracy = () => {
    let accuracy: number | string = parseFloat(
      (((total - mistakes) * 100) / total).toFixed(1)
    );
    if (isNaN(accuracy)) accuracy = '--';
    return accuracy;
  };

  return (
    <Board>
      <Wrapper width="150px">
        <Timer
          disabled={disabled}
          started={!isNaN(startTime)}
          setFinished={setFinished}
          reset={reset}
        />
      </Wrapper>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: 280,
          justifyContent: 'space-between'
        }}
      >
        <Wrapper width="130px" height="90px">
          <Stat title="Accuracy" stat={calcAccuracy()} other="%" />
        </Wrapper>
        <Wrapper width="130px" height="90px">
          <Stat title="CPM" stat={CPM} />
        </Wrapper>
        <Wrapper width="130px" height="90px">
          <Stat title="Count" stat={index} />
        </Wrapper>
        <Wrapper width="130px" height="90px">
          <Stat title="Mistakes" stat={mistakes} other={`/${total}`} />
        </Wrapper>
      </div>

      <Wrapper width="320px" padding="30px">
        <Gauge WPM={Math.round(CPM / 5)} />
      </Wrapper>
    </Board>
  );
}
