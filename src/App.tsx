import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Dashboard from './components/TypingArea/Dashboard/Dashboard';

import TypingArea from './components/TypingArea/TypingArea';

const MainWrapper = styled.div`
  background-color: #383d5d;
  background: linear-gradient(
    157deg,
    rgba(66, 73, 110, 1) 0%,
    rgba(48, 52, 79, 1) 100%
  );
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  color: white;
`;

function App() {
  const [startTime, setStartTime] = useState<number>(NaN);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState({
    total: 0,
    mistakes: 0,
    index: 0
  });
  const [remount, setRemount] = useState(Date.now());
  const [isComputer, setIsComputer] = useState(window.innerWidth >= 800);

  const checkViewportWidth = useCallback(() => {
    if (window.innerWidth < 800) setIsComputer(false);
    if (isComputer === false && window.innerWidth >= 800) setIsComputer(true);
  }, [isComputer]);

  useEffect(() => {
    window.addEventListener('resize', checkViewportWidth);
    return () => {
      window.removeEventListener('resize', checkViewportWidth);
    };
  }, [checkViewportWidth]);

  const reset = () => {
    setSessionData({
      total: 0,
      mistakes: 0,
      index: 0
    });
    setDisabled(false);
    setRemount(Date.now());
  };

  return isComputer ? (
    <MainWrapper>
      <Dashboard
        disabled={disabled}
        startTime={startTime}
        setFinished={() => {
          setStartTime(NaN);
          setDisabled(true);
        }}
        reset={reset}
        sessionData={sessionData}
      />
      <TypingArea
        key={remount}
        disabled={disabled}
        setStarted={() => {
          setStartTime(Date.now());
          setDisabled(false);
        }}
        setSessionData={(data: {
          total: number;
          mistakes: number;
          index: number;
        }) => setSessionData(data)}
      />
    </MainWrapper>
  ) : (
    <MainWrapper>
      <div style={{ padding: '5vw' }}>
        This app is for computer users. Please maximise your browser on your
        desktop/ laptop.
      </div>
    </MainWrapper>
  );
}

export default App;
