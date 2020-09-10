import React from 'react';
import styled from 'styled-components';

import TypingArea from './components/TypingArea/TypingArea';

const MainWrapper = styled.div`
  background-color: #282c34;
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
      <TypingArea />
    </MainWrapper>
  );
}

export default App;
