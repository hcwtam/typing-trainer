import React, { ReactElement } from 'react';

import styled from 'styled-components';

interface Props {}

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80%;
`;

export default function Timer({}: Props): ReactElement {
  return (
    <>
      <h6>Timer</h6>
      <FlexContainer>
        <button>◄</button>
        <div
          style={{
            margin: '8px auto',
            textAlign: 'center',
            fontSize: 32,
            fontWeight: 600
          }}
        >
          5:00
        </div>
        <button>►</button>
      </FlexContainer>
    </>
  );
}
