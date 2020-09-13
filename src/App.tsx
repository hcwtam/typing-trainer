import React from 'react';
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
  font-size: calc(10px + 1.5vmin);
  color: white;
`;

function App() {
  return (
    <MainWrapper>
      <Dashboard />
      <TypingArea />
    </MainWrapper>
  );
}

export default App;
